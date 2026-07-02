import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import AppModal from '../components/AppModal';
import {UserRole} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  onLogin: (name: string, role: UserRole) => void;
};

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  icon: string;
};

export default function LoginScreen({onLogin}: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('demo@scentvend.com');
  const [password, setPassword] = useState('123456');

  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    message: '',
    icon: '⚠️',
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

  function isValidEmail(value: string) {
    return value.includes('@') && value.includes('.');
  }

  function getRoleLabel(role: UserRole) {
    if (role === 'customer') {
      return 'Customer';
    }

    if (role === 'admin') {
      return 'Admin';
    }

    return 'Machine';
  }

  function useDemoRole(role: UserRole) {
    setSelectedRole(role);

    if (role === 'customer') {
      setName('Customer Demo');
      setEmail('customer@scentvend.com');
      setPassword('123456');
      return;
    }

    if (role === 'admin') {
      setName('Admin Demo');
      setEmail('admin@scentvend.com');
      setPassword('123456');
      return;
    }

    setName('Machine Demo');
    setEmail('machine@scentvend.com');
    setPassword('123456');
  }

  function handleSubmit() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      showModal(
        'Missing Details',
        'Please enter your email and password.',
        '⚠️',
      );
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      showModal('Invalid Email', 'Please enter a valid email address.', '📧');
      return;
    }

    if (password.length < 6) {
      showModal(
        'Weak Password',
        'Password must be at least 6 characters.',
        '🔒',
      );
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      showModal('Missing Name', 'Please enter your name.', '👤');
      return;
    }

    const displayName = name.trim() || cleanEmail.split('@')[0];
    onLogin(displayName, selectedRole);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.logo}>ScentVend</Text>
          <Text style={styles.emoji}>🌸</Text>
          <Text style={styles.title}>Smart Perfume Vending</Text>
          <Text style={styles.subtitle}>
            Choose a role to experience ScentVend as a customer, vending machine,
            or admin system.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </Text>

          <Text style={styles.helperText}>
            Select a role for this demo. Each role shows a different app mode.
          </Text>

          <View style={styles.roleGrid}>
            <RoleCard
              emoji="🛍️"
              title="Customer"
              subtitle="Buy perfume"
              selected={selectedRole === 'customer'}
              onPress={() => useDemoRole('customer')}
            />

            <RoleCard
              emoji="📊"
              title="Admin"
              subtitle="Manage system"
              selected={selectedRole === 'admin'}
              onPress={() => useDemoRole('admin')}
            />

            <RoleCard
              emoji="🤖"
              title="Machine"
              subtitle="Verify code"
              selected={selectedRole === 'machine'}
              onPress={() => useDemoRole('machine')}
            />
          </View>

          <View style={styles.selectedRoleBox}>
            <Text style={styles.selectedRoleLabel}>Selected Mode</Text>
            <Text style={styles.selectedRoleText}>
              {getRoleLabel(selectedRole)}
            </Text>
          </View>

          {mode === 'signup' && (
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.muted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <PrimaryButton
            title={`Enter as ${getRoleLabel(selectedRole)}`}
            onPress={handleSubmit}
          />

          <PrimaryButton
            title={
              mode === 'login'
                ? 'New user? Create account'
                : 'Already have an account? Login'
            }
            variant="secondary"
            onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}
          />
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

function RoleCard({
  emoji,
  title,
  subtitle,
  selected,
  onPress,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.roleCard, selected && styles.selectedRoleCard]}>
      <Text style={styles.roleEmoji}>{emoji}</Text>
      <Text style={[styles.roleTitle, selected && styles.selectedRoleTitle]}>
        {title}
      </Text>
      <Text style={styles.roleSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.screen,
    paddingTop: (StatusBar.currentHeight || 0) + 18,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 24,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logo: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 18,
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
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  helperText: {
    color: colors.muted,
    lineHeight: 20,
    marginBottom: 14,
  },
  roleGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  selectedRoleCard: {
    borderColor: colors.purple,
    backgroundColor: '#F3E8FF',
  },
  roleEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  roleTitle: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
    marginBottom: 2,
  },
  selectedRoleTitle: {
    color: colors.purple,
  },
  roleSubtitle: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  selectedRoleBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  selectedRoleLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 4,
  },
  selectedRoleText: {
    color: colors.white,
    fontSize: 20,
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
});