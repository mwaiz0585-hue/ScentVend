import {Criteria, Perfume} from '../types';
import {perfumes} from '../data/perfumes';

export function recommendPerfume(criteria: Criteria): Perfume[] {
  const budget = Number(criteria.budget || 999);

  return [...perfumes]
    .map(perfume => {
      let score = 0;

      if (perfume.profile.includes(criteria.scent)) {
        score += 4;
      }

      if (perfume.occasion.includes(criteria.occasion)) {
        score += 3;
      }

      if (
        criteria.gender === 'any' ||
        perfume.gender === 'unisex' ||
        perfume.gender === criteria.gender
      ) {
        score += 2;
      }

      if (perfume.strength === criteria.strength) {
        score += 2;
      }

      if (perfume.price <= budget) {
        score += 1;
      }

      return {
        perfume,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.perfume);
}