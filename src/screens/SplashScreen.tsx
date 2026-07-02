import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../styles/theme';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7FC" />

      <View style={styles.container}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🌸</Text>
        </View>

        <Text style={styles.appName}>ScentVend</Text>

        <Text style={styles.title}>Smart Perfume Vending</Text>

        <Text style={styles.subtitle}>
          Find your scent, pay securely, and unlock your perfume vending machine.
        </Text>

        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#FF4AA2" />
          <Text style={styles.loadingText}>Loading your fragrance experience...</Text>
        </View>
      </View>

      <Text style={styles.footerText}>Customer • Machine • Admin</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF7FC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoCircle: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#F4D9FF',
    shadowColor: '#FF4AA2',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 6,
  },
  logoEmoji: {
    fontSize: 58,
  },
  appName: {
    color: '#FF4AA2',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  title: {
    color: '#1E1336',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#6B5E7A',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 15,
    marginBottom: 30,
  },
  loadingBox: {
    alignItems: 'center',
    marginTop: 8,
  },
  loadingText: {
    color: '#8B7A99',
    marginTop: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  footerText: {
    color: '#8B7A99',
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 24,
  },
});