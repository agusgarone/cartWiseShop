import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LockIcon, Sparkles} from 'lucide-react-native';
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

const Tab4 = ({
  titleColor,
  descriptionColor,
  iconColor,
  fontSize,
}: TabProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Sparkles size={56} color={iconColor} />
        <Text
          style={[styles.title, {color: titleColor, fontSize: fontSize.xxxl}]}>
          {t('onboarding.tabs.tab4.title')}
        </Text>
        <Text
          style={[
            styles.description,
            {color: descriptionColor, fontSize: fontSize.l},
          ]}>
          {t('onboarding.tabs.tab4.description')}
        </Text>
      </View>
      <View style={styles.warningContainer}>
        <View style={styles.permissionsContainer}>
          <LockIcon size={24} color={iconColor} />
          <Text style={[styles.permissionsText, {color: descriptionColor}]}>
            {t('onboarding.tabs.tab4.privacyNote')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 4,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  warningContainer: {
    flex: 1,
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
  permissionsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FCF3E9',
    borderWidth: 1,
    borderColor: '#fce9d4',
  },
  permissionsText: {
    flex: 1,
  },
});

export default Tab4;
