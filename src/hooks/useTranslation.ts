import { useMemo } from "react";
import { appStore } from "@/states/appStore";
import { getI18n } from "@/locales";
import { enUS, es, ja } from "date-fns/locale";

const localeData = getI18n();

export const useTranslation = () => {
  const language = appStore((state) => state.language);
  const setLanguage = appStore((state) => state.setLanguage);

  const i18n = useMemo(() => {
    localeData.locale = language;
    localeData.enableFallback = true;

    return localeData;
  }, [language]);

  const dateLocale = useMemo(() => {
    switch (language) {
      case "jp":
        return ja;

      case "es":
        return es;

      default:
        return enUS;
    }
  }, [language]);

  const locale = i18n.locale;

  return { i18n, locale, dateLocale, setLanguage };
};
