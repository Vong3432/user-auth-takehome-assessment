/* eslint-disable react-native/no-inline-styles */
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import z from 'zod';
import { RootStackNavigationProp } from '../types/navigation';
import { useAuthContext } from '../libs/auth/useAuthContext';
import { authLoginSchema } from '../libs/auth/validation';
import { TextInput } from '../ui/components/TextInput';
import { useAppTheme } from '../ui/theme';
import { Button, ButtonVariant } from '../ui/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormData = z.infer<typeof authLoginSchema>;

export default function AuthLoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authLoginSchema),
    reValidateMode: 'onChange',
  });
  const theme = useAppTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { auth, dispatch } = useAuthContext();

  const onSubmit = async (data: FormData) => {
    dispatch({ type: 'login', payload: data });
  };

  const onCreateAccountPressed = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'interactive'}
        style={{
          backgroundColor: theme.colors.backgroundColor,
          padding: theme.spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.title,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: theme.spacing.xxl,
          }}
        >
          Welcome Back
        </Text>

        <View
          style={{
            gap: theme.spacing.md,
            paddingBottom: theme.spacing.xxl,
          }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                keyboardType={'email-address'}
                placeholder="Email"
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
            name="password"
          />

          {auth.error && (
            <Text style={{ color: theme.colors.error }}>{auth.error}</Text>
          )}
        </View>

        <Button
          variant={ButtonVariant.filled}
          color={theme.colors.primary}
          textColor={theme.colors.primaryText}
          title="Log in"
          onPress={handleSubmit(onSubmit)}
          style={{ marginBottom: theme.spacing.sm }}
        />

        <Button
          variant={ButtonVariant.text}
          color={theme.colors.primary}
          title="New to the app? Create a new account now"
          onPress={onCreateAccountPressed}
          fontSize={theme.typography.caption}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
