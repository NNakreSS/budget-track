import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.header}>
      <Ionicons name="beer-outline" size={24} color="white" />
      <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>Bireysel</Text>
        <Ionicons name="chevron-down" size={22} color="white" />
      </View>
      <Ionicons name="settings-outline" size={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "rgb(44, 44, 44)",
    borderRadius: 29,
    padding: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownText: {
    color: "rgba(240, 240, 243, 0.86)",
    fontSize: 16,
    marginRight: 5,
  },
});
