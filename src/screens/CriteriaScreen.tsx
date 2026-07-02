import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OptionButton from '../components/OptionButton';
import PrimaryButton from '../components/PrimaryButton';
import {Criteria} from '../types';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  criteria: Criteria;
  setCriteria: React.Dispatch<React.SetStateAction<Criteria>>;
};

export default function CriteriaScreen({navigation, criteria, setCriteria}: Props) {
  function updateCriteria(key: keyof Criteria, value: string) {
    setCriteria(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit() {
    const missing =
      !criteria.scent ||
      !criteria.occasion ||
      !criteria.gender ||
      !criteria.strength ||
      !criteria.budget;

    if (missing) {
      Alert.alert('Incomplete Criteria', 'Please answer all questions first.');
      return;
    }

    navigation.navigate('Recommendation');
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Perfume Criteria</Text>

        <QuestionCard title="What scent do you prefer?">
          <OptionGroup
            options={[
              ['fresh', 'Fresh'],
              ['sweet', 'Sweet'],
              ['floral', 'Floral'],
              ['woody', 'Woody'],
              ['citrus', 'Citrus'],
              ['spicy', 'Spicy'],
            ]}
            selected={criteria.scent}
            onSelect={value => updateCriteria('scent', value)}
          />
        </QuestionCard>

        <QuestionCard title="When will you use it?">
          <OptionGroup
            options={[
              ['daily', 'Daily'],
              ['office', 'Office / Class'],
              ['date', 'Date'],
              ['formal', 'Formal'],
              ['event', 'Event'],
              ['sport', 'Sport'],
            ]}
            selected={criteria.occasion}
            onSelect={value => updateCriteria('occasion', value)}
          />
        </QuestionCard>

        <QuestionCard title="Preferred category">
          <OptionGroup
            options={[
              ['male', 'Male'],
              ['female', 'Female'],
              ['unisex', 'Unisex'],
              ['any', 'Any'],
            ]}
            selected={criteria.gender}
            onSelect={value => updateCriteria('gender', value)}
          />
        </QuestionCard>

        <QuestionCard title="Scent strength">
          <OptionGroup
            options={[
              ['light', 'Light'],
              ['medium', 'Medium'],
              ['strong', 'Strong'],
            ]}
            selected={criteria.strength}
            onSelect={value => updateCriteria('strength', value)}
          />
        </QuestionCard>

        <QuestionCard title="Budget">
          <OptionGroup
            options={[
              ['40', 'Below RM40'],
              ['50', 'Below RM50'],
              ['60', 'Below RM60'],
            ]}
            selected={criteria.budget}
            onSelect={value => updateCriteria('budget', value)}
          />
        </QuestionCard>

        <PrimaryButton title="Get Recommendation" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}

function QuestionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.questionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function OptionGroup({
  options,
  selected,
  onSelect,
}: {
  options: string[][];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.optionWrap}>
      {options.map(([value, label]) => (
        <OptionButton
          key={value}
          label={label}
          selected={selected === value}
          onPress={() => onSelect(value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
  padding: spacing.screen,
  paddingBottom: 40,
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
  },
  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});