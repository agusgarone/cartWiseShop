import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import Button from '../../../components/Button';
import {useContext} from 'react';
import {ThemeContext} from '../../../services/ThemeProvider';
import {useTranslation} from 'react-i18next';

export const SignIn = ({
  handleSigninGoogle,
  handleViewUserLogin,
}: {
  handleSigninGoogle: () => Promise<void>;
  handleViewUserLogin: () => void;
}) => {
  const {t} = useTranslation();
  const {theme} = useContext(ThemeContext);

  return (
    <View>
      <Button
        type="primary"
        onPress={handleSigninGoogle}
        icon={
          <Icon
            name="google"
            type={IconType.FontAwesome}
            size={22}
            color={theme.login.signIn.iconColor}
            onPress={() => null}
          />
        }>
        {t('login.signIn.button')}
      </Button>
      <View style={style.alreadyHaveAnAccount}>
        <Text style={{color: theme.login.signIn.descriptionColor}}>
          {t('login.signIn.haveAnAccount')}
        </Text>
        <TouchableOpacity onPress={handleViewUserLogin}>
          <Text
            style={[style.signin, {color: theme.login.signIn.colorTextButton}]}>
            {t('login.signIn.logIn')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  alreadyHaveAnAccount: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  signin: {
    fontWeight: 'bold',
  },
});
