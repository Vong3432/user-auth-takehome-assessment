# User Authentication Take-Home Assessment

A React Native application built with Expo that implements a complete authentication system with form validation, custom UI components, and persistent session management.

## 🎥 Demo Video

▶️ [Watch demo video](https://github.com/Vong3432/user-auth-takehome-assessment/blob/main/demo/ScreenRecording_01-09-2026%2022-39-17_1.MP4)

## Features

### Authentication System

- **User Registration**
  - Sign up with name, email, and password
  - Form validation with Zod schema
  - Real-time field validation
  - Email format validation
  - Password minimum length validation (6 characters)
  - Automatic navigation to login after successful registration

- **User Login**
  - Email and password authentication
  - Credential validation against stored user records
  - Error handling for invalid credentials
  - Session persistence using AsyncStorage
  - Automatic session restoration on app restart

- **User Logout**
  - Clear user session
  - Remove stored credentials from AsyncStorage
  - Navigate back to login screen

### UI Components

#### Custom TextInput (`ui/components/TextInput.tsx`)

- Extends all React Native TextInput props
- Error state visualization with red border
- Error message display below input
- Password visibility toggle with eye icon (Octicons)
- Theme-aware styling
- Forward ref support for advanced use cases

#### Custom Button (`ui/components/Button.tsx`)

- Three variants:
  - `filled` - Solid background button
  - `bordered` - Outlined button with transparent background
  - `text` - Text-only button
- Customizable colors and text styles
- Press state with opacity feedback
- Built with Pressable for better touch handling
- Theme integration for consistent styling

### Theme System (`ui/theme.ts`)

- Centralized design tokens:
  - **Spacing**: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), xxl (48px)
  - **Typography**: title (24px), body (16px), caption (12px)
  - **Colors**: primary, primaryText, text, error, border, backgroundColor
- Color scheme support (light/dark) ready for expansion
- React Navigation theme integration

### Form Validation (`libs/auth/validation.ts`)

- Zod schemas for type-safe validation:
  - `authSignUpSchema` - Name, email, and password validation
  - `authLoginSchema` - Email and password validation (derived using `.omit()`)
- Custom error messages for each field
- Integration with React Hook Form for seamless validation

### State Management (`libs/auth/useAuthContext.tsx`)

- Context API with useReducer pattern
- Actions:
  - `login` - Authenticate user and store session
  - `logout` - Clear user session
  - `signup` - Register new user
  - `restore` - Restore session from AsyncStorage
- Proper async/await handling outside reducer (following React best practices)
- TypeScript typed actions and state

### Navigation

- React Navigation with Native Stack Navigator
- Conditional screen rendering based on authentication state:
  - Authenticated: Home screen
  - Unauthenticated: Login and Signup screens
- Type-safe navigation with TypeScript
- Safe area context for device notch/status bar handling

### Screens

#### Login Screen (`screens/AuthLoginScreen.tsx`)

- Email and password input fields
- Form validation with error display
- "Create account" link to signup
- Automatic login on valid credentials

#### Signup Screen (`screens/AuthSignUpScreen.tsx`)

- Name, email, and password input fields
- Form validation with real-time feedback
- Back navigation with chevron icon
- Fixed bottom button for account creation

#### Home Screen (`screens/HomeScreen.tsx`)

- Display authenticated user information (name, email)
- Logout button
- Protected route (only accessible when logged in)

## Tech Stack

### Core

- **React Native** 0.81.5
- **Expo** ~54.0.31
- **TypeScript** ~5.9.2
- **React** 19.1.0

### Navigation

- @react-navigation/native ^7.1.26
- @react-navigation/native-stack ^7.9.0
- react-native-safe-area-context ~5.6.2
- react-native-screens ~4.16.0

### Form Management

- react-hook-form ^7.70.0
- @hookform/resolvers ^5.2.2
- zod ^4.3.5

### Storage

- @react-native-async-storage/async-storage 2.2.0

### UI/Icons

- @expo/vector-icons ^15.0.3
- expo-status-bar ~3.0.9

### Code Quality

- ESLint with TypeScript support
- Prettier for code formatting
- Custom ESLint rules for React Native

## Project Structure

```
.
├── App.tsx                         # Main app component with navigation setup
├── screens/
│   ├── AuthLoginScreen.tsx         # Login screen
│   ├── AuthSignUpScreen.tsx        # Signup screen
│   └── HomeScreen.tsx              # Home screen (protected)
├── libs/
│   └── auth/
│       ├── useAuthContext.tsx      # Authentication context and state management
│       └── validation.ts           # Zod validation schemas
├── ui/
│   ├── theme.ts                    # Theme configuration
│   └── components/
│       ├── TextInput.tsx           # Custom text input component
│       └── Button.tsx              # Custom button component
├── types/
│   └── navigation.ts               # TypeScript navigation types
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or pnpm
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run on Web
pnpm web
```

### Code Quality Scripts

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting
pnpm format:check
```

## Implementation Highlights

### Async Operations with useReducer

The authentication context properly handles async operations (AsyncStorage) outside the reducer, following React best practices. Async logic is handled in `useEffect` and component event handlers, then dispatched to the synchronous reducer with results as payloads.

### Type Safety

Full TypeScript support throughout the application with:

- Typed navigation params
- Typed form data with Zod inference
- Typed context and reducer actions
- Typed theme system

### Form Validation

Leverages Zod for schema-based validation combined with React Hook Form for:

- Real-time validation on change
- Custom error messages
- Type-safe form data
- Reusable validation schemas

### Session Persistence

User sessions persist across app restarts using AsyncStorage:

- Session saved on successful login
- Session restored on app launch
- Session cleared on logout

## Security Notes

Authentication data is stored in AsyncStorage for demonstration purposes only. In a production application, sensitive credentials should be:

- Stored in secure storage (iOS Keychain, Android Keystore)
- Encrypted at rest
- Transmitted over HTTPS
- Validated on a backend server
- Never stored in plain text

## Future Enhancements

- Dark mode support (theme structure already supports it)
- Password strength indicator
- Email verification flow
- Password reset functionality
- Biometric authentication
- Backend API integration
- Unit and integration tests
- Error boundary implementation

## License

Private - Take-Home Assessment
