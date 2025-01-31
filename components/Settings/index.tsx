import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SectionCard from "@/components/Settings/SectionCard";
import SelectBox from "@/components/Common/SelectBox";

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

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
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{t("common.settings")}</Text>
      </View>

      <SectionCard title={t("settings.system")}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={24} color="white" />
            <Text style={styles.settingText}>{t("common.language")}</Text>
          </View>
          <View style={styles.selectBoxContainer}>
            <SelectBox
              value={i18n.language}
              options={languageOptions}
              onChange={(newLang) => i18n.changeLanguage(newLang)}
            />
          </View>
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
    color: "white",
  },
  content: {
    padding: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    fontSize: 22,
    color: "white",
  },
  selectBoxContainer: {
    minWidth: 120,
  },
});
