import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import Button from '../../../components/Button';
import {useContext} from 'react';
import {ThemeContext} from '../../../services/ThemeProvider';

export const LoginUser = ({
  handleViewUserLogin,
  handleLoginGoogle,
}: {
  handleViewUserLogin: () => void;
  handleLoginGoogle: () => Promise<void>;
}) => {
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
        Log in with Google
      </Button>
      <View style={style.dontHaveAnAccount}>
        <Text style={{color: theme.login.logIn.descriptionColor}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleViewUserLogin}>
          <Text
            style={[style.signIn, {color: theme.login.logIn.colorTextButton}]}>
            Sign in
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
