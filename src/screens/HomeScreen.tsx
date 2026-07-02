import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {UserRole} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  userName: string;
  userRole: UserRole;
  onLogout: () => void;
};

export default function HomeScreen({
  navigation,
  userName,
  userRole,
  onLogout,
}: Props) {
  const roleInfo = getRoleInfo(userRole);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>{roleInfo.emoji}</Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{roleInfo.badge}</Text>
          </View>

          <Text style={styles.title}>Hi, {userName || roleInfo.name}</Text>
          <Text style={styles.subtitle}>{roleInfo.subtitle}</Text>
        </View>

        {userRole === 'customer' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Customer App</Text>

            <Step number="1" text="Answer perfume preference questions" />
            <Step number="2" text="Get smart perfume recommendations" />
            <Step number="3" text="Complete mock payment" />
            <Step number="4" text="Receive QR and unlock code" />

            <PrimaryButton
              title="Start Perfume Match"
              onPress={() => navigation.navigate('Criteria')}
            />

            <PrimaryButton
              title="View My Orders"
              variant="secondary"
              onPress={() => navigation.navigate('History')}
            />
          </View>
        )}

        {userRole === 'admin' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Admin Panel</Text>

            <Text style={styles.description}>
              Monitor orders, revenue, code usage, and perfume inventory for the
              vending machine business.
            </Text>

            <PrimaryButton
              title="Admin Dashboard"
              onPress={() => navigation.navigate('AdminDashboard')}
            />

            <PrimaryButton
              title="Manage Inventory"
              variant="secondary"
              onPress={() => navigation.navigate('AdminInventory')}
            />

            <PrimaryButton
              title="View Order History"
              variant="secondary"
              onPress={() => navigation.navigate('History')}
            />
          </View>
        )}

        {userRole === 'machine' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Vending Machine Terminal</Text>

            <Text style={styles.description}>
              Verify customer unlock codes, simulate QR scanning, dispense
              perfume, and update the order status.
            </Text>

            <PrimaryButton
              title="Open Machine Verify"
              onPress={() => navigation.navigate('MachineVerify')}
            />

            <PrimaryButton
              title="Open QR Scanner"
              variant="secondary"
              onPress={() => navigation.navigate('QRScanner')}
            />

            <PrimaryButton
              title="View Order History"
              variant="secondary"
              onPress={() => navigation.navigate('History')}
            />

            <PrimaryButton
              title="View Admin Dashboard"
              variant="secondary"
              onPress={() => navigation.navigate('AdminDashboard')}
            />
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Demo Support</Text>

          <PrimaryButton
            title="System Overview"
            onPress={() => navigation.navigate('SystemOverview')}
          />

          <PrimaryButton
            title="Demo Guide"
            variant="secondary"
            onPress={() => navigation.navigate('DemoGuide')}
          />

          <PrimaryButton
            title="Switch Role / Logout"
            variant="secondary"
            onPress={onLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getRoleInfo(role: UserRole) {
  if (role === 'customer') {
    return {
      emoji: '🛍️',
      name: 'Customer',
      badge: 'Customer Mode',
      subtitle:
        'Browse perfume recommendations, complete mock payment, and receive a QR unlock code.',
    };
  }

  if (role === 'admin') {
    return {
      emoji: '📊',
      name: 'Admin',
      badge: 'Admin Mode',
      subtitle:
        'Manage sales analytics, order activity, and perfume vending machine inventory.',
    };
  }

  return {
    emoji: '🤖',
    name: 'Machine',
    badge: 'Machine Mode',
    subtitle:
      'Verify QR/manual unlock codes, dispense perfume, and mark orders as used.',
  };
}

function Step({number, text}: {number: string; text: string}) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
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
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 12,
  },
  roleBadgeText: {
    color: colors.purple,
    fontWeight: '900',
    fontSize: 12,
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
    marginBottom: 16,
  },
  description: {
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  stepText: {
    color: colors.text,
    fontSize: 15,
    flex: 1,
  },
});