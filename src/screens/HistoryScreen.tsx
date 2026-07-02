import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {Order} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  orders: Order[];
  onClearHistory: () => void;
  onSelectOrder: (order: Order) => void;
};

export default function HistoryScreen({
  navigation,
  orders,
  onClearHistory,
  onSelectOrder,
}: Props) {
  const [clearModalVisible, setClearModalVisible] = useState(false);

  function handleClearConfirm() {
    onClearHistory();
    setClearModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Order History</Text>

        {orders.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.emptyText}>No orders yet.</Text>

            <PrimaryButton
              title="Find Perfume Now"
              onPress={() => navigation.navigate('Criteria')}
            />
          </View>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.historyCard}>
              <View style={styles.topRow}>
                <View style={styles.orderTitleBox}>
                  <Text style={styles.productName}>
                    {order.perfumeEmoji} {order.perfumeName}
                  </Text>
                  <Text style={styles.receiptText}>
                    Receipt: SV-{order.id.slice(-6)}
                  </Text>
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

              <Text style={styles.infoText}>Amount: RM{order.amount}</Text>
              <Text style={styles.infoText}>Purchased: {order.date}</Text>

              {order.usedAt && (
                <Text style={styles.infoText}>Used: {order.usedAt}</Text>
              )}

              <View style={styles.codeBox}>
                <Text style={styles.codeLabel}>Unlock Code</Text>
                <Text style={styles.codeText}>{order.code}</Text>
              </View>

              <PrimaryButton
                title="View Details"
                onPress={() => onSelectOrder(order)}
              />
            </View>
          ))
        )}

        {orders.length > 0 && (
          <PrimaryButton
            title="Clear Demo History"
            variant="secondary"
            onPress={() => setClearModalVisible(true)}
          />
        )}

        <PrimaryButton
          title="Back to Home"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </ScrollView>

      <AppModal
        visible={clearModalVisible}
        title="Clear Demo History"
        message="This will remove all saved orders and unlock codes from this demo app."
        icon="🧹"
        primaryText="Clear"
        secondaryText="Cancel"
        onPrimaryPress={handleClearConfirm}
        onSecondaryPress={() => setClearModalVisible(false)}
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
  emptyText: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
  },
  historyCard: {
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
    marginBottom: 8,
  },
  orderTitleBox: {
    flex: 1,
  },
  productName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  receiptText: {
    color: colors.muted,
    fontWeight: '800',
  },
  statusBadge: {
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
  infoText: {
    color: colors.text,
    marginBottom: 6,
  },
  codeBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  codeLabel: {
    color: colors.muted,
    marginBottom: 4,
  },
  codeText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1,
  },
});