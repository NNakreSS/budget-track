import React from "react";
import { SafeAreaView, View } from "react-native";
import Header from "@/components/Home/Header";
import BalanceOverview from "@/components/Home/BalanceOverview";
import TransactionManager from "@/components/Home/TransactionManager";
import AddButton from "@/components/Home/AddButton";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-background flex-1 p-4">
        <Header />
        <BalanceOverview />
        <TransactionManager />
        <AddButton />
      </View>
    </SafeAreaView>
  );
}
