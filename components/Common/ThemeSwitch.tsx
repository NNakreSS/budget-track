import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/theme';

export default function ThemeSwitch() {
  const { mode, theme, toggleTheme } = useThemeStore();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.background.secondary }
    ]}>
      <TouchableOpacity
        style={[
          styles.option,
          mode === 'dark' && styles.selectedOption,
          { backgroundColor: mode === 'dark' ? theme.colors.button.secondary : 'transparent' }
        ]}
        onPress={() => mode === 'light' && toggleTheme()}
      >
        <Ionicons 
          name="moon" 
          size={20} 
          color={mode === 'dark' ? theme.colors.text.primary : theme.colors.text.tertiary} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.option,
          mode === 'light' && styles.selectedOption,
          { backgroundColor: mode === 'light' ? theme.colors.button.secondary : 'transparent' }
        ]}
        onPress={() => mode === 'dark' && toggleTheme()}
      >
        <Ionicons 
          name="sunny" 
          size={20} 
          color={mode === 'light' ? theme.colors.text.primary : theme.colors.text.tertiary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
    gap: 4,
  },
  option: {
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  selectedOption: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 