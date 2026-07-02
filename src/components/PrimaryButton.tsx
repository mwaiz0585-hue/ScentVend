import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius} from '../styles/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: Props) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabledButton,
      ]}>
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
          disabled && styles.disabledText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: radius.button,
    alignItems: 'center',
    marginTop: 12,
  },
  primary: {
    backgroundColor: colors.action,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.purple,
  },
  disabledButton: {
    backgroundColor: '#E5E0EC',
    borderColor: '#E5E0EC',
  },
  text: {
    fontSize: 16,
    fontWeight: '900',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: colors.purple,
  },
  disabledText: {
    color: '#9B91AA',
  },
});