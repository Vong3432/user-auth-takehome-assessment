/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text } from 'react-native';
import { useAuthContext } from '../libs/auth/useAuthContext';
import { useAppTheme } from '../ui/theme';
import { Button, ButtonVariant } from '../ui/components/Button';

export default function HomeScreen() {
  const { auth, dispatch } = useAuthContext();
  const theme = useAppTheme();

  const handleLogout = () => {
    dispatch({ type: 'logout' });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundColor,
        padding: theme.spacing.md,
      }}
    >
      <Text>Username: {auth.authInfo?.name ?? ''}</Text>
      <Text>Email: {auth.authInfo?.email ?? ''}</Text>
      <Button
        variant={ButtonVariant.bordered}
        color={theme.colors.text}
        title="Logout"
        style={{ marginTop: theme.spacing.xxl }}
        onPress={handleLogout}
      ></Button>
    </ScrollView>
  );
}
