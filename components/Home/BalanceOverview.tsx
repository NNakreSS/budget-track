import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BalanceOverview() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    const formattedDate = date
      .toLocaleDateString("tr-TR", options)
      .toUpperCase()
      .split(" ")
      .join(", ");
    setCurrentDate(formattedDate);
  }, []);

  return (
    <View style={styles.balanceContainer}>
      <Text style={styles.balanceLabel}>Genel Bakış</Text>
      <View style={styles.balanceRow}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="rgb(179, 179, 179)" />
        </TouchableOpacity>
        <Text style={styles.balanceAmount}>₺0</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color="rgb(179, 179, 179)" />
        </TouchableOpacity>
      </View>
      <Text style={styles.dateText}>{currentDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  balanceLabel: {
    color: "#888",
    fontSize: 16,
    marginBottom: 10,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "semibold",
    marginHorizontal: 20,
  },
  dateText: {
    color: "#888",
    backgroundColor: "rgb(33, 33, 33)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 27,
    fontSize: 14,
    marginTop: 10,
  },
});
