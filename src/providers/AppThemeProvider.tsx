import type { ReactNode } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useAppStore } from "@/hooks/useAppStore";
import { View } from "react-native";

interface Props {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: Props) => {
  const { themeMode } = useAppStore();

  const activeTheme = themeMode === "dark" ? DarkTheme : DefaultTheme;

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={activeTheme}>{children}</ThemeProvider>
    </View>
  );
};
