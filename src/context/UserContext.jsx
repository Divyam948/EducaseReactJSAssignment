import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'educase-popx-user';

const defaultUser = {
  fullName: 'Marry Doe',
  phoneNumber: 'Marry Doe',
  email: 'Marry@Gmail.Com',
  password: 'Marry Doe',
  companyName: 'Marry Doe',
  isAgency: true,
};

const UserContext = createContext(null);

function getStoredUser() {
  if (typeof window === 'undefined') {
    return defaultUser;
  }

  const rawUser = window.localStorage.getItem(STORAGE_KEY);

  if (!rawUser) {
    return defaultUser;
  }

  try {
    return { ...defaultUser, ...JSON.parse(rawUser) };
  } catch {
    return defaultUser;
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const register = (formData) => {
    setUser({
      ...defaultUser,
      ...formData,
    });
  };

  const login = (credentials) => {
    setUser((currentUser) => ({
      ...currentUser,
      email: credentials.email || currentUser.email,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
