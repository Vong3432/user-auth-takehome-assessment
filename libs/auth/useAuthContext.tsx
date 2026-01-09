import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

interface Auth {
  name: string;
  email: string;
  password: string;
}

interface AuthDatabase {
  records: Auth[];
  authInfo: Auth | null;
  error: string | null;
}

interface AuthLoginPayload {
  email: string;
  password: string;
}

interface AuthSignUpPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthLoginAction {
  type: 'login';
  payload: AuthLoginPayload;
}

interface AuthLogoutAction {
  type: 'logout';
}

interface AuthSignUpAction {
  type: 'signup';
  payload: AuthSignUpPayload;
}

interface AuthRestoreAction {
  type: 'restore';
  payload: Auth | null;
}

type AuthAction =
  | AuthLoginAction
  | AuthLogoutAction
  | AuthSignUpAction
  | AuthRestoreAction;

interface AuthContextType {
  auth: AuthDatabase;
  dispatch: Dispatch<AuthAction>;
}

// Note: Auth is stored in AsyncStorage for demo purpose only, in real scenario it should be stored inside somewhere safe like keychain.
const storageKey = 'AAAA';

const authReducer = (state: AuthDatabase, action: AuthAction): AuthDatabase => {
  switch (action.type) {
    case 'login': {
      let matched: Auth | null = null;
      let error: string | null = null;

      for (const record of state.records) {
        if (record.email.toLowerCase() === action.payload.email.toLowerCase()) {
          if (record.password === action.payload.password) {
            matched = record;
          } else {
            error = 'Invalid credential.';
          }
        }
      }

      if (matched !== null) {
        AsyncStorage.setItem(storageKey, JSON.stringify(matched));
      }

      return {
        records: state.records,
        authInfo: matched ?? null,
        error,
      };
    }
    case 'logout':
      AsyncStorage.removeItem(storageKey);
      return {
        records: state.records,
        authInfo: null,
        error: null,
      };
    case 'signup':
      return {
        records: [...state.records, action.payload],
        authInfo: null,
        error: null,
      };
    case 'restore':
      return {
        records: state.records,
        authInfo: action.payload,
        error: null,
      };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    records: [],
    authInfo: null,
    error: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const cached = await AsyncStorage.getItem(storageKey);
        if (cached !== null) {
          const parsed: Auth = JSON.parse(cached);
          dispatch({ type: 'restore', payload: parsed });
        } else {
          dispatch({ type: 'restore', payload: null });
        }
      } catch {
        dispatch({ type: 'restore', payload: null });
      }
    };

    bootstrapAsync();
  }, []);

  return <AuthContext value={{ auth, dispatch }}>{children}</AuthContext>;
};
