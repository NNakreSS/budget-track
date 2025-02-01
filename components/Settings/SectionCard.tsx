import { View, Text } from "react-native";

export default function SectionCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View className="p-2 flex-col gap-2 mt-4">
      <Text className="text-sm font-semibold uppercase text-muted-foreground">
        {title}
      </Text>
      {children}
    </View>
  );
}
