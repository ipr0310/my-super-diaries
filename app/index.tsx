import { Pressable, Text, View } from "react-native";
import { useAppStore } from "@/hooks/useAppStore";

export default function Page() {
  const { themeMode, toggleThemeMode } = useAppStore();

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-8 justify-center items-center mb-8">
        <Text className="font-bold dark:text-white">
          Welcome to this planet called earth!
        </Text>

        <Text className="font-bold text-slate-600 text-2xl capitalize">
          Current Color Scheme: {themeMode}
        </Text>

        <Pressable onPress={toggleThemeMode}>
          <Text className="dark:text-white">Change Theme</Text>
        </Pressable>

        <Text className="font-bold text-slate-600 text-2xl capitalize">
          Current Language: English
        </Text>
      </View>
    </View>
  );
}
