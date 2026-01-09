import { ColorSchemeName, useColorScheme } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

const Spacing = {
  // Semantic aliases
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const Typography = {
  title: 24,
  body: 16,
  caption: 12,
};

export type ColorTheme = {
  primary: string;
  primaryText: string;
  text: string;
  error: string;
  border: string;
  backgroundColor: string;
};

const lightColorTheme: ColorTheme = {
  primary: '#018a6a',
  primaryText: '#e8fffa',
  text: '#020A13',
  error: '#ff3838',
  border: '#d8d8d8',
  backgroundColor: '#fff',
} as const;

type Theme = {
  colors: ColorTheme;
  navigation: ReactNavigation.Theme;
  spacing: typeof Spacing;
  typography: typeof Typography;
};

type ColorScheme = NonNullable<ColorSchemeName>;

const AppTheme: Record<ColorScheme, Theme> = {
  light: {
    colors: lightColorTheme,
    navigation: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: lightColorTheme.text,
      },
    },
    spacing: Spacing,
    typography: Typography,
  },
  // TODO: can be use different obj if want to support dark mode.
  dark: {
    colors: lightColorTheme,
    navigation: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: lightColorTheme.text,
      },
    },
    spacing: Spacing,
    typography: Typography,
  },
};

export const useAppTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return AppTheme[colorScheme ?? 'light'];
};
