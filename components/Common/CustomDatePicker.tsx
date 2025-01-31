import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface CustomDatePickerProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedDate: Date;
  showDay?: boolean;
  showYear?: boolean;
  showMonth?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function CustomDatePicker({
  isVisible,
  onClose,
  onSelect,
  selectedDate,
  showDay = false,
  showYear = true,
  showMonth = true,
  minDate = new Date(new Date().getFullYear() - 5, 0, 1),
  maxDate = new Date(),
}: CustomDatePickerProps) {
  const [tempDate, setTempDate] = React.useState(selectedDate);

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const { t } = useTranslation();

  const years = Array.from(
    { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
    (_, i) => minDate.getFullYear() + i
  );

  const days = Array.from(
    {
      length: new Date(
        tempDate.getFullYear(),
        tempDate.getMonth() + 1,
        0
      ).getDate(),
    },
    (_, i) => i + 1
  );

  const handleConfirm = () => {
    onSelect(tempDate);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{t("common.selectDate")}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#888" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.pickerContent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {showMonth && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t("common.month")}</Text>
                  <View style={styles.optionsGrid}>
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={month}
                        style={[
                          styles.option,
                          tempDate.getMonth() === index &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setMonth(index)))
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            tempDate.getMonth() === index &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {showYear && (
                <View style={[styles.section, styles.yearSection]}>
                  <Text style={styles.sectionTitle}>{t("common.year")}</Text>
                  <View style={styles.optionsGrid}>
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        style={[
                          styles.option,
                          tempDate.getFullYear() === year &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setFullYear(year)))
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            tempDate.getFullYear() === year &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {showDay && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t("common.day")}</Text>
                  <View style={styles.daysGrid}>
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        style={[
                          styles.dayOption,
                          tempDate.getDate() === day && styles.selectedOption,
                        ]}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setDate(day)))
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            tempDate.getDate() === day &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>
                {t("common.confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: 400,
  },
  pickerContainer: {
    backgroundColor: "rgb(20, 21, 23)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(179, 179, 179, 0.3)",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  pickerContent: {
    flexGrow: 0,
  },
  scrollContent: {
    gap: 24,
    paddingBottom: 8,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: "#888",
    fontSize: 14,
  },
  yearSection: {
    marginTop: 24,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8,
  },
  option: {
    minWidth: 70,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(179, 179, 179, 0.3)",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "#4CAF50",
  },
  optionText: {
    color: "#888",
    fontSize: 14,
  },
  selectedOptionText: {
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
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8,
  },
  dayOption: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(179, 179, 179, 0.3)",
  },
});
