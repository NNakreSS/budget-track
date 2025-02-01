import React, { useState, useMemo, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "../Common/CustomDatePicker";
import { useBalanceStore } from "../../store/useBalanceStore";
import { useFormatCurrency } from "../../utils/currency";
import { ViewType } from "../../types/store";
import { Animated } from "react-native";

type OptionType = {
  label: ViewType | "hidden";
  icon: keyof typeof Ionicons.glyphMap;
  translationKey: string;
  descriptionKey: string;
};

export default function BalanceOverview() {
  const { t } = useTranslation();
  const formatCurrency = useFormatCurrency();
  const [showOptions, setShowOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const selectedDate = useBalanceStore((state) => state.selectedDate);
  const viewType = useBalanceStore((state) => state.viewType);
  const isHidden = useBalanceStore((state) => state.isHidden);
  const calculatedAmount = useBalanceStore((state) => state.calculatedAmount);
  const setSelectedDate = useBalanceStore((state) => state.setSelectedDate);
  const setViewType = useBalanceStore((state) => state.setViewType);
  const toggleHidden = useBalanceStore((state) => state.toggleHidden);

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

  const getMonthKey = (month: number): string => {
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
    return months[month];
  };

  const formatDate = (date: Date) => {
    const month = t(`months.${getMonthKey(date.getMonth())}`);
    const year = date.getFullYear();
    return `${month}, ${year}`;
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

  const getActiveOption = () => {
    if (isHidden) return "hidden";
    return viewType;
  };

  const handleOptionSelect = (option: OptionType) => {
    if (option.label === "hidden") {
      toggleHidden();
    } else {
      setViewType(option.label);
      if (isHidden) {
        toggleHidden();
      }
    }
    setShowOptions(false);
  };

  // Animated values for balance text and date button
  const balanceOpacity = useRef(new Animated.Value(1)).current;
  const balanceScale = useRef(new Animated.Value(1)).current;
  const dateButtonOpacity = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (isTransitioning) {
      Animated.parallel([
        Animated.timing(balanceOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(balanceScale, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dateButtonOpacity, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(balanceOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(balanceScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dateButtonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isTransitioning, balanceOpacity, balanceScale, dateButtonOpacity]);

  return (
    <View className="mb-6 items-center">
      <TouchableOpacity
        className="flex-row items-center gap-2 active:opacity-70 mb-2"
        onPress={() => setShowOptions(!showOptions)}
      >
        <Ionicons
          name={
            options.find((o) => o.label === getActiveOption())?.icon || "help"
          }
          size={16}
          className="text-muted-foreground"
        />
        <Text className="text-muted-foreground text-sm">
          {t(
            options.find((o) => o.label === getActiveOption())
              ?.translationKey || ""
          )}
        </Text>
        <Entypo
          name={showOptions ? "chevron-thin-up" : "chevron-thin-down"}
          size={12}
          className="text-muted-foreground"
        />
      </TouchableOpacity>

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="absolute inset-0 bg-black/80"
          onPress={() => setShowOptions(false)}
        />
        <View className="flex-1 items-center justify-center">
          <View className="w-[80%] max-w-[400px] rounded-lg">
            <View className="bg-card rounded-xl p-4 border border-border shadow-lg shadow-black">
              <Text className="text-muted-foreground text-sm mb-4 text-center">
                {t("balance.calculationType")}
              </Text>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  className={`p-3 px-4 rounded-xl border ${
                    option.label === getActiveOption()
                      ? "bg-foreground/10 border-foreground/30"
                      : "border-transparent"
                  } mb-2 last:mb-0`}
                  onPress={() => handleOptionSelect(option)}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center gap-3">
                    <Ionicons
                      name={option.icon}
                      size={18}
                      className="text-muted-foreground"
                    />
                    <View className="flex-1">
                      <Text className="text-foreground text-sm font-medium">
                        {t(option.translationKey)}
                      </Text>
                      <Text className="text-muted-foreground text-xs mt-1">
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

      <View className="flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => navigateMonth("back")}
          className="p-2"
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            className="text-muted-foreground"
          />
        </TouchableOpacity>
        <Animated.Text
          style={{
            opacity: balanceOpacity,
            transform: [{ scale: balanceScale }],
          }}
          className={`text-foreground text-4xl font-light mx-5 ${
            isHidden ? "text-muted-foreground tracking-wider" : ""
          }`}
        >
          {formatCurrency(calculatedAmount)}
        </Animated.Text>
        <TouchableOpacity
          onPress={() => navigateMonth("forward")}
          className="p-2"
          activeOpacity={0.7}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            className="text-muted-foreground"
          />
        </TouchableOpacity>
      </View>

      <Animated.View style={{ opacity: dateButtonOpacity }}>
        <TouchableOpacity
          className="bg-muted border border-foreground/20 px-4 py-1 rounded-full mt-2"
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text className="text-muted-foreground text-sm">
            {formatDate(selectedDate)}
          </Text>
        </TouchableOpacity>
      </Animated.View>

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
