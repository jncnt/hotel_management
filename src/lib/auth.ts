// Authentication utilities for token management and API calls

const TOKEN_KEY = 'authToken';

export const authUtils = {
  // Token management
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  // Check if token exists and is not expired (for future use with JWT)
  isTokenValid: (): boolean => {
    const token = authUtils.getToken();
    if (!token) return false;
    
    // For mock tokens, just check existence
    // In production, you'd decode JWT and check expiration
    return token.startsWith('mock-jwt-token-');
  },

  // Get Authorization header for API calls
  getAuthHeader: (): Record<string, string> => {
    const token = authUtils.getToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  },

  // Clear all auth data
  clearAuth: (): void => {
    authUtils.removeToken();
    // Add other auth-related items to clear here (e.g., user preferences)
  },
};
