import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Dil dosyaları
import tr from "../locales/tr/translation.json";
import en from "../locales/en/translation.json";

const resources = {
  tr: {
    translation: tr,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.locale.split("-")[0],
  fallbackLng: "tr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
