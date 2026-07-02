import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius} from '../styles/theme';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function OptionButton({label, selected, onPress}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: radius.pill,
    marginRight: 10,
    marginBottom: 10,
  },
  selected: {
    backgroundColor: colors.purple,
    borderColor: colors.purple,
  },
  text: {
    color: colors.text,
    fontWeight: '700',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});