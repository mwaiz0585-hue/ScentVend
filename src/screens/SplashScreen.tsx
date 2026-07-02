import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, radius, spacing} from '../styles/theme';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoCard}>
          <Text style={styles.emoji}>🌸</Text>
          <Text style={styles.logo}>ScentVend</Text>
          <Text style={styles.tagline}>
            Smart perfume vending with AI-style matching, QR unlock, and stock
            tracking.
          </Text>

          <ActivityIndicator size="large" color={colors.action} />

          <Text style={styles.loadingText}>Preparing your demo app...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.screen,
    justifyContent: 'center',
  },
  logoCard: {
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 14,
  },
  logo: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 10,
  },
  tagline: {
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  loadingText: {
    color: colors.muted,
    marginTop: 18,
    fontWeight: '800',
  },
});