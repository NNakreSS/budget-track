import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

interface TabSelectorProps {
  activeTab: "income" | "expense";
  setActiveTab: (tab: "income" | "expense") => void;
}

export default function TabSelector({
  activeTab,
  setActiveTab,
}: TabSelectorProps) {
  const { t } = useTranslation();

  return (
    <View className="flex-row bg-accent border border-border p-2 rounded-xl mb-4">
      <TouchableOpacity
        className={`flex-1 items-center justify-center rounded-lg py-2 ${
          activeTab === "income" && "bg-primary"
        }`}
        onPress={() => setActiveTab("income")}
      >
        <Text
          className={`text-lg font-semibold ${
            activeTab === "income" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {t("tabs.income")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 items-center justify-center rounded-lg py-2 ${
          activeTab === "expense" && "bg-destructive"
        }`}
        onPress={() => setActiveTab("expense")}
      >
        <Text
          className={`text-lg font-semibold ${
            activeTab === "expense"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("tabs.expense")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
