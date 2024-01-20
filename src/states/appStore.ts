import { Appearance } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Themes } from "@/types";
import { getDefaultLanguage, type locales } from "@/locales";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppStore {
  themeMode: Themes;
  toggleThemeMode: () => void;
  language: locales;
  setLanguage: (value: locales) => void;
}

const defaultTheme: Themes = Appearance.getColorScheme() || "light";
const defaultLanguage = getDefaultLanguage();

export const appStore = create<AppStore>()(
  persist(
    (set, get) => ({
      themeMode: defaultTheme,
      toggleThemeMode: () =>
        set(() => ({
          themeMode: get().themeMode === "dark" ? "light" : "dark",
        })),
      language: defaultLanguage,
      setLanguage: (value: locales) =>
        set(() => ({
          language: value,
        })),
    }),
    {
      name: "app-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
