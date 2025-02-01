import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TabSelector from "@/components/Home/TabSelector";
import ContentDisplay from "@/components/Home/ContentDisplay";

export default function TransactionManager() {
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");

  return (
    <View className="flex-1">
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentDisplay activeTab={activeTab} />
    </View>
  );
}
