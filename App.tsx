
import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm.tsx';
import UserDashboard from './components/UserDashboard.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import { User } from './types.ts';
import { getUserByEmail } from './services/db.ts';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      // Check for a logged-in user in session storage
      const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
      if (loggedInUserEmail) {
        const user = await getUserByEmail(loggedInUserEmail);
        setCurrentUser(user);
      }
      setIsLoading(false);
    };
    
    checkUserSession();
  }, []);
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('loggedInUser', user.email);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('loggedInUser');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
      </div>
    );
  }

  if (!currentUser) {
    return <AuthForm onLoginSuccess={handleLogin} />;
  }

  if (currentUser.isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <UserDashboard user={currentUser} onLogout={handleLogout} />;
};

export default App;