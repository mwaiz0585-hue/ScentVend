import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {InventoryItem, Order} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  orders: Order[];
  inventory: InventoryItem[];
};

export default function AdminDashboardScreen({
  navigation,
  orders,
  inventory,
}: Props) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const usedCodes = orders.filter(order => order.status === 'used').length;
  const unusedCodes = orders.filter(order => order.status === 'unused').length;

  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const lowStock = inventory.filter(item => item.stock > 0 && item.stock <= 3)
    .length;
  const outOfStock = inventory.filter(item => item.stock === 0).length;

  const topPerfume = getTopPerfume(orders);
  const recentOrders = orders.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>📊</Text>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>
            View sales, unlock code activity, inventory health, and recent
            perfume orders in one place.
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard label="Orders" value={totalOrders.toString()} />
          <MetricCard label="Revenue" value={`RM${totalRevenue}`} />
          <MetricCard label="Used Codes" value={usedCodes.toString()} />
          <MetricCard label="Unused Codes" value={unusedCodes.toString()} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Inventory Health</Text>

          <View style={styles.inventoryRow}>
            <InventoryMiniCard label="Total Stock" value={totalStock} />
            <InventoryMiniCard label="Low Stock" value={lowStock} />
            <InventoryMiniCard label="Empty" value={outOfStock} />
          </View>

          <PrimaryButton
            title="Manage Inventory"
            onPress={() => navigation.navigate('AdminInventory')}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Selling Perfume</Text>

          {topPerfume ? (
            <View style={styles.topPerfumeBox}>
              <Text style={styles.topPerfumeEmoji}>{topPerfume.emoji}</Text>

              <View style={styles.topPerfumeInfo}>
                <Text style={styles.topPerfumeName}>{topPerfume.name}</Text>
                <Text style={styles.topPerfumeMeta}>
                  Sold {topPerfume.count} time(s)
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.emptyText}>
              No sales yet. Create an order to see top perfume analytics.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>

          {recentOrders.length === 0 ? (
            <Text style={styles.emptyText}>No recent orders yet.</Text>
          ) : (
            recentOrders.map(order => (
              <View key={order.id} style={styles.orderRow}>
                <Text style={styles.orderEmoji}>{order.perfumeEmoji}</Text>

                <View style={styles.orderInfo}>
                  <Text style={styles.orderName}>{order.perfumeName}</Text>
                  <Text style={styles.orderMeta}>
                    RM{order.amount} • {order.status}
                  </Text>
                </View>

                <Text style={styles.orderCode}>{order.code}</Text>
              </View>
            ))
          )}

          <PrimaryButton
            title="View Full History"
            variant="secondary"
            onPress={() => navigation.navigate('History')}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <PrimaryButton
            title="Open Machine Verify"
            onPress={() => navigation.navigate('MachineVerify')}
          />

          <PrimaryButton
            title="Start Customer Demo"
            variant="secondary"
            onPress={() => navigation.navigate('Criteria')}
          />

          <PrimaryButton
            title="Back to Home"
            variant="secondary"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function InventoryMiniCard({label, value}: {label: string; value: number}) {
  return (
    <View style={styles.inventoryMiniCard}>
      <Text style={styles.inventoryMiniLabel}>{label}</Text>
      <Text style={styles.inventoryMiniValue}>{value}</Text>
    </View>
  );
}

function getTopPerfume(orders: Order[]) {
  if (orders.length === 0) {
    return null;
  }

  const perfumeCount: Record<
    string,
    {name: string; emoji: string; count: number}
  > = {};

  orders.forEach(order => {
    if (!perfumeCount[order.perfumeId]) {
      perfumeCount[order.perfumeId] = {
        name: order.perfumeName,
        emoji: order.perfumeEmoji,
        count: 0,
      };
    }

    perfumeCount[order.perfumeId].count += 1;
  });

  return Object.values(perfumeCount).sort((a, b) => b.count - a.count)[0];
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.cardLight,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 8,
  },
  metricValue: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '900',
  },
  card: {
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
  inventoryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inventoryMiniCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inventoryMiniLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
  },
  inventoryMiniValue: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  topPerfumeBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topPerfumeEmoji: {
    fontSize: 38,
    marginRight: 14,
  },
  topPerfumeInfo: {
    flex: 1,
  },
  topPerfumeName: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  topPerfumeMeta: {
    color: colors.muted,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.text,
    lineHeight: 21,
  },
  orderRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    color: colors.white,
    fontWeight: '900',
    marginBottom: 4,
  },
  orderMeta: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  orderCode: {
    color: colors.purple,
    fontWeight: '900',
    fontSize: 12,
  },
});