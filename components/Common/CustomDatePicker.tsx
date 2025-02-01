import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
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
      <TouchableOpacity
        activeOpacity={1}
        className="absolute inset-0 bg-black/80"
        onPress={onClose}
      />
      <View className="flex-1 justify-center items-center">
        <View className="w-[90%] max-w-[400px]">
          <View className="bg-card rounded-2xl p-4 border border-border max-h-[90%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-foreground text-lg font-medium">
                {t("common.selectDate")}
              </Text>

              <TouchableOpacity onPress={onClose}>
                <Ionicons
                  name="close"
                  size={24}
                  className="text-muted-foreground"
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="grow-0"
              showsVerticalScrollIndicator={false}
              contentContainerClassName="gap-4 pb-2"
            >
              {showMonth && (
                <View className="gap-2">
                  <Text className="text-muted-foreground text-sm">
                    {t("common.month")}
                  </Text>
                  <View className="flex-row flex-wrap justify-start gap-2">
                    {months.map((month, index) => (
                      <TouchableOpacity
                        key={month}
                        className={`p-2 px-4 rounded-lg ${
                          tempDate.getMonth() === index
                            ? "bg-foreground/5 border border-primary/80"
                            : "border border-border"
                        }`}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setMonth(index)))
                        }
                      >
                        <Text
                          className={`${
                            tempDate.getMonth() === index
                              ? "font-medium text-foreground"
                              : "text-muted-foreground text-sm"
                          }`}
                        >
                          {month}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {showYear && (
                <View className="gap-2">
                  <Text className="text-muted-foreground text-sm">
                    {t("common.year")}
                  </Text>
                  <View className="flex-row flex-wrap justify-start gap-2">
                    {years.map((year) => (
                      <TouchableOpacity
                        key={year}
                        className={`p-2 px-4 rounded-lg ${
                          tempDate.getFullYear() === year
                            ? "bg-foreground/5 border border-primary/80"
                            : "border border-border"
                        }`}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setFullYear(year)))
                        }
                      >
                        <Text
                          className={`${
                            tempDate.getFullYear() === year
                              ? "font-medium text-foreground"
                              : "text-muted-foreground text-sm"
                          }`}
                        >
                          {year}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {showDay && (
                <View className="gap-2">
                  <Text className="text-muted-foreground text-sm">
                    {t("common.day")}
                  </Text>
                  <View className="flex-row flex-wrap justify-start gap-2">
                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        className={`p-2 px-4 rounded-lg ${
                          tempDate.getDate() === day
                            ? "bg-foreground/5 border border-primary/80"
                            : "border border-border"
                        }`}
                        onPress={() =>
                          setTempDate(new Date(tempDate.setDate(day)))
                        }
                      >
                        <Text
                          className={`${
                            tempDate.getDate() === day
                              ? "font-medium text-foreground"
                              : "text-muted text-sm"
                          }`}
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
              className="bg-primary/80 rounded-lg items-center p-3 mt-6"
              onPress={handleConfirm}
            >
              <Text className="text-white text-xl font-medium">
                {t("common.confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
