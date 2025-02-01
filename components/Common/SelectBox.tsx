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

  const ItemSeparator = () => <View className="h-2" />;

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between border border-border p-2 rounded-md"
      >
        <Text className="text-foreground">
          {selectedOption?.label || placeholder || "Seçiniz"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          className="text-foreground"
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-[110%] left-0 right-0 bg-card border border-border rounded-md z-[1000]">
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerClassName="p-1"
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-2 rounded-md ${
                  item.value === value ? "bg-muted" : "border-border"
                }`}
                onPress={() => {
                  onChange(item.value);
                  setIsOpen(false);
                }}
              >
                <Text className="text-foreground">{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
