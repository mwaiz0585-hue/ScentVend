import {InventoryItem} from '../types';
import {perfumes} from './perfumes';

const stockByPerfumeId: Record<string, number> = {
  p1: 10,
  p2: 8,
  p3: 6,
  p4: 9,
  p5: 7,
  p6: 12,
};

export const defaultInventory: InventoryItem[] = perfumes.map(perfume => ({
  perfumeId: perfume.id,
  perfumeName: perfume.name,
  perfumeEmoji: perfume.emoji,
  stock: stockByPerfumeId[perfume.id] ?? 5,
  maxStock: stockByPerfumeId[perfume.id] ?? 5,
  updatedAt: new Date().toLocaleString(),
}));