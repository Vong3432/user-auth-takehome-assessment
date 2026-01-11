import HomeScreen from './screens/HomeScreen';
import AuthLoginScreen from './screens/AuthLoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthSignUpScreen from './screens/AuthSignUpScreen';
import { RootStackParamList } from './types/navigation';
import {
  AuthContextProvider,
  useAuthContext,
} from './libs/auth/useAuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <KeyboardProvider>
      <AuthContextProvider>
        <RootPage />
      </AuthContextProvider>
    </KeyboardProvider>
  );
}

function RootPage() {
  const { auth } = useAuthContext();
  const isLoggedIn = auth.authInfo !== null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name={'Home'} component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen
                name={'Login'}
                component={AuthLoginScreen}
                options={{
                  title: 'Sign In',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={'Signup'}
                component={AuthSignUpScreen}
                options={{
                  title: 'Sign Up',
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
