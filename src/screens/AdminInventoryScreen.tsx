import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import AppModal from '../components/AppModal';
import PrimaryButton from '../components/PrimaryButton';
import {InventoryItem} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  inventory: InventoryItem[];
  updateInventoryStock: (perfumeId: string, amount: number) => void;
  onResetInventory: () => void;
};

export default function AdminInventoryScreen({
  navigation,
  inventory,
  updateInventoryStock,
  onResetInventory,
}: Props) {
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const outOfStockCount = inventory.filter(item => item.stock === 0).length;
  const lowStockCount = inventory.filter(
    item => item.stock > 0 && item.stock <= 3,
  ).length;

  function handleReset() {
    onResetInventory();
    setResetModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>📦</Text>
          <Text style={styles.title}>Admin Inventory</Text>
          <Text style={styles.subtitle}>
            Monitor vending machine perfume stock. When a perfume is dispensed,
            the stock is automatically reduced.
          </Text>
        </View>

        <View style={styles.summaryGrid}>
          <SummaryCard label="Total Stock" value={totalStock.toString()} />
          <SummaryCard label="Low Stock" value={lowStockCount.toString()} />
          <SummaryCard label="Out of Stock" value={outOfStockCount.toString()} />
        </View>

        {inventory.map(item => {
          const isEmpty = item.stock === 0;
          const isLow = item.stock > 0 && item.stock <= 3;

          return (
            <View key={item.perfumeId} style={styles.stockCard}>
              <View style={styles.stockTopRow}>
                <View style={styles.emojiBox}>
                  <Text style={styles.itemEmoji}>{item.perfumeEmoji}</Text>
                </View>

                <View style={styles.stockInfo}>
                  <Text style={styles.itemName}>{item.perfumeName}</Text>
                  <Text style={styles.itemMeta}>
                    Last updated: {item.updatedAt || 'Not updated'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    isEmpty
                      ? styles.emptyBadge
                      : isLow
                      ? styles.lowBadge
                      : styles.activeBadge,
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      isEmpty
                        ? styles.emptyText
                        : isLow
                        ? styles.lowText
                        : styles.activeText,
                    ]}>
                    {isEmpty ? 'Empty' : isLow ? 'Low' : 'Active'}
                  </Text>
                </View>
              </View>

              <View style={styles.stockBox}>
                <Text style={styles.stockLabel}>Current Stock</Text>
                <Text style={styles.stockValue}>{item.stock}</Text>
              </View>

              <View style={styles.controlRow}>
                <StockButton
                  label="-1"
                  onPress={() => updateInventoryStock(item.perfumeId, -1)}
                  disabled={item.stock === 0}
                />

                <StockButton
                  label="+1"
                  onPress={() => updateInventoryStock(item.perfumeId, 1)}
                />

                <StockButton
                  label="+5"
                  onPress={() => updateInventoryStock(item.perfumeId, 5)}
                />
              </View>
            </View>
          );
        })}

        <PrimaryButton
          title="Reset Demo Stock"
          variant="secondary"
          onPress={() => setResetModalVisible(true)}
        />

        <PrimaryButton
          title="Back to Home"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </ScrollView>

      <AppModal
        visible={resetModalVisible}
        title="Reset Demo Stock"
        message="This will reset all perfume stock to the default demo quantity."
        icon="📦"
        primaryText="Reset"
        secondaryText="Cancel"
        onPrimaryPress={handleReset}
        onSecondaryPress={() => setResetModalVisible(false)}
      />
    </SafeAreaView>
  );
}

function SummaryCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function StockButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.stockButton, disabled && styles.disabledStockButton]}>
      <Text style={[styles.stockButtonText, disabled && styles.disabledText]}>
        {label}
      </Text>
    </Pressable>
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
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryLabel: {
    color: colors.muted,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 6,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '900',
  },
  stockCard: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stockTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  emojiBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 30,
  },
  stockInfo: {
    flex: 1,
  },
  itemName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  itemMeta: {
    color: colors.muted,
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  activeBadge: {
    backgroundColor: '#D1FAE5',
  },
  lowBadge: {
    backgroundColor: '#FEF3C7',
  },
  emptyBadge: {
    backgroundColor: '#FFE4E6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
  },
  activeText: {
    color: colors.success,
  },
  lowText: {
    color: '#D97706',
  },
  emptyText: {
    color: '#E11D48',
  },
  stockBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stockLabel: {
    color: colors.muted,
    marginBottom: 4,
  },
  stockValue: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stockButton: {
    flex: 1,
    backgroundColor: colors.action,
    paddingVertical: 13,
    borderRadius: radius.button,
    alignItems: 'center',
  },
  disabledStockButton: {
    backgroundColor: '#E5E0EC',
  },
  stockButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  disabledText: {
    color: '#9B91AA',
  },
});