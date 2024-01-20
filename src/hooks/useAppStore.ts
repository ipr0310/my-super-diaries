import { useEffect } from "react";
import { appStore } from "@/states/appStore";
import { useColorScheme } from "nativewind";

export const useAppStore = () => {
  const { setColorScheme } = useColorScheme();
  const themeMode = appStore((state) => state.themeMode);
  const toggleThemeMode = appStore((state) => state.toggleThemeMode);

  useEffect(() => {
    setColorScheme(themeMode);
  }, [themeMode, setColorScheme]);

  return { themeMode, toggleThemeMode };
};
