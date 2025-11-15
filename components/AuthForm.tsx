
import React, { useState } from 'react';
import { User, TierName } from '../types.ts';
import { createUser, getUserByEmail } from '../services/db.ts';
import { EyeIcon } from './icons/EyeIcon.tsx';
import { EyeSlashIcon } from './icons/EyeSlashIcon.tsx';
import { UserIcon } from './icons/UserIcon.tsx';
import { LockIcon } from './icons/LockIcon.tsx';

interface AuthFormProps {
  onLoginSuccess: (user: User) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLogin) {
      const user = await getUserByEmail(email);
      if (user && user.passwordHash === password) {
        onLoginSuccess(user);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
      
      const newUser: User = {
        email,
        passwordHash: password, // In a real app, hash this password!
        id: `user-${Date.now()}`,
        tier: TierName.BRONZE,
        visits: [],
        rewards: [],
        isAdmin: false,
      };

      const createdUser = await createUser(newUser);
      if (createdUser) {
        onLoginSuccess(createdUser);
      } else {
        setError('An account with this email already exists.');
      }
    }
    setIsLoading(false);
  };

  const InputField = ({ id, type, value, onChange, placeholder, icon, children }: { id: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; icon: React.ReactNode, children?: React.ReactNode }) => (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isLoading}
      />
      {children}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-4xl font-bold text-center text-primary">Loyalty Stamp</h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" icon={<UserIcon className="h-5 w-5 text-gray-400" />} />
          
          <InputField id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" icon={<LockIcon className="h-5 w-5 text-gray-400" />}>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3">
              {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
            </button>
          </InputField>

          {!isLogin && (
             <InputField id="confirm-password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" icon={<LockIcon className="h-5 w-5 text-gray-400" />} />
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors disabled:bg-indigo-300"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold leading-6 text-primary hover:text-indigo-500 ml-1">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;