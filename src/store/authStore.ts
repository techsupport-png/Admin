import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  token: string | null;
  lastActivity: number | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  updateActivity: () => void;
  checkSession: () => void;
}

// Session timeout (milliseconds). Exported so UI helpers can schedule timers accurately.
export const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// Helper to load user from localStorage
const loadStoredUser = (): User | null => {
  try {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Helper to load last activity timestamp
const loadLastActivity = (): number | null => {
  const stored = localStorage.getItem('lastActivity');
  return stored ? parseInt(stored, 10) : null;
};

const useAuthStore = create<AuthStore>((set, get) => ({
  user: loadStoredUser(),
  token: localStorage.getItem('token'),
  lastActivity: loadLastActivity(),
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      get().updateActivity();
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  updateActivity: () => {
    const now = Date.now();
    localStorage.setItem('lastActivity', now.toString());
    set({ lastActivity: now });
  },
  checkSession: () => {
    const { user, lastActivity, logout } = get();
    if (user && lastActivity) {
      const now = Date.now();
      const elapsed = now - lastActivity;
      if (elapsed >= SESSION_TIMEOUT) {
        console.log('⏱️ Session expired - logging out');
        logout();
      }
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastActivity');
    set({ user: null, token: null, lastActivity: null });
  },
}));

export default useAuthStore;