import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type TabProps = {
  titleColor: string;
  descriptionColor: string;
  iconColor: string;
  fontSize: {
    l: number;
    xxxl: number;
  };
};

const Tab3 = ({
  titleColor,
  descriptionColor,
  iconColor,
  fontSize,
}: TabProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, {color: titleColor, fontSize: fontSize.xxxl}]}>
        {t('onboarding.tabs.tab3.title')}
      </Text>
      <Text
        style={[
          styles.description,
          {color: descriptionColor, fontSize: fontSize.l},
        ]}>
        {t('onboarding.tabs.tab3.description')}
      </Text>
      <Image
        source={require('../../../assets/images/tab3.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  title: {
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  image: {
    width: 300,
    height: 350,
  },
});

export default Tab3;
