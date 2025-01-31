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
} as const;

// Varsayılan dili belirle
const getDefaultLanguage = () => {
  const deviceLang = Localization.locale.split("-")[0];
  return deviceLang in resources ? deviceLang : "tr";
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getDefaultLanguage(),
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
