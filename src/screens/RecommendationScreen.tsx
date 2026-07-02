import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import {Criteria, InventoryItem, Perfume} from '../types';
import {recommendPerfume} from '../utils/recommendPerfume';
import {colors, radius, spacing} from '../styles/theme';

type Props = {
  navigation: any;
  criteria: Criteria;
  inventory: InventoryItem[];
  setSelectedPerfume: React.Dispatch<React.SetStateAction<Perfume | null>>;
};

export default function RecommendationScreen({
  navigation,
  criteria,
  inventory,
  setSelectedPerfume,
}: Props) {
  const recommendations = recommendPerfume(criteria);

  function getStock(perfumeId: string) {
    return inventory.find(item => item.perfumeId === perfumeId)?.stock ?? 0;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Recommended For You</Text>

        <Text style={styles.pageSubtitle}>
          Based on your scent preference, we found these perfume matches.
        </Text>

        {recommendations.map((perfume, index) => {
          const stock = getStock(perfume.id);
          const isOutOfStock = stock === 0;

          return (
            <View key={perfume.id} style={styles.productCard}>
              <View style={styles.topRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.perfumeEmoji}>{perfume.emoji}</Text>
                </View>

                <View style={styles.productHeader}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {index === 0 ? 'Best Match' : `Option ${index + 1}`}
                    </Text>
                  </View>

                  <Text style={styles.productName}>{perfume.name}</Text>
                  <Text style={styles.vibe}>{perfume.vibe}</Text>
                </View>
              </View>

              <Text style={styles.description}>{perfume.description}</Text>

              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{capitalize(perfume.strength)}</Text>
                </View>

                <View style={styles.chip}>
                  <Text style={styles.chipText}>{capitalize(perfume.gender)}</Text>
                </View>

                <View style={styles.chip}>
                  <Text style={styles.chipText}>RM{perfume.price}</Text>
                </View>

                <View style={[styles.chip, isOutOfStock && styles.outChip]}>
                  <Text
                    style={[
                      styles.chipText,
                      isOutOfStock && styles.outChipText,
                    ]}>
                    {isOutOfStock ? 'Out of Stock' : `${stock} left`}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Main Notes</Text>
                <Text style={styles.infoText}>{perfume.notes}</Text>
              </View>

              <PrimaryButton
                title={isOutOfStock ? 'Out of Stock' : `Buy ${perfume.name}`}
                disabled={isOutOfStock}
                onPress={() => {
                  setSelectedPerfume(perfume);
                  navigation.navigate('Payment');
                }}
              />
            </View>
          );
        })}

        <PrimaryButton
          title="Change Criteria"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
    marginBottom: 6,
  },
  pageSubtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 18,
  },
  productCard: {
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
    marginBottom: 14,
  },
  iconBox: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  perfumeEmoji: {
    fontSize: 38,
  },
  productHeader: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.action,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginBottom: 8,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
  },
  productName: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 4,
  },
  vibe: {
    color: colors.purple,
    fontWeight: '800',
  },
  description: {
    color: colors.text,
    lineHeight: 22,
    marginBottom: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  outChip: {
    backgroundColor: '#FFE4E6',
    borderColor: '#FECDD3',
  },
  chipText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 12,
  },
  outChipText: {
    color: '#E11D48',
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    color: colors.muted,
    fontWeight: '800',
    marginBottom: 4,
  },
  infoText: {
    color: colors.text,
    lineHeight: 21,
  },
});