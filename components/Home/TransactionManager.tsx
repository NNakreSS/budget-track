import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import TabSelector from "@/components/Home/TabSelector";
import ContentDisplay from "@/components/Home/ContentDisplay";

export default function TransactionManager() {
  const [activeTab, setActiveTab] = useState("income");

  return (
    <View style={styles.container}>
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentDisplay activeTab={activeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
