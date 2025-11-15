
import React from 'react';
import { TIERS } from '../constants.ts';
import { TierName, Visit } from '../types.ts';
import { CheckIcon } from './icons/CheckIcon.tsx';

interface LoyaltyCardProps {
  tierName: TierName;
  visits: Visit[];
}

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ tierName, visits }) => {
  const tier = TIERS[tierName];
  const totalStamps = tier.visitsRequired;
  const filledStamps = visits.length;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border-4 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold text-gray-800`}>Loyalty Card</h2>
        <span className={`px-4 py-1 rounded-full text-white font-semibold text-sm ${tier.color}`}>
          {tier.name}
        </span>
      </div>
      <p className="text-gray-500 mb-6">
        Complete {totalStamps} visits to earn a reward! You have {totalStamps - filledStamps} to go.
      </p>
      <div className={`grid grid-cols-5 gap-4`}>
        {Array.from({ length: totalStamps }).map((_, index) => (
          <div
            key={index}
            className={`w-full aspect-square rounded-full flex items-center justify-center transition-all duration-500
              ${
                index < filledStamps
                  ? `${tier.color} text-white`
                  : 'bg-gray-200'
              }`}
          >
            {index < filledStamps ? (
              <CheckIcon className="w-8 h-8" />
            ) : (
              <span className="text-xl font-bold text-gray-400">{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoyaltyCard;