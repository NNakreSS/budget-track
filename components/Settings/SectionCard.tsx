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
    fontSize: 20,
    fontWeight: "400",
    color: "white",
  },
});
