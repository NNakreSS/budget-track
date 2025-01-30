import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabSelectorProps {
  activeTab: "income" | "expense";
  setActiveTab: (tab: "income" | "expense") => void;
}

export default function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "income" && styles.activeTab]}
        onPress={() => setActiveTab("income")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "income" && styles.activeTabText,
          ]}
        >
          Gelir
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "expense" && styles.activeTabExpense,
        ]}
        onPress={() => setActiveTab("expense")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "expense" && styles.activeTabText,
          ]}
        >
          Gider
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgb(20,21,23)",
    borderRadius: 12,
    marginBottom: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgb(80, 80, 80)",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "rgba(226, 254, 83, 1)",
    borderRadius: 6,
  },
  tabText: {
    color: "rgba(240, 240, 243, 0.7)",
    fontSize: 16,
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  activeTabExpense: {
    backgroundColor: "rgba(255, 123, 94, 1)",
    borderRadius: 6,
  },
});
