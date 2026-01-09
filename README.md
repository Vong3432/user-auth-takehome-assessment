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

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

#### Required Software

1. **Node.js** (v18.x or later recommended)
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation: `node --version`

2. **pnpm** (v8.x or later)
   - Install: `npm install -g pnpm`
   - Verify installation: `pnpm --version`
   - Alternative: Use npm or yarn if preferred

3. **Expo CLI**
   - Install: `npm install -g expo-cli`
   - Or use with npx: `npx expo`

#### Platform-Specific Requirements

**For iOS Development (macOS only):**

- **Xcode** (latest version from Mac App Store)
- **Xcode Command Line Tools**: Run `xcode-select --install`
- **iOS Simulator** (included with Xcode)
- **CocoaPods**: `sudo gem install cocoapods`

**For Android Development:**

- **Android Studio** (latest version)
  - Download: [https://developer.android.com/studio](https://developer.android.com/studio)
- **Android SDK** (installed via Android Studio)
- **Android Emulator** (configured via Android Studio AVD Manager)
- Set up environment variables:
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

**For Physical Device Testing:**

- **Expo Go app** installed on your device
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-authentication-takehome-assessment
```

#### 2. Install Dependencies

```bash
pnpm install
```

If you encounter any issues, try clearing the cache:

```bash
pnpm store prune
pnpm install --force
```

#### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
pnpm list
```

### Running the Application

#### Start Development Server

```bash
pnpm start
```

This will start the Expo development server and display a QR code in your terminal.

#### Run on iOS Simulator

```bash
pnpm ios
```

This will:

- Build the app
- Launch the iOS Simulator
- Install and run the app

**Note:** macOS with Xcode required.

#### Run on Android Emulator

```bash
pnpm android
```

Make sure you have:

- Android Studio installed
- An Android emulator created and running
- Or a physical Android device connected via USB with USB debugging enabled

#### Run on Physical Device

1. Install **Expo Go** on your mobile device
2. Run `pnpm start`
3. Scan the QR code:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

#### Run on Web

```bash
pnpm web
```

This will open the app in your default web browser.

### Troubleshooting

#### Common Issues

**Issue: "Command not found: expo"**

```bash
# Solution: Install Expo CLI globally
npm install -g expo-cli
```

**Issue: "Unable to resolve module"**

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules
pnpm install
pnpm start --clear
```

**Issue: iOS build fails**

```bash
# Solution: Clean iOS build
cd ios
pod install
cd ..
pnpm ios
```

**Issue: Android build fails**

```bash
# Solution: Clean Android build
cd android
./gradlew clean
cd ..
pnpm android
```

**Issue: Metro bundler port conflict**

```bash
# Solution: Kill process on port 8081
npx kill-port 8081
pnpm start
```

### Code Quality Scripts

Run these commands to maintain code quality:

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues automatically
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check if code is properly formatted
pnpm format:check
```

### Development Workflow

1. **Start the development server**

   ```bash
   pnpm start
   ```

2. **Make your changes**
   - Edit files in your code editor
   - Changes will hot-reload automatically

3. **Run linting and formatting**

   ```bash
   pnpm lint:fix
   pnpm format
   ```

4. **Test on multiple platforms**
   - Test on iOS simulator
   - Test on Android emulator
   - Test on physical devices if available

### Environment Configuration

This project uses Expo's default configuration. No additional environment variables are required for basic functionality.

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
