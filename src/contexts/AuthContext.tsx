import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User, LoginCredentials, SignupCredentials, AuthContextType, AuthState } from '../types/auth';

interface AuthAction {
  type: 'LOGIN_START' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGOUT' | 'CHECK_AUTH';
  payload?: {
    user?: User;
    token?: string;
  };
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'CHECK_AUTH':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Query users from Supabase database
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email);
      
      if (error) {
        throw new Error('Database error. Please try again.');
      }
      
      if (!users || users.length === 0) {
        throw new Error('Email not found. Please check your email or sign up for a new account.');
      }
      
      const user = users[0];
      
      // Check password
      if (user.password !== credentials.password) {
        throw new Error('Incorrect password. Please try again.');
      }
      
      // Create a simple token (in production, use JWT)
      const token = 'auth-token-' + Date.now();
      localStorage.setItem('authToken', token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        throw new Error('Please enter a valid email address.');
      }
      
      // Validate password
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      
      // Check if email already exists
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', credentials.email);
      
      if (checkError) {
        throw new Error('Database error. Please try again.');
      }
      
      if (existingUsers && existingUsers.length > 0) {
        throw new Error('This email is already registered. Please use a different email or try logging in.');
      }
      
      // Create new user in Supabase
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          email: credentials.email,
          name: credentials.name,
          role: credentials.role,
          password: credentials.password
        });
      
      if (insertError) {
        throw new Error('Failed to create account. Please try again.');
      }
      
      // Don't automatically log in after signup - let user go to login page
      dispatch({ type: 'LOGIN_FAILURE' });
      
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In production, you'd validate the token with your API
      // For now, we'll just check if a token exists
      dispatch({ type: 'CHECK_AUTH' });
    } else {
      dispatch({ type: 'CHECK_AUTH' });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
