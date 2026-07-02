import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {Order, Perfume} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  selectedPerfume: Perfume | null;
  unlockCode: string;
  currentOrder: Order | null;
};

export default function UnlockCodeScreen({
  navigation,
  selectedPerfume,
  unlockCode,
  currentOrder,
}: Props) {
  const [copiedVisible, setCopiedVisible] = useState(false);

  const displayCode = unlockCode || currentOrder?.code || 'PV-000000';
  const perfumeName =
    currentOrder?.perfumeName || selectedPerfume?.name || 'No perfume selected';
  const perfumeEmoji = currentOrder?.perfumeEmoji || selectedPerfume?.emoji || '🌸';
  const amount = currentOrder?.amount || selectedPerfume?.price || 0;
  const receiptId = currentOrder?.id
    ? `SV-${currentOrder.id.slice(-6)}`
    : 'SV-DEMO';
  const orderDate = currentOrder?.date || new Date().toLocaleString();

  const qrValue = JSON.stringify({
    app: 'ScentVend',
    receiptId,
    code: displayCode,
    perfume: perfumeName,
    amount,
  });

  function handleCopyCode() {
    Clipboard.setString(displayCode);
    setCopiedVisible(true);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.successCard}>
          <Text style={styles.successEmoji}>✅</Text>
          <Text style={styles.title}>Payment Successful</Text>

          <Text style={styles.subtitle}>
            Your order has been created. Use the QR code or manual unlock code
            at the perfume vending machine.
          </Text>

          <View style={styles.receiptCard}>
            <Text style={styles.receiptLabel}>Receipt ID</Text>
            <Text style={styles.receiptId}>{receiptId}</Text>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptText}>Perfume</Text>
              <Text style={styles.receiptValue}>
                {perfumeEmoji} {perfumeName}
              </Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptText}>Amount</Text>
              <Text style={styles.receiptValue}>RM{amount}</Text>
            </View>

            <View style={styles.receiptRow}>
              <Text style={styles.receiptText}>Date</Text>
              <Text style={styles.receiptValue}>{orderDate}</Text>
            </View>
          </View>

          <View style={styles.qrBox}>
            <Text style={styles.qrLabel}>Scan QR Code</Text>

            <View style={styles.qrInnerBox}>
              <QRCode
                value={qrValue}
                size={180}
                color="#1E1336"
                backgroundColor="#FFFFFF"
              />
            </View>

            <Text style={styles.qrHint}>
              The vending machine can scan this QR to verify your order.
            </Text>
          </View>

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>Unlock Code</Text>
            <Text style={styles.codeText}>{displayCode}</Text>
          </View>

          <PrimaryButton title="Copy Unlock Code" onPress={handleCopyCode} />

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Collection Instruction</Text>
            <Text style={styles.infoText}>
              Enter the code manually or scan the QR code on the vending
              machine screen. Once verified, the machine will dispense your
              perfume.
            </Text>
          </View>

          <PrimaryButton
            title="Back to Home"
            onPress={() => navigation.navigate('Home')}
          />

          <PrimaryButton
            title="View Order History"
            variant="secondary"
            onPress={() => navigation.navigate('History')}
          />
        </View>
      </ScrollView>

      <AppModal
        visible={copiedVisible}
        title="Code Copied"
        message={`${displayCode} has been copied to clipboard.`}
        icon="📋"
        primaryText="OK"
        onPrimaryPress={() => setCopiedVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.screen,
    paddingTop: 10,
    paddingBottom: 90,
  },
  successCard: {
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  successEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: colors.text,
    lineHeight: 22,
    marginBottom: 18,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  receiptLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 4,
  },
  receiptId: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 12,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  receiptText: {
    color: colors.muted,
    fontWeight: '800',
    flex: 1,
  },
  receiptValue: {
    color: colors.text,
    fontWeight: '900',
    flex: 1,
    textAlign: 'right',
  },
  qrBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qrLabel: {
    color: colors.purple,
    fontWeight: '900',
    marginBottom: 14,
  },
  qrInnerBox: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 18,
  },
  qrHint: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 20,
  },
  codeBox: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginBottom: 6,
  },
  codeLabel: {
    color: colors.secondary,
    fontWeight: '900',
    marginBottom: 6,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.card,
    padding: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  infoLabel: {
    color: colors.muted,
    marginBottom: 6,
    fontWeight: '800',
  },
  infoText: {
    color: colors.text,
    lineHeight: 21,
  },
});