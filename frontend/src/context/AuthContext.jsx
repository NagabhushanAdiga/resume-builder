import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// Static test users for demo purposes
const STATIC_USERS = [
  {
    _id: 'demo-user-1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'demo123'
  },
  {
    _id: 'test-user-1',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test123'
  }
];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (name, email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if email matches a static user
    if (STATIC_USERS.find(u => u.email === email)) {
      return {
        success: false,
        message: 'User already exists'
      };
    }
    
    // Check if user already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return {
        success: false,
        message: 'User already exists'
      };
    }

    const userData = {
      _id: Date.now().toString(),
      name,
      email
    };

    users.push({ ...userData, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // First check static users
    const staticUser = STATIC_USERS.find(u => u.email === email && u.password === password);
    
    if (staticUser) {
      const userData = {
        _id: staticUser._id,
        name: staticUser.name,
        email: staticUser.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    
    // Then check localStorage users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } else {
      return {
        success: false,
        message: 'Invalid credentials'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

