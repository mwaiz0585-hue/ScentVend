import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
};

export default function DemoGuideScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.emoji}>🎤</Text>
          <Text style={styles.title}>Demo Guide</Text>
          <Text style={styles.subtitle}>
            Use this page as your quick presentation flow when explaining
            ScentVend to your lecturer or audience.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recommended Demo Flow</Text>

          <GuideStep
            number="1"
            title="Start with System Overview"
            text="Explain that ScentVend has three sides: Customer App, Machine Terminal, and Admin Panel."
          />

          <GuideStep
            number="2"
            title="Login as Customer"
            text="Show the customer role and explain that users can buy perfume through the app."
          />

          <GuideStep
            number="3"
            title="Perfume Criteria"
            text="Choose scent, occasion, category, strength, and budget to simulate personalization."
          />

          <GuideStep
            number="4"
            title="Recommendation"
            text="Explain that the app suggests suitable perfumes based on matching rules."
          />

          <GuideStep
            number="5"
            title="Payment and Unlock Code"
            text="Complete mock payment, then show receipt, QR code, and manual unlock code."
          />

          <GuideStep
            number="6"
            title="Login as Machine"
            text="Switch role to Machine and show QR scanning or manual code verification."
          />

          <GuideStep
            number="7"
            title="Dispense Perfume"
            text="Show that the code becomes used and the selected perfume stock decreases."
          />

          <GuideStep
            number="8"
            title="Login as Admin"
            text="Show dashboard analytics, order history, and inventory stock management."
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What to Mention</Text>

          <Text style={styles.bullet}>• Role-based system design</Text>
          <Text style={styles.bullet}>• Customer perfume recommendation flow</Text>
          <Text style={styles.bullet}>• Mock payment and receipt generation</Text>
          <Text style={styles.bullet}>• QR/manual unlock code verification</Text>
          <Text style={styles.bullet}>• One-time code security logic</Text>
          <Text style={styles.bullet}>• Inventory automatically reduces after dispensing</Text>
          <Text style={styles.bullet}>• Admin can monitor sales and stock</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Simple Presentation Line</Text>
          <Text style={styles.noteText}>
            ScentVend is a smart perfume vending system that allows customers to
            choose perfume preferences, receive recommendations, complete
            payment, and unlock a vending machine using a QR or manual code,
            while admins can monitor sales and inventory.
          </Text>
        </View>

        <PrimaryButton
          title="Open System Overview"
          onPress={() => navigation.navigate('SystemOverview')}
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
      </ScrollView>
    </SafeAreaView>
  );
}

function GuideStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>

      <View style={styles.stepTextBox}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepText}>{text}</Text>
      </View>
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
  stepRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  stepTextBox: {
    flex: 1,
  },
  stepTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  stepText: {
    color: colors.text,
    lineHeight: 20,
  },
  bullet: {
    color: colors.text,
    lineHeight: 24,
    marginBottom: 4,
  },
  noteCard: {
    backgroundColor: colors.cardLight,
    borderRadius: radius.card,
    padding: spacing.card,
    marginBottom: 8,
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