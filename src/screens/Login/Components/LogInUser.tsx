import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import Button from '../../../components/Button';
import {useContext} from 'react';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

export const LoginUser = ({
  handleViewUserLogin,
  handleLoginGoogle,
}: {
  handleViewUserLogin: () => void;
  handleLoginGoogle: () => Promise<void>;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);
  return (
    <View>
      <Button
        type="primary"
        onPress={handleLoginGoogle}
        icon={
          <Icon
            name="google"
            type={IconType.FontAwesome}
            size={22}
            color={theme.login.logIn.iconColor}
            onPress={() => null}
          />
        }>
        {t('login.logIn.button')}
      </Button>
      <View style={style.dontHaveAnAccount}>
        <Text style={{color: theme.login.logIn.descriptionColor}}>
          {t('login.logIn.dontHaveAccount')}
        </Text>
        <TouchableOpacity onPress={handleViewUserLogin}>
          <Text
            style={[style.signIn, {color: theme.login.logIn.colorTextButton}]}>
            {t('login.logIn.logIn')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  dontHaveAnAccount: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signIn: {
    fontWeight: 'bold',
  },
});
