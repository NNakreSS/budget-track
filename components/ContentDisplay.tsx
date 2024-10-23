import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ContentDisplayProps {
  activeTab: string;
}

export default function ContentDisplay({ activeTab }: ContentDisplayProps) {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentText}>
        {activeTab === "income"
          ? "Gelir içeriği burada gösterilecek"
          : "Gider içeriği burada gösterilecek"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    color: "white",
    fontSize: 16,
  },
});
