'use client';

import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';

/**
 * AuthProvider component that initializes authentication state on app load
 * This should be placed in the root layout to check for existing sessions
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // Check for existing session on mount
    async function initAuth() {
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
        console.error('Auth initialization failed:', error);
        setUser(null);
      }
    }

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}

