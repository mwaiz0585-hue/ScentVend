import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {Order} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  selectedOrder: Order | null;
};

export default function OrderDetailsScreen({navigation, selectedOrder}: Props) {
  const [copiedVisible, setCopiedVisible] = useState(false);

  if (!selectedOrder) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.centerBox}>
          <Text style={styles.emptyTitle}>No Order Selected</Text>
          <Text style={styles.emptyText}>
            Please open an order from the order history page.
          </Text>

          <PrimaryButton
            title="Back to History"
            onPress={() => navigation.navigate('History')}
          />
        </View>
      </SafeAreaView>
    );
  }

  const order = selectedOrder;
  const receiptId = `SV-${order.id.slice(-6)}`;

  const qrValue = JSON.stringify({
    app: 'ScentVend',
    receiptId,
    code: order.code,
    perfume: order.perfumeName,
    amount: order.amount,
    status: order.status,
  });

  function handleCopyCode() {
    Clipboard.setString(order.code);
    setCopiedVisible(true);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>{order.perfumeEmoji}</Text>
          <Text style={styles.title}>Order Details</Text>
          <Text style={styles.subtitle}>
            Receipt, QR code, unlock code, payment amount, and vending machine
            collection status.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.receiptLabel}>Receipt ID</Text>
              <Text style={styles.receiptId}>{receiptId}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                order.status === 'used'
                  ? styles.usedBadge
                  : styles.unusedBadge,
              ]}>
              <Text
                style={[
                  styles.statusText,
                  order.status === 'used'
                    ? styles.usedText
                    : styles.unusedText,
                ]}>
                {order.status === 'used' ? 'Used' : 'Unused'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Perfume</Text>
            <Text style={styles.detailValue}>{order.perfumeName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount</Text>
            <Text style={styles.detailValue}>RM{order.amount}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purchased</Text>
            <Text style={styles.detailValue}>{order.date}</Text>
          </View>

          {order.usedAt && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Used At</Text>
              <Text style={styles.detailValue}>{order.usedAt}</Text>
            </View>
          )}
        </View>

        <View style={styles.qrCard}>
          <Text style={styles.sectionTitle}>QR Code</Text>

          <View style={styles.qrInnerBox}>
            <QRCode
              value={qrValue}
              size={180}
              color="#1E1336"
              backgroundColor="#FFFFFF"
            />
          </View>

          <Text style={styles.qrHint}>
            This QR contains the order receipt and unlock code for machine
            verification.
          </Text>
        </View>

        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Unlock Code</Text>
          <Text style={styles.codeText}>{order.code}</Text>
        </View>

        <PrimaryButton title="Copy Unlock Code" onPress={handleCopyCode} />

        <PrimaryButton
          title="Open Machine Verify"
          variant="secondary"
          onPress={() => navigation.navigate('MachineVerify')}
        />

        <PrimaryButton
          title="Back to History"
          variant="secondary"
          onPress={() => navigation.navigate('History')}
        />
      </ScrollView>

      <AppModal
        visible={copiedVisible}
        title="Code Copied"
        message={`${order.code} has been copied to clipboard.`}
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
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emoji: {
    fontSize: 46,
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
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  },
  statusBadge: {
    marginLeft: 'auto',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  unusedBadge: {
    backgroundColor: '#E9D5FF',
  },
  usedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
  },
  unusedText: {
    color: colors.purple,
  },
  usedText: {
    color: colors.success,
  },
  detailRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 4,
  },
  detailValue: {
    color: colors.text,
    fontWeight: '900',
  },
  qrCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
    alignSelf: 'flex-start',
  },
  qrInnerBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
  },
  qrHint: {
    color: colors.muted,
    textAlign: 'center',
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
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.screen,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    color: colors.text,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 18,
  },
});