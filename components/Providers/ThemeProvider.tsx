import { themes } from "@/utils/color-theme";
import { useColorScheme } from "nativewind";
import { createContext, useContext } from "react";
import { View } from "react-native";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark" | undefined;
}>({
  theme: "light",
});

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeContext.Provider value={{ theme: colorScheme }} key={colorScheme}>
      <View style={themes[colorScheme ?? "dark"]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};
