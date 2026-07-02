import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppModal from '../components/AppModal';
import PrimaryButton from '../components/PrimaryButton';
import {Order} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  orders: Order[];
  onCodeDetected: (code: string) => void;
};

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
};

export default function QRScannerScreen({
  navigation,
  orders,
  onCodeDetected,
}: Props) {
  const [scanning, setScanning] = useState(false);
  const [detectedOrder, setDetectedOrder] = useState<Order | null>(null);
  const [detectedCode, setDetectedCode] = useState('');
  const [goToVerifyAfterModal, setGoToVerifyAfterModal] = useState(false);

  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    message: '',
    icon: '📷',
  });

  function showModal(
    title: string,
    message: string,
    icon: string,
    goToVerify = false,
  ) {
    setGoToVerifyAfterModal(goToVerify);

    setModal({
      visible: true,
      title,
      message,
      icon,
    });
  }

  function handleModalClose() {
    setModal(prev => ({
      ...prev,
      visible: false,
    }));

    if (goToVerifyAfterModal) {
      setGoToVerifyAfterModal(false);
      navigation.navigate('MachineVerify');
    }
  }

  function handleStartScan() {
    setScanning(true);
    setDetectedOrder(null);
    setDetectedCode('');

    setTimeout(() => {
      const latestUnusedOrder = orders.find(order => order.status === 'unused');

      setScanning(false);

      if (!latestUnusedOrder) {
        showModal(
          'No Active QR Code',
          'There is no unused unlock code available to scan.',
          '📭',
        );
        return;
      }

      setDetectedOrder(latestUnusedOrder);
      setDetectedCode(latestUnusedOrder.code);
      onCodeDetected(latestUnusedOrder.code);

      showModal(
        'QR Code Detected',
        `Detected unlock code: ${latestUnusedOrder.code}`,
        '✅',
        true,
      );
    }, 900);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>📷</Text>
          <Text style={styles.title}>QR Scanner</Text>
          <Text style={styles.subtitle}>
            This scanner simulates the vending machine camera reading the latest
            unused QR code from a customer order.
          </Text>
        </View>

        <View style={styles.scannerCard}>
          <Text style={styles.sectionTitle}>Machine Camera</Text>

          <View style={styles.cameraFrame}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />

            {scanning ? (
              <View style={styles.scanningContent}>
                <ActivityIndicator size="large" color={colors.action} />
                <Text style={styles.scanningText}>Scanning QR code...</Text>
              </View>
            ) : (
              <View style={styles.scannerCenter}>
                <Text style={styles.scannerEmoji}>▦</Text>
                <Text style={styles.scannerText}>Place QR code here</Text>
              </View>
            )}

            <View style={styles.scanLine} />
          </View>

          <Text style={styles.hintText}>
            Prototype note: in a real vending machine, this page would use the
            device camera to scan the QR code. For this demo, it reads the latest
            unused order code.
          </Text>

          <PrimaryButton
            title={scanning ? 'Scanning...' : 'Start QR Scan'}
            disabled={scanning}
            onPress={handleStartScan}
          />

          <PrimaryButton
            title="Back to Machine Verify"
            variant="secondary"
            onPress={() => navigation.navigate('MachineVerify')}
          />
        </View>

        {detectedOrder && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Detected Order</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Perfume</Text>
              <Text style={styles.resultValue}>
                {detectedOrder.perfumeEmoji} {detectedOrder.perfumeName}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Amount</Text>
              <Text style={styles.resultValue}>RM{detectedOrder.amount}</Text>
            </View>

            <View style={styles.codeBox}>
              <Text style={styles.codeLabel}>Detected Code</Text>
              <Text style={styles.codeText}>{detectedCode}</Text>
            </View>

            <PrimaryButton
              title="Continue to Verify"
              onPress={() => navigation.navigate('MachineVerify')}
            />
          </View>
        )}
      </ScrollView>

      <AppModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        icon={modal.icon}
        primaryText="OK"
        onPrimaryPress={handleModalClose}
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
  scannerCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  cameraFrame: {
    height: 280,
    backgroundColor: '#1E1336',
    borderRadius: 28,
    marginBottom: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerCenter: {
    alignItems: 'center',
  },
  scannerEmoji: {
    color: '#FFFFFF',
    fontSize: 58,
    marginBottom: 10,
  },
  scannerText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  scanningContent: {
    alignItems: 'center',
  },
  scanningText: {
    color: '#FFFFFF',
    fontWeight: '900',
    marginTop: 14,
  },
  scanLine: {
    position: 'absolute',
    left: 30,
    right: 30,
    height: 3,
    backgroundColor: colors.action,
    top: 138,
    borderRadius: 3,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 28,
    left: 28,
    width: 42,
    height: 42,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#FFFFFF',
    borderTopLeftRadius: 10,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 28,
    right: 28,
    width: 42,
    height: 42,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#FFFFFF',
    borderTopRightRadius: 10,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 28,
    left: 28,
    width: 42,
    height: 42,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#FFFFFF',
    borderBottomLeftRadius: 10,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 28,
    right: 28,
    width: 42,
    height: 42,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#FFFFFF',
    borderBottomRightRadius: 10,
  },
  hintText: {
    color: colors.muted,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 4,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  resultRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 4,
  },
  resultValue: {
    color: colors.text,
    fontWeight: '900',
  },
  codeBox: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  codeLabel: {
    color: colors.secondary,
    fontWeight: '900',
    marginBottom: 6,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 2,
  },
});