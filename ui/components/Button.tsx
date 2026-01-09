/* eslint-disable react-native/no-inline-styles */
import { useMemo } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../theme';

export enum ButtonVariant {
  filled = 'filled',
  bordered = 'bordered',
  text = 'text',
}

type ButtonProps = {
  variant: ButtonVariant;
  color: string;
  textColor?: string;
  title: string;
  fontSize?: number;
} & TouchableOpacityProps;

export const Button = (props: ButtonProps) => {
  const theme = useAppTheme();
  const styles = useMemo<ViewStyle & TextStyle>(() => {
    switch (props.variant) {
      case ButtonVariant.filled:
        return {
          backgroundColor: props.color,
          color: props.textColor ?? '#fff',
          padding: theme.spacing.md,
        };
      case ButtonVariant.bordered:
        return {
          borderWidth: 1,
          borderColor: props.color,
          color: props.textColor ?? props.color,
          padding: theme.spacing.md,
        };
      case ButtonVariant.text:
        return {
          color: props.textColor ?? props.color,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
        };
    }
  }, [props]);

  return (
    <TouchableOpacity activeOpacity={0.8} {...props} style={[props.style]}>
      <Text
        style={[
          styles,
          {
            borderRadius: 12,
            textAlign: 'center',
            fontSize: props.fontSize ?? theme.typography.body,
            fontWeight: 'bold',
          },
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';
