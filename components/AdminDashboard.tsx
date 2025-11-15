import React, { useState } from 'react';
import { User, Visit, Reward } from '../types';
import { getUserByEmail, getUserById, updateUser } from '../services/db';
import LoyaltyCard from './LoyaltyCard';
import { TIERS, ADMIN_EMAIL } from '../constants';
import { BarcodeIcon } from './icons/BarcodeIcon';
import { UserIcon } from './icons/UserIcon';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'id'>('email');
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visitAmount, setVisitAmount] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFoundUser(null);
    if (!searchQuery) return;

    setIsSearching(true);
    let user = null;
    if (searchType === 'email') {
        user = await getUserByEmail(searchQuery);
    } else {
        user = await getUserById(searchQuery);
    }
    setIsSearching(false);
    
    if (user && user.email !== ADMIN_EMAIL) {
        setFoundUser(user);
    } else {
        setError('User not found or is an admin.');
    }
  };

  const handleAddVisit = async () => {
    setError('');
    setSuccess('');
    if (!foundUser || !visitAmount) return;

    const amount = parseFloat(visitAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    
    setIsUpdating(true);

    const updatedUser = { ...foundUser };
    const newVisit: Visit = { date: new Date().toISOString(), amount };
    updatedUser.visits = [...updatedUser.visits, newVisit];

    const currentTier = TIERS[updatedUser.tier];
    if (updatedUser.visits.length >= currentTier.visitsRequired) {
      const averageAmount = updatedUser.visits.reduce((sum, v) => sum + v.amount, 0) / updatedUser.visits.length;
      const newReward: Reward = { amount: averageAmount, dateEarned: new Date().toISOString() };
      updatedUser.rewards = [...updatedUser.rewards, newReward];
      
      updatedUser.visits = [];
      setSuccess(`Reward of $${averageAmount.toFixed(2)} added! Card reset.`);

      if (currentTier.nextTier) {
        updatedUser.tier = currentTier.nextTier;
        setSuccess(prev => `${prev} User promoted to ${currentTier.nextTier}!`);
      }
    } else {
      setSuccess(`Visit added successfully. ${currentTier.visitsRequired - updatedUser.visits.length} more to go!`);
    }

    const result = await updateUser(updatedUser);
    if (result) {
        setFoundUser(result);
    } else {
        setError("Failed to update user. Please try again.");
        setSuccess('');
    }
    
    setVisitAmount('');
    setIsUpdating(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Find Customer</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {searchType === 'email' ? <UserIcon className="h-5 w-5 text-gray-400" /> : <BarcodeIcon className="h-5 w-5 text-gray-400" />}
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search by ${searchType}`}
                    className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value as 'email' | 'id')}
                className="rounded-md border-0 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
              >
                  <option value="email">Email</option>
                  <option value="id">Barcode ID</option>
              </select>
              <button type="submit" disabled={isSearching} className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 transition-colors disabled:bg-indigo-300">
                {isSearching ? '...' : 'Search'}
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        {foundUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <LoyaltyCard tierName={foundUser.tier} visits={foundUser.visits} />
             </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-gray-800">{foundUser.email}</h3>
                <p className="text-sm text-gray-500 mb-4">ID: {foundUser.id}</p>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="visitAmount" className="block text-sm font-medium text-gray-700">
                            Purchase Amount
                        </label>
                        <input
                            type="number"
                            id="visitAmount"
                            value={visitAmount}
                            onChange={(e) => setVisitAmount(e.target.value)}
                            placeholder="e.g., 15.50"
                            step="0.01"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={handleAddVisit}
                        disabled={!visitAmount || isUpdating}
                        className="w-full px-4 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 disabled:bg-gray-400 transition-colors"
                    >
                        {isUpdating ? 'Adding...' : 'Add Visit'}
                    </button>
                </div>
                {success && <p className="mt-4 text-sm text-green-600">{success}</p>}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;