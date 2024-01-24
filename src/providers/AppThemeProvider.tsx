import type { ReactNode } from "react";
import { View } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "@/hooks/useAppTheme";

interface Props {
  children: ReactNode;
}

export const AppThemeProvider = ({ children }: Props) => {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: theme.colors.background,
      }}
    >
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </View>
  );
};
