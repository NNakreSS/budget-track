import { create } from 'zustand';
import { Theme, ThemeMode, createTheme } from '@/constants/theme';

interface ThemeStore {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'dark',
  theme: createTheme('dark'),
  toggleTheme: () => 
    set((state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      return {
        mode: newMode,
        theme: createTheme(newMode),
      };
    }),
})); 