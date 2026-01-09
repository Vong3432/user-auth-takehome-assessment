import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
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

type AuthAction = AuthLoginAction | AuthLogoutAction | AuthSignUpAction;

interface AuthContextType {
  auth: AuthDatabase;
  dispatch: Dispatch<AuthAction>;
}

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
      return {
        records: state.records,
        authInfo: matched ?? null,
        error,
      };
    }
    case 'logout':
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
  return <AuthContext value={{ auth, dispatch }}>{children}</AuthContext>;
};
