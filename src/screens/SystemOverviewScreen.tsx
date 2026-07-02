import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
};

export default function SystemOverviewScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🧩</Text>
          <Text style={styles.title}>System Overview</Text>
          <Text style={styles.subtitle}>
            ScentVend is a smart perfume vending system with three main parts:
            customer app, vending machine terminal, and admin management panel.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>System Architecture</Text>

          <ArchitectureCard
            emoji="🛍️"
            title="Customer App"
            text="Users answer perfume criteria, receive recommendations, complete mock payment, and get a QR/manual unlock code."
          />

          <ArchitectureCard
            emoji="🤖"
            title="Vending Machine Terminal"
            text="The vending machine verifies the QR or manual code, checks stock availability, dispenses perfume, and marks the code as used."
          />

          <ArchitectureCard
            emoji="📊"
            title="Admin Panel"
            text="Admin can monitor sales, revenue, order activity, inventory stock, low stock, and out-of-stock perfumes."
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Main Data Flow</Text>

          <FlowStep
            number="1"
            title="User Login"
            text="The user chooses a role: Customer, Admin, or Machine."
          />

          <FlowStep
            number="2"
            title="Perfume Matching"
            text="Customer selects scent, occasion, category, strength, and budget."
          />

          <FlowStep
            number="3"
            title="Recommendation Logic"
            text="The app matches user criteria with perfume data and suggests suitable products."
          />

          <FlowStep
            number="4"
            title="Mock Payment"
            text="Customer confirms payment and the app creates an order with a unique unlock code."
          />

          <FlowStep
            number="5"
            title="QR / Code Verification"
            text="The vending machine scans or receives the code and checks whether it is valid and unused."
          />

          <FlowStep
            number="6"
            title="Dispense Perfume"
            text="After verification, the perfume is dispensed, stock is reduced, and the order status becomes used."
          />

          <FlowStep
            number="7"
            title="Admin Monitoring"
            text="Admin dashboard updates order count, revenue, code usage, and inventory status."
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prototype Features</Text>

          <Feature text="Role-based login for Customer, Admin, and Machine mode" />
          <Feature text="Perfume criteria selection and recommendation result" />
          <Feature text="Mock payment confirmation" />
          <Feature text="QR code and manual unlock code generation" />
          <Feature text="Vending machine code verification" />
          <Feature text="One-time code usage logic" />
          <Feature text="Order history and order detail receipt" />
          <Feature text="Admin dashboard analytics" />
          <Feature text="Inventory stock tracking and low-stock status" />
          <Feature text="Local storage for demo order and inventory data" />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Technology Used</Text>

          <View style={styles.techGrid}>
            <TechPill text="React Native" />
            <TechPill text="TypeScript" />
            <TechPill text="Android Emulator" />
            <TechPill text="Navigation Stack" />
            <TechPill text="Async Storage" />
            <TechPill text="QR Code" />
            <TechPill text="Local State" />
            <TechPill text="Mock Payment" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Future Improvements</Text>

          <Feature text="Connect app to Firebase or cloud database" />
          <Feature text="Add real payment gateway integration" />
          <Feature text="Use real camera QR scanning" />
          <Feature text="Connect vending machine to IoT hardware" />
          <Feature text="Add admin authentication and role permission" />
          <Feature text="Add sales report export" />
        </View>

        <View style={styles.presentationCard}>
          <Text style={styles.presentationTitle}>Presentation Summary</Text>
          <Text style={styles.presentationText}>
            ScentVend improves the perfume buying experience by allowing
            customers to select their preferences, receive smart
            recommendations, pay through the app, and unlock a perfume vending
            machine using a secure QR or manual code. Admins can also monitor
            sales and stock from the management dashboard.
          </Text>
        </View>

        <PrimaryButton
          title="Start Customer Demo"
          onPress={() => navigation.navigate('Criteria')}
        />

        <PrimaryButton
          title="Open Demo Guide"
          variant="secondary"
          onPress={() => navigation.navigate('DemoGuide')}
        />

        <PrimaryButton
          title="Back to Home"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function ArchitectureCard({
  emoji,
  title,
  text,
}: {
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.architectureCard}>
      <Text style={styles.architectureEmoji}>{emoji}</Text>

      <View style={styles.architectureTextBox}>
        <Text style={styles.architectureTitle}>{title}</Text>
        <Text style={styles.architectureText}>{text}</Text>
      </View>
    </View>
  );
}

function FlowStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.flowRow}>
      <View style={styles.flowCircle}>
        <Text style={styles.flowNumber}>{number}</Text>
      </View>

      <View style={styles.flowTextBox}>
        <Text style={styles.flowTitle}>{title}</Text>
        <Text style={styles.flowText}>{text}</Text>
      </View>
    </View>
  );
}

function Feature({text}: {text: string}) {
  return (
    <View style={styles.featureRow}>
      <Text style={styles.featureIcon}>✓</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

function TechPill({text}: {text: string}) {
  return (
    <View style={styles.techPill}>
      <Text style={styles.techText}>{text}</Text>
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
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  architectureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
  },
  architectureEmoji: {
    fontSize: 34,
    marginRight: 12,
  },
  architectureTextBox: {
    flex: 1,
  },
  architectureTitle: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
    marginBottom: 4,
  },
  architectureText: {
    color: colors.text,
    lineHeight: 20,
  },
  flowRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  flowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  flowNumber: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  flowTextBox: {
    flex: 1,
  },
  flowTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  flowText: {
    color: colors.text,
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  featureIcon: {
    color: colors.success,
    fontWeight: '900',
    marginRight: 10,
  },
  featureText: {
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  techPill: {
    backgroundColor: '#F3E8FF',
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  techText: {
    color: colors.purple,
    fontWeight: '900',
    fontSize: 12,
  },
  presentationCard: {
    backgroundColor: colors.cardLight,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  presentationTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
  },
  presentationText: {
    color: colors.text,
    lineHeight: 22,
  },
});