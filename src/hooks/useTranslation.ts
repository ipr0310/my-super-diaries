import { useMemo } from "react";
import { appStore } from "@/states/appStore";
import { getI18n } from "@/locales";

const localeData = getI18n();

export const useTranslation = () => {
  const language = appStore((state) => state.language);
  const setLanguage = appStore((state) => state.setLanguage);

  const i18n = useMemo(() => {
    localeData.locale = language;
    localeData.enableFallback = true;

    return localeData;
  }, [language]);

  const locale = i18n.locale;

  return { i18n, locale, setLanguage };
};
