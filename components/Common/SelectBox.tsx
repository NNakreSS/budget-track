import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const selectedOption = options.find((opt) => opt.value === value);

  const ItemSeparator = () => <View style={{ height: 5 }} />;

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
          color="rgba(255,255,255,0.6)"
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

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 10,
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
    fontSize: 18,
    color: "rgba(255,255,255,0.6)",
  },
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "rgb(20,21,23)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    maxHeight: 200,
    overflow: "hidden",
  },
  listContainer: {
    padding: 4,
  },
  option: {
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
  },
  selectedOption: {
    borderWidth: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  optionText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  selectedOptionText: {
    color: "white",
  },
});
