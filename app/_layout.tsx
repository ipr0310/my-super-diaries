import "../global.css";
import { Tabs } from "expo-router/tabs";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { AppThemeProvider } from "@/providers/AppThemeProvider";
import { useTranslation } from "@/hooks/useTranslation";

export default function Layout() {
  const { i18n } = useTranslation();

  return (
    <AppThemeProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          options={{
            title: i18n.t("bottomBar.home"),
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
          name="index"
        />

        <Tabs.Screen
          options={{
            title: i18n.t("bottomBar.diary"),
            tabBarIcon: ({ color }) => (
              <AntDesign name="book" size={24} color={color} />
            ),
          }}
          name="diaries"
        />

        <Tabs.Screen
          options={{
            title: i18n.t("bottomBar.secrets"),
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-secret" size={24} color={color} />
            ),
          }}
          name="secrets"
        />

        <Tabs.Screen
          options={{
            title: i18n.t("bottomBar.credits"),
            tabBarIcon: ({ color }) => (
              <Entypo name="text-document" size={24} color={color} />
            ),
          }}
          name="(aux)/credits"
        />

        <Tabs.Screen name="+not-found" options={{ href: null }} />
      </Tabs>
    </AppThemeProvider>
  );
}
