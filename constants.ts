
import { Tier, TierName } from './types';

export const TIERS: Record<TierName, Tier> = {
  [TierName.BRONZE]: {
    name: TierName.BRONZE,
    visitsRequired: 10,
    color: 'bg-bronze',
    nextTier: TierName.SILVER,
  },
  [TierName.SILVER]: {
    name: TierName.SILVER,
    visitsRequired: 9,
    color: 'bg-silver',
    nextTier: TierName.GOLD,
  },
  [TierName.GOLD]: {
    name: TierName.GOLD,
    visitsRequired: 8,
    color: 'bg-gold',
    nextTier: null,
  },
};

export const ADMIN_EMAIL = 'admin@loyaltystamp.com';
