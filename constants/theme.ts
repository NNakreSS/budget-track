export const colors = {
  dark: {
    background: {
      primary: 'rgb(20,21,23)',
      secondary: 'rgb(28,29,31)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.8)',
      tertiary: 'rgba(255,255,255,0.6)',
    },
    border: {
      primary: 'rgba(255,255,255,0.1)',
    },
    button: {
      primary: '#007AFF',
      secondary: 'rgba(255,255,255,0.1)',
    }
  },
  light: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0,0,0,0.8)',
      tertiary: 'rgba(0,0,0,0.6)',
    },
    border: {
      primary: 'rgba(0,0,0,0.1)',
    },
    button: {
      primary: '#007AFF',
      secondary: 'rgba(0,0,0,0.1)',
    }
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: typeof colors.light | typeof colors.dark;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
}

export const createTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: colors[mode],
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
}); 