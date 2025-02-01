import Settings from "@/components/Settings";
import { SafeAreaView, View } from "react-native";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-background flex-1 p-4">
        <Settings />
      </View>
    </SafeAreaView>
  );
}
