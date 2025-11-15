
import React from 'react';
import { User } from '../types';
import Barcode from './Barcode';
import LoyaltyCard from './LoyaltyCard';

interface UserDashboardProps {
  user: User;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <LoyaltyCard tierName={user.tier} visits={user.visits} />
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Unique Code</h3>
                <Barcode value={user.id} />
            </div>
          </div>
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rewards</h3>
                {user.rewards.length > 0 ? (
                  <ul className="space-y-3">
                    {user.rewards.map((reward, index) => (
                      <li key={index} className="flex justify-between items-center bg-secondary/10 p-3 rounded-lg">
                         <span className="font-semibold text-secondary">Reward Earned</span>
                         <span className="font-bold text-lg text-secondary">${reward.amount.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No rewards earned yet. Keep visiting!</p>
                )}
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visit History</h3>
                {user.visits.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <ul className="space-y-3">
                      {[...user.visits].reverse().map((visit, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                          <span className="text-gray-600">{new Date(visit.date).toLocaleDateString()}</span>
                          <span className="font-semibold text-gray-800">${visit.amount.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">Your visits will appear here.</p>
                )}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
