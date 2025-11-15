
export enum TierName {
  BRONZE = 'Bronze',
  SILVER = 'Silver',
  GOLD = 'Gold',
}

export interface Tier {
  name: TierName;
  visitsRequired: number;
  color: string;
  nextTier: TierName | null;
}

export interface Visit {
  date: string;
  amount: number;
}

export interface Reward {
  amount: number;
  dateEarned: string;
}

export interface User {
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
  id: string; // Unique barcode ID
  tier: TierName;
  visits: Visit[];
  rewards: Reward[];
  isAdmin: boolean;
}
