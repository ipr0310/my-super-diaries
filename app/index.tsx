import { Pressable, Text, View } from "react-native";
import { useAppStore } from "@/hooks/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function Page() {
  const { i18n, locale, setLanguage } = useTranslation();
  const { themeMode, toggleThemeMode } = useAppStore();

  const setToEnglish = () => setLanguage("en");
  const setToSpanish = () => setLanguage("es");
  const setToJapanese = () => setLanguage("jp");

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-8 justify-center items-center mb-8">
        <Text className="font-bold dark:text-white">
          {i18n.t("welcome")} to this planet called earth!
        </Text>

        <Text className="font-bold text-slate-600 text-2xl capitalize">
          Current Color Scheme: {themeMode}
        </Text>

        <Pressable onPress={toggleThemeMode}>
          <Text className="dark:text-white">Change Theme</Text>
        </Pressable>

        <Text className="font-bold text-slate-600 text-2xl">
          Current Language: {locale}
        </Text>

        <View className="flex-row gap-8 items-center justify-around">
          <Pressable onPress={setToEnglish}>
            <Text className="dark:text-white">Set English</Text>
          </Pressable>

          <Pressable onPress={setToSpanish}>
            <Text className="dark:text-white">Set Spanish</Text>
          </Pressable>

          <Pressable onPress={setToJapanese}>
            <Text className="dark:text-white">Set Japanese</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
