/* eslint-disable react-native/no-inline-styles */
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import z from 'zod';
import { useAuthContext } from '../libs/auth/useAuthContext';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../types/navigation';
import { authSignUpSchema } from '../libs/auth/validation';
import { TextInput } from '../ui/components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../ui/theme';
import { Octicons } from '@expo/vector-icons';
import { Button, ButtonVariant } from '../ui/components/Button';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

type FormData = z.infer<typeof authSignUpSchema>;

export default function AuthSignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSignUpSchema),
    reValidateMode: 'onChange',
  });
  const theme = useAppTheme();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { dispatch } = useAuthContext();

  const onSubmit = (data: FormData) => {
    dispatch({ type: 'signup', payload: data });
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={{
          backgroundColor: theme.colors.backgroundColor,
          padding: theme.spacing.md,
        }}
      >
        <Octicons onPress={navigation.goBack} name={'chevron-left'} size={22} />

        <Text
          style={{
            fontSize: theme.typography.title,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingVertical: theme.spacing.xxl,
          }}
        >
          Lets get your account setup
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
                keyboardType={'default'}
                autoCapitalize={'words'}
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
            name="name"
          />

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
        </View>
      </ScrollView>

      <KeyboardAvoidingView behavior={'padding'}>
        <View
          style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.backgroundColor,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          }}
        >
          <Button
            variant={ButtonVariant.filled}
            color={theme.colors.primary}
            title="Create account"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
