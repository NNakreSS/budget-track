import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import Header from "@/components/Home/Header";
import BalanceOverview from "@/components/Home/BalanceOverview";
import TransactionManager from "@/components/Home/TransactionManager";
import AddButton from "@/components/Home/AddButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/glow.png")}
        style={styles.glowEffect}
      />
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
    padding: 20,
    paddingTop: 50,
  },
  glowEffect: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "200%",
    height: "50%",
  },
});
