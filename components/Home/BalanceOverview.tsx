import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "../Common/CustomDatePicker";
import { useBalanceStore } from "../../store/useBalanceStore";

type OptionType = {
  label: "predicted" | "current" | "hidden";
  icon: keyof typeof Ionicons.glyphMap;
  translationKey: string;
  descriptionKey: string;
};

export default function BalanceOverview() {
  const { t } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedDate = useBalanceStore((state) => state.selectedDate);
  const selectedViewType = useBalanceStore((state) => state.selectedViewType);
  const calculatedAmount = useBalanceStore((state) => state.calculatedAmount);
  const setSelectedDate = useBalanceStore((state) => state.setSelectedDate);
  const setSelectedViewType = useBalanceStore(
    (state) => state.setSelectedViewType
  );

  const options: OptionType[] = [
    {
      label: "predicted",
      icon: "calendar",
      translationKey: "balance.predicted",
      descriptionKey: "balance.predictedDesc",
    },
    {
      label: "current",
      icon: "cash",
      translationKey: "balance.current",
      descriptionKey: "balance.currentDesc",
    },
    {
      label: "hidden",
      icon: "eye-off",
      translationKey: "balance.hidden",
      descriptionKey: "balance.hiddenDesc",
    },
  ];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date
      .toLocaleDateString("tr-TR", options)
      .toUpperCase()
      .split(" ")
      .join(", ");
  };

  const navigateMonth = (direction: "forward" | "back") => {
    const newDate = new Date(selectedDate);
    const currentMonth = newDate.getMonth();

    if (direction === "forward") {
      if (currentMonth === 11) {
        newDate.setMonth(0);
      } else {
        newDate.setMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        newDate.setMonth(11);
      } else {
        newDate.setMonth(currentMonth - 1);
      }
    }

    setIsTransitioning(true);
    setSelectedDate(newDate);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const renderAmount = () => {
    if (selectedViewType === "hidden") {
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
          name={
            options.find((o) => o.label === selectedViewType)?.icon || "help"
          }
          size={16}
          color="#888"
        />
        <Text style={styles.balanceLabel}>
          {t(
            options.find((o) => o.label === selectedViewType)?.translationKey ||
              ""
          )}
        </Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.optionsContainer}>
              <Text style={styles.modalTitle}>
                {t("balance.calculationType")}
              </Text>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  style={[
                    styles.optionItem,
                    selectedViewType === option.label && styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedViewType(option.label);
                    setShowOptions(false);
                  }}
                >
                  <View style={styles.optionContent}>
                    <Ionicons name={option.icon} size={18} color="#888" />
                    <View style={styles.optionTextContainer}>
                      <Text style={styles.optionTitle}>
                        {t(option.translationKey)}
                      </Text>
                      <Text style={styles.optionDescription}>
                        {t(option.descriptionKey)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.balanceRow}>
        <TouchableOpacity
          onPress={() => navigateMonth("back")}
          style={styles.navigationButton}
        >
          <Ionicons name="chevron-back" size={24} color="rgb(179, 179, 179)" />
          {selectedDate.getMonth() === 0 && (
            <Text style={styles.monthIndicator}>
              {
                formatDate(new Date(selectedDate.getFullYear(), 11, 1)).split(
                  ","
                )[0]
              }
            </Text>
          )}
        </TouchableOpacity>
        <Text
          style={[
            styles.balanceAmount,
            selectedViewType === "hidden" && styles.hiddenAmount,
            isTransitioning && styles.transitioningAmount,
          ]}
        >
          {renderAmount()}
        </Text>
        <TouchableOpacity
          onPress={() => navigateMonth("forward")}
          style={styles.navigationButton}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color="rgb(179, 179, 179)"
          />
          {selectedDate.getMonth() === 11 && (
            <Text style={styles.monthIndicator}>
              {
                formatDate(new Date(selectedDate.getFullYear(), 0, 1)).split(
                  ","
                )[0]
              }
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.dateButton, isTransitioning && styles.transitioningDate]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>

      <CustomDatePicker
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
        selectedDate={selectedDate}
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
    fontSize: 42,
    fontWeight: "400",
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(179, 179, 179, 0.3)",
    width: "100%",
  },
  navigationButton: {
    padding: 8,
    position: "relative",
  },
  monthIndicator: {
    position: "absolute",
    bottom: -15,
    color: "rgba(179, 179, 179, 0.6)",
    fontSize: 10,
    width: 60,
    textAlign: "center",
    left: -14,
  },
  transitioningAmount: {
    opacity: 0.5,
    transform: [{ scale: 0.98 }],
  },
  transitioningDate: {
    opacity: 0.7,
  },
});
