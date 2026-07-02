export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Criteria: undefined;
  Recommendation: undefined;
  Payment: undefined;
  UnlockCode: undefined;
  History: undefined;
  MachineVerify: undefined;
  QRScanner: undefined;
  AdminInventory: undefined;
  AdminDashboard: undefined;
  DemoGuide: undefined;
  SystemOverview: undefined;
  OrderDetails: undefined;
};

export type UserRole = 'customer' | 'admin' | 'machine';

export type Criteria = {
  scent: string;
  occasion: string;
  gender: string;
  strength: string;
  budget: string;
};

export type Perfume = {
  id: string;
  name: string;
  emoji: string;
  vibe: string;
  profile: string[];
  occasion: string[];
  gender: string;
  strength: string;
  price: number;
  notes: string;
  description: string;
};

export type OrderStatus = 'unused' | 'used';

export type Order = {
  id: string;
  perfumeId: string;
  perfumeName: string;
  perfumeEmoji: string;
  amount: number;
  code: string;
  date: string;
  status: OrderStatus;
  usedAt?: string;
};

export type InventoryItem = {
  perfumeId: string;
  perfumeName: string;
  perfumeEmoji: string;
  stock: number;
  maxStock: number;
  updatedAt?: string;
};