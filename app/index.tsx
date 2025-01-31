import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "@/components/Home/Header";
import BalanceOverview from "@/components/Home/BalanceOverview";
import TransactionManager from "@/components/Home/TransactionManager";
import AddButton from "@/components/Home/AddButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <BalanceOverview />
      <TransactionManager />
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 10,
  },
});
