import { forwardRef, useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppTheme } from '../theme';
import { Octicons } from '@expo/vector-icons';

type TextInputProps = {
  error?: string;
} & RNTextInputProps;

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    const theme = useAppTheme();
    const styles = creatStyleSheet();
    const iconSize = 18;

    const [isShowingSecuredText, setIsShowingSecuredText] = useState(
      props.secureTextEntry ?? false
    );

    const handleSecureTextPressed = () => {
      setIsShowingSecuredText(val => !val);
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: props.error
                ? theme.colors.error
                : theme.colors.border,
            },
            props.style,
          ]}
        >
          <RNTextInput
            style={[
              styles.inputField,
              {
                paddingRight:
                  props.secureTextEntry !== undefined
                    ? iconSize + theme.spacing.lg
                    : undefined,
              },
            ]}
            ref={ref}
            {...props}
            secureTextEntry={isShowingSecuredText}
            selectionColor={theme.colors.primary}
          />
          {props.secureTextEntry !== undefined ? (
            <Pressable
              style={styles.inputFieldTrailing}
              onPress={handleSecureTextPressed}
            >
              <Octicons
                name={isShowingSecuredText ? 'eye' : 'eye-closed'}
                size={iconSize}
                color="gray"
              />
            </Pressable>
          ) : (
            <></>
          )}
        </View>
        {props.error ? <Text style={styles.error}>{props.error}</Text> : <></>}
      </View>
    );
  }
);

const creatStyleSheet = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    error: {
      paddingTop: theme.spacing.sm,
      color: theme.colors.error,
      fontWeight: 'bold',
      fontSize: theme.typography.caption,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
      borderWidth: 1,
      borderRadius: 8,
      position: 'relative',
    },
    inputField: {
      height: 42,
      padding: theme.spacing.sm,
      width: '100%',
    },
    inputFieldTrailing: {
      paddingHorizontal: theme.spacing.md,
      position: 'absolute',
      right: 0,
    },
  });
};

TextInput.displayName = 'CustomTextInput';
