import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router/tabs";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />

      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
          name="index"
        />

        <Tabs.Screen
          options={{
            title: "Diary",
            tabBarIcon: ({ color }) => (
              <AntDesign name="book" size={24} color={color} />
            ),
          }}
          name="diaries"
        />

        <Tabs.Screen
          options={{
            title: "Secrets",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-secret" size={24} color={color} />
            ),
          }}
          name="secrets"
        />

        <Tabs.Screen
          options={{
            title: "Credits",
            tabBarIcon: ({ color }) => (
              <Entypo name="text-document" size={24} color={color} />
            ),
          }}
          name="(aux)/credits"
        />
      </Tabs>
    </>
  );
}
