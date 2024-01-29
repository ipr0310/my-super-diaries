import "../global.css";
import { AppThemeProvider } from "@/providers/AppThemeProvider";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <AppThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </AppThemeProvider>
    </DatabaseProvider>
  );
}
