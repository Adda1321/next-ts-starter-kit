import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
  setUser: (user: User | null) => void;
  setAuthInitialized: (initialized: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthInitialized: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isAuthInitialized: true }),
  setAuthInitialized: (initialized) => set({ isAuthInitialized: initialized }),
  logout: () => set({ user: null, isAuthenticated: false, isAuthInitialized: true }),
})); 