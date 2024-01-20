import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useAppStore } from "@/hooks/useAppStore";

interface Props {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: Props) => {
  const { themeMode } = useAppStore();

  const activeTheme = themeMode === "dark" ? DarkTheme : DefaultTheme;

  const backgroundColor = activeTheme.colors.background;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar
        style={themeMode === "dark" ? "light" : "dark"}
        animated
        backgroundColor={backgroundColor}
      />

      <ThemeProvider value={activeTheme}>{children}</ThemeProvider>
    </SafeAreaView>
  );
};
