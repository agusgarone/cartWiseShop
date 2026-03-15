import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import {useTranslation} from 'react-i18next';
import {ThemeContext} from '../services/ThemeProvider';

const CustomModal = ({
  isModalVisible,
  icon,
  title,
  subtitle,
  acceptButton,
  cancelButton,
}: {
  isModalVisible: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  acceptButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  return (
    <Modal isVisible={isModalVisible}>
      <View
        style={{
          backgroundColor: theme.modal.background,
          height: '30%',
          borderWidth: 2,
          borderColor: theme.modal.borderColor,
          borderRadius: 10,
          padding: 20,
          display: 'flex',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
          <View style={{marginBottom: 5}}>{icon}</View>
          <Text
            style={{
              color: theme.modal.text,
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                color: theme.modal.text,
                fontSize: 16,
                textAlign: 'center',
              }}>
              {subtitle}
            </Text>
          )}
        </View>
        {acceptButton && cancelButton ? (
          <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <View style={{flex: 1}}>{cancelButton}</View>
            <View style={{flex: 1}}>{acceptButton}</View>
          </View>
        ) : (
          <View>{acceptButton}</View>
        )}
      </View>
    </Modal>
  );
};

export default CustomModal;
