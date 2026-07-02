import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {InventoryItem, Order} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  incomingCode: string;
  clearIncomingCode: () => void;
};

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
};

export default function MachineVerifyScreen({
  navigation,
  orders,
  setOrders,
  inventory,
  setInventory,
  incomingCode,
  clearIncomingCode,
}: Props) {
  const [code, setCode] = useState('');
  const [verifiedOrder, setVerifiedOrder] = useState<Order | null>(null);

  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    message: '',
    icon: '✨',
  });

  function showModal(title: string, message: string, icon: string) {
    setModal({
      visible: true,
      title,
      message,
      icon,
    });
  }

  function closeModal() {
    setModal(prev => ({
      ...prev,
      visible: false,
    }));
  }

  function getStock(perfumeId: string) {
    return inventory.find(item => item.perfumeId === perfumeId)?.stock ?? 0;
  }

  function verifyOrderByCode(enteredCode: string) {
    const cleanCode = enteredCode.trim().toUpperCase();

    if (!cleanCode) {
      showModal('Missing Code', 'Please enter the unlock code first.', '⚠️');
      return false;
    }

    const matchedOrder = orders.find(
      order => order.code.toUpperCase() === cleanCode,
    );

    if (!matchedOrder) {
      setVerifiedOrder(null);
      showModal(
        'Invalid Code',
        'This code does not match any successful order.',
        '❌',
      );
      return false;
    }

    if (matchedOrder.status === 'used') {
      setVerifiedOrder(null);
      showModal(
        'Code Already Used',
        `This code was already used on ${
          matchedOrder.usedAt || 'a previous time'
        }.`,
        '🔒',
      );
      return false;
    }

    const stock = getStock(matchedOrder.perfumeId);

    if (stock === 0) {
      setVerifiedOrder(null);
      showModal(
        'Out of Stock',
        `${matchedOrder.perfumeName} is currently out of stock in the vending machine.`,
        '📦',
      );
      return false;
    }

    setVerifiedOrder(matchedOrder);
    return true;
  }

  useEffect(() => {
    if (!incomingCode) {
      return;
    }

    setCode(incomingCode);

    const verified = verifyOrderByCode(incomingCode);

    if (verified) {
      showModal(
        'QR Code Scanned',
        `Detected unlock code: ${incomingCode}`,
        '📷',
      );
    }

    clearIncomingCode();
  }, [incomingCode]);

  function handleVerify() {
    verifyOrderByCode(code);
  }

  function handleDispense() {
    if (!verifiedOrder) {
      return;
    }

    const currentStock = getStock(verifiedOrder.perfumeId);

    if (currentStock === 0) {
      showModal(
        'Out of Stock',
        `${verifiedOrder.perfumeName} is currently out of stock.`,
        '📦',
      );
      return;
    }

    const usedTime = new Date().toLocaleString();

    setInventory(prevInventory =>
      prevInventory.map(item =>
        item.perfumeId === verifiedOrder.perfumeId
          ? {
              ...item,
              stock: Math.max(0, item.stock - 1),
              updatedAt: usedTime,
            }
          : item,
      ),
    );

    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === verifiedOrder.id
          ? {
              ...order,
              status: 'used',
              usedAt: usedTime,
            }
          : order,
      ),
    );

    showModal(
      'Perfume Dispensed',
      `${verifiedOrder.perfumeName} has been unlocked from the vending machine. Stock reduced by 1.`,
      '✅',
    );

    setCode('');
    setVerifiedOrder(null);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🤖</Text>
          <Text style={styles.title}>Vending Machine Mode</Text>
          <Text style={styles.subtitle}>
            Enter the unlock code manually or open the QR scanner to verify the
            order and release the perfume.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Verify Unlock Code</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: PV-123456"
            placeholderTextColor={colors.muted}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
          />

          <PrimaryButton title="Verify Code" onPress={handleVerify} />

          <PrimaryButton
            title="Open QR Scanner"
            variant="secondary"
            onPress={() => navigation.navigate('QRScanner')}
          />

          <Text style={styles.mockNote}>
            The QR scanner page simulates a vending machine camera reading the
            latest unused customer QR code.
          </Text>

          {verifiedOrder && (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Code Verified ✅</Text>

              <Text style={styles.infoText}>
                Perfume: {verifiedOrder.perfumeName}
              </Text>
              <Text style={styles.infoText}>Amount: RM{verifiedOrder.amount}</Text>
              <Text style={styles.infoText}>Status: Ready to dispense</Text>
              <Text style={styles.infoText}>
                Stock left: {getStock(verifiedOrder.perfumeId)}
              </Text>
              <Text style={styles.infoText}>Date: {verifiedOrder.date}</Text>

              <PrimaryButton title="Dispense Perfume" onPress={handleDispense} />
            </View>
          )}

          <PrimaryButton
            title="Back to Home"
            variant="secondary"
            onPress={() => navigation.navigate('Home')}
          />
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Prototype Logic</Text>
          <Text style={styles.noteText}>
            The vending machine checks the unlock code, confirms that the
            perfume is still in stock, dispenses it, marks the code as used, and
            reduces stock by 1.
          </Text>
        </View>
      </ScrollView>

      <AppModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        icon={modal.icon}
        primaryText="OK"
        onPrimaryPress={closeModal}
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
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    color: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  mockNote: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 4,
  },
  successBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.success,
  },
  successTitle: {
    color: colors.success,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  infoText: {
    color: colors.text,
    marginBottom: 6,
  },
  noteCard: {
    backgroundColor: colors.cardLight,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noteTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  noteText: {
    color: colors.text,
    lineHeight: 21,
  },
});