import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/theme";

interface SelectBoxProps {
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectBox({
  value,
  options,
  onChange,
  placeholder,
}: SelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  const selectedOption = options.find((opt) => opt.value === value);

  const ItemSeparator = () => <View style={{ height: theme.spacing.xs }} />;

  const styles = StyleSheet.create({
    container: {
      position: "relative",
      zIndex: 1000,
    },
    selectButton: {
      borderWidth: 1,
      borderColor: theme.colors.border.primary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectButtonActive: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
    },
    selectButtonText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.text.tertiary,
    },
    dropdownContainer: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background.primary,
      borderWidth: 1,
      borderColor: theme.colors.border.primary,
      borderRadius: theme.borderRadius.md,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      maxHeight: 200,
      overflow: "hidden",
    },
    listContainer: {
      padding: theme.spacing.xs,
    },
    option: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      borderColor: theme.colors.border.primary,
      borderWidth: 1,
    },
    selectedOption: {
      borderWidth: 0,
      backgroundColor: theme.colors.button.secondary,
    },
    optionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text.secondary,
    },
    selectedOptionText: {
      color: theme.colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selectButton, isOpen && styles.selectButtonActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.selectButtonText}>
          {selectedOption?.label || placeholder || "Seçiniz"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={theme.colors.text.tertiary}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item.value === value && styles.selectedOption,
                ]}
                onPress={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    item.value === value && styles.selectedOptionText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
