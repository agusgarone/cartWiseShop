import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import theme from '../../../common/theme';
import Button from '../../../components/Button';

export const SignIn = ({
  handleSigninGoogle,
  handleViewUserLogin,
}: {
  handleSigninGoogle: () => Promise<void>;
  handleViewUserLogin: () => void;
}) => {
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
            color={theme.colors.white}
            onPress={() => null}
          />
        }>
        Sign in with Google
      </Button>
      <View style={style.alreadyHaveAnAccount}>
        <Text style={{color: theme.colors.black}}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={handleViewUserLogin}>
          <Text style={style.login}>Log in</Text>
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
  login: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
