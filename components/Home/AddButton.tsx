import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function AddButton() {
  const { t } = useTranslation();

  return (
    <View className="mt-5">
      <TouchableOpacity className="bg-foreground flex-row items-center justify-center py-4 rounded-2xl">
        <Ionicons
          name="arrow-up"
          size={24}
          style={{ transform: [{ rotate: "45deg" }] }}
          className="text-background"
        />
        <Text className="text-background ml-2 font-semibold text-xl">
          {t("common.add")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
