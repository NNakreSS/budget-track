import { StyleSheet, View, Text } from "react-native";

export default function SectionCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.3)",
    textTransform: "uppercase",
  },
});
