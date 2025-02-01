import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SectionCard from "@/components/Settings/SectionCard";
import SelectBox from "@/components/Common/SelectBox";
import ThemeSwitch from "@/components/Common/ThemeSwitch";
import { cssInterop } from "nativewind";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, fontSize: "accessible" },
  },
});

export default function Settings() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const languageOptions = [
    { label: "Türkçe", value: "tr" },
    { label: "English", value: "en" },
  ];

  return (
    <>
      <View className="flex-row items-center p-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Ionicons name="arrow-back" className="text-foreground" size={24} />
        </TouchableOpacity>
        <Text className="text-2xl text-foreground  font-extrabold">
          {t("common.settings")}
        </Text>
      </View>

      <SectionCard title={t("settings.system")}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Ionicons name="language" size={24} className="text-foreground" />

            <Text className="text-xl text-foreground">
              {t("common.language")}
            </Text>
          </View>

          <View className="min-w-[120px]">
            <SelectBox
              value={i18n.language}
              options={languageOptions}
              onChange={(newLang) => i18n.changeLanguage(newLang)}
            />
          </View>
        </View>

        <View className="flex-row w-full items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Ionicons name="contrast" size={24} className="text-foreground" />
            <Text className="text-xl text-foreground">{t("common.theme")}</Text>
          </View>
          <ThemeSwitch />
        </View>
      </SectionCard>
    </>
  );
}
