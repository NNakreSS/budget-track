import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AddButton() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons
          name="arrow-up"
          size={24}
          style={{ transform: [{ rotate: "45deg" }] }}
        />
        <Text style={styles.addButtonText}>Gelir Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
});
