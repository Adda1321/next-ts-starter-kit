'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../stores/userStore';

/**
 * Custom hook to initialize authentication state from server
 * Checks for existing session on mount and updates user store
 */
export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include', // Important: include cookies
        });
        
        const data = await response.json();
        
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [setUser]);

  const logout = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear user state even if API call fails
      setUser(null);
      router.push('/signin');
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
}

