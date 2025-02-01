import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function ThemeSwitch() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="flex-row gap-2 border border-muted-foreground/20 rounded-full py-1 px-2 bg-card">
      <TouchableOpacity
        className={`p-2 px-4 rounded-full ${
          colorScheme === "dark" && "bg-accent"
        }`}
        onPress={() => colorScheme === "light" && setColorScheme("dark")}
      >
        <Ionicons name="moon" size={20} className="text-foreground" />
      </TouchableOpacity>
      <TouchableOpacity
        className={`p-2 px-4 rounded-full ${
          colorScheme === "light" && "bg-accent"
        }`}
        onPress={() => colorScheme === "dark" && setColorScheme("light")}
      >
        <Ionicons name="sunny" size={20} className="text-foreground" />
      </TouchableOpacity>
    </View>
  );
}
