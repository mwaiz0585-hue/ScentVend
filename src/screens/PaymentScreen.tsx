import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {InventoryItem, Perfume} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  selectedPerfume: Perfume | null;
  inventory: InventoryItem[];
  onPaymentSuccess: () => void;
};

export default function PaymentScreen({
  navigation,
  selectedPerfume,
  inventory,
  onPaymentSuccess,
}: Props) {
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!selectedPerfume) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.centerBox}>
          <Text style={styles.emptyText}>No perfume selected.</Text>
          <PrimaryButton
            title="Back to Recommendation"
            onPress={() => navigation.navigate('Recommendation')}
          />
        </View>
      </SafeAreaView>
    );
  }

  const perfume = selectedPerfume;
  const stock =
    inventory.find(item => item.perfumeId === perfume.id)?.stock ?? 0;
  const isOutOfStock = stock === 0;

  function handleConfirmPayment() {
    if (isOutOfStock) {
      return;
    }

    setConfirmVisible(false);
    onPaymentSuccess();
    navigation.navigate('UnlockCode');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Payment</Text>

        <View style={styles.card}>
          <View style={styles.perfumeHeader}>
            <View style={styles.emojiBox}>
              <Text style={styles.perfumeEmoji}>{perfume.emoji}</Text>
            </View>

            <View style={styles.perfumeTextBox}>
              <Text style={styles.productName}>{perfume.name}</Text>
              <Text style={styles.vibe}>{perfume.vibe}</Text>
              <Text style={styles.stockText}>
                {isOutOfStock ? 'Out of stock' : `${stock} bottle(s) available`}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{perfume.description}</Text>

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>RM{perfume.price}</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Cardholder name"
            placeholderTextColor={colors.muted}
          />

          <TextInput
            style={styles.input}
            placeholder="Card number - mock only"
            placeholderTextColor={colors.muted}
            keyboardType="number-pad"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              placeholderTextColor={colors.muted}
            />

            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
            />
          </View>

          <PrimaryButton
            title={isOutOfStock ? 'Out of Stock' : 'Pay Now'}
            disabled={isOutOfStock}
            onPress={() => setConfirmVisible(true)}
          />

          <Text style={styles.note}>
            Prototype note: payment creates an unused unlock code. Stock is
            reduced only after the vending machine dispenses the perfume.
          </Text>
        </View>
      </ScrollView>

      <AppModal
        visible={confirmVisible}
        title="Confirm Payment"
        message={`Pay RM${perfume.price} for ${perfume.name}?`}
        primaryText="Pay"
        secondaryText="Cancel"
        icon="✨"
        onPrimaryPress={handleConfirmPayment}
        onSecondaryPress={() => setConfirmVisible(false)}
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
  pageTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  perfumeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  emojiBox: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  perfumeEmoji: {
    fontSize: 34,
  },
  perfumeTextBox: {
    flex: 1,
  },
  productName: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  vibe: {
    color: colors.purple,
    fontWeight: '800',
    marginBottom: 4,
  },
  stockText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  description: {
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  totalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    color: colors.muted,
    marginBottom: 4,
  },
  totalAmount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  note: {
    color: colors.muted,
    marginTop: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.screen,
  },
  emptyText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
  },
});