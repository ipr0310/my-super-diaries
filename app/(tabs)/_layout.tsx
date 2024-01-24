import { Tabs } from "expo-router/tabs";
import { useTranslation } from "@/hooks/useTranslation";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Layout() {
  const { i18n } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
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
        name="diaries/index"
      />

      <Tabs.Screen
        options={{
          title: i18n.t("bottomBar.secrets"),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-secret" size={24} color={color} />
          ),
        }}
        name="secrets/index"
      />

      <Tabs.Screen
        options={{
          title: i18n.t("bottomBar.credits"),
          tabBarIcon: ({ color }) => (
            <Entypo name="text-document" size={24} color={color} />
          ),
        }}
        name="credits/index"
      />

      <Tabs.Screen
        name="diaries/create/index"
        options={{
          title: "Create Diary",
          href: null,
          headerShown: true,
        }}
      />

      <Tabs.Screen
        name="secrets/create/index"
        options={{ title: "Create Secret", href: null, headerShown: true }}
      />
    </Tabs>
  );
}
