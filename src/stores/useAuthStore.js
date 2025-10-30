import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      // 狀態
      user: null,
      
      // 登入
      login: (userData) => set({ user: userData }),
      
      // 登出
       logout: () => {
        set({ user: null });
        localStorage.removeItem('auth-storage');
        },
      
      // 檢查是否已登入
      isAuthenticated: () => {
        const state = useAuthStore.getState();
        return state.user !== null;
      },
    }),
    {
      name: 'auth-storage', // localStorage 的 key
    }
  )
);