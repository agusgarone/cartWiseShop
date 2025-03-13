import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import theme from '../../../common/theme';
import Button from '../../../components/Button';

export const LoginUser = ({
  handleViewUserLogin,
  handleLoginGoogle,
}: {
  handleViewUserLogin: () => void;
  handleLoginGoogle: () => Promise<void>;
}) => {
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
            color={theme.colors.white}
            onPress={() => null}
          />
        }>
        Log in with Google
      </Button>
      <View style={style.dontHaveAnAccount}>
        <Text style={{color: theme.colors.black}}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleViewUserLogin}>
          <Text style={style.signIn}>Sign in</Text>
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
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
