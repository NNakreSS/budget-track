import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SectionCard from "@/components/Settings/SectionCard";
import SelectBox from "@/components/Common/SelectBox";
import ThemeSwitch from "@/components/Common/ThemeSwitch";
import { useThemeStore } from "@/store/theme";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { theme } = useThemeStore();

  const languageOptions = [
    { label: "Türkçe", value: "tr" },
    { label: "English", value: "en" },
  ];

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          {t("common.settings")}
        </Text>
      </View>

      <SectionCard title={t("settings.system")}>
        <View style={[styles.settingItem, { borderBottomColor: theme.colors.border.primary }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={24} color={theme.colors.text.primary} />
            <Text style={[styles.settingText, { color: theme.colors.text.primary }]}>
              {t("common.language")}
            </Text>
          </View>
          <View style={styles.selectBoxContainer}>
            <SelectBox
              value={i18n.language}
              options={languageOptions}
              onChange={(newLang) => i18n.changeLanguage(newLang)}
            />
          </View>
        </View>

        <View style={[styles.settingItem, { borderBottomColor: theme.colors.border.primary }]}>
          <View style={styles.settingLeft}>
            <Ionicons name="contrast" size={24} color={theme.colors.text.primary} />
            <Text style={[styles.settingText, { color: theme.colors.text.primary }]}>
              {t("common.theme")}
            </Text>
          </View>
          <ThemeSwitch />
        </View>
      </SectionCard>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 22,
  },
  selectBoxContainer: {
    minWidth: 120,
  },
});
