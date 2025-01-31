import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import CustomDatePicker from "../Common/CustomDatePicker";

// Seçenekler için tip tanımı
type OptionType = {
  label: "Öngörülen" | "Güncel" | "Gizli";
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
};

export default function BalanceOverview() {
  const [currentDate, setCurrentDate] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    "Öngörülen" | "Güncel" | "Gizli"
  >("Öngörülen");
  const [showOptions, setShowOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [calculatedAmount] = useState(15000.75);
  const options: OptionType[] = [
    {
      label: "Öngörülen",
      icon: "calendar",
      description: "Ay sonuna kadar beklenen toplam",
    },
    {
      label: "Güncel",
      icon: "cash",
      description: "Şu ana kadar gerçekleşen işlemler",
    },
    {
      label: "Gizli",
      icon: "eye-off",
      description: "Miktarı gizle",
    },
  ];

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    const formattedDate = date
      .toLocaleDateString("tr-TR", options)
      .toUpperCase()
      .split(" ")
      .join(", ");
    setCurrentDate(formattedDate);
  }, []);

  const renderAmount = () => {
    if (selectedOption === "Gizli") {
      return "******";
    }
    return `₺${calculatedAmount.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={styles.balanceContainer}>
      <TouchableOpacity
        style={styles.selectorContainer}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Ionicons
          name={options.find((o) => o.label === selectedOption)?.icon || "help"}
          size={16}
          color="#888"
        />
        <Text style={styles.balanceLabel}>{selectedOption}</Text>
        <Entypo
          name={showOptions ? "chevron-thin-up" : "chevron-thin-down"}
          size={12}
          color="#888"
        />
      </TouchableOpacity>

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.optionsContainer}>
              <Text style={styles.modalTitle}>Hesaplama Türü</Text>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  style={styles.optionItem}
                  onPress={() => {
                    setSelectedOption(option.label);
                    setShowOptions(false);
                  }}
                >
                  <View style={styles.optionContent}>
                    <Ionicons name={option.icon} size={18} color="#888" />
                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>{option.label}</Text>
                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.balanceRow}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="rgb(179, 179, 179)" />
        </TouchableOpacity>
        <Text
          style={[
            styles.balanceAmount,
            selectedOption === "Gizli" && styles.hiddenAmount,
          ]}
        >
          {renderAmount()}
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="rgb(179, 179, 179)"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{currentDate}</Text>
      </TouchableOpacity>

      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(selectedDate) => {
          const formattedDate = selectedDate
            .toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
            })
            .toUpperCase()
            .split(" ")
            .join(", ");
          setCurrentDate(formattedDate);
        }}
        selectedDate={new Date()}
        showDay={false}
        showMonth={true}
        showYear={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  balanceLabel: {
    color: "#888",
  },
  selectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxWidth: 400,
  },
  optionsContainer: {
    backgroundColor: "rgba(20, 21, 23, 0.95)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(179, 179, 179, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 200,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  optionDescription: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "semibold",
    marginHorizontal: 20,
  },
  dateButton: {
    color: "#888",
    backgroundColor: "rgb(33, 33, 33)",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 27,
    fontSize: 12,
    marginTop: 10,
  },
  dateText: {
    color: "#888",
    fontSize: 12,
  },
  hiddenAmount: {
    color: "#888",
    letterSpacing: 2,
  },
  modalTitle: {
    color: "#666",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  selectedItem: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  selectedItemText: {
    color: "white",
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
