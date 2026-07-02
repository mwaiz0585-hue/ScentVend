import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, radius} from '../styles/theme';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  primaryText: string;
  secondaryText?: string;
  icon?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
};

export default function AppModal({
  visible,
  title,
  message,
  primaryText,
  secondaryText,
  icon = '✨',
  onPrimaryPress,
  onSecondaryPress,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            {secondaryText && (
              <Pressable
                style={styles.secondaryButton}
                onPress={() => onSecondaryPress?.()}>
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              </Pressable>
            )}

            <Pressable style={styles.primaryButton} onPress={onPrimaryPress}>
              <Text style={styles.primaryText}>{primaryText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 19, 54, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  message: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.action,
    paddingVertical: 14,
    borderRadius: radius.button,
    alignItems: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.purple,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  secondaryText: {
    color: colors.purple,
    fontWeight: '900',
    fontSize: 15,
  },
});