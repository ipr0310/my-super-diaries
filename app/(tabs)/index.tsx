import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "@/hooks/useTranslation";

import * as LocalAuthentication from "expo-local-authentication";

export default function Page() {
  const { i18n, locale, setLanguage } = useTranslation();
  const { themeMode, toggleThemeMode } = useAppTheme();

  const setToEnglish = () => setLanguage("en");
  const setToSpanish = () => setLanguage("es");

  const checkHardwareAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const authLevel = await LocalAuthentication.getEnrolledLevelAsync();
    const supportedTypes =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log({ compatible, isEnrolled, authLevel, supportedTypes });
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-8 justify-center items-center mb-8">
        <Text className="font-bold text-black dark:text-white">
          {i18n.t("welcome")}
        </Text>

        <Text className="font-bold text-slate-600 text-2xl capitalize">
          {i18n.t("home.currentColorScheme")}: {themeMode}
        </Text>

        <Pressable onPress={toggleThemeMode}>
          <Text className="text-black dark:text-white">
            {i18n.t("home.changeTheme")}
          </Text>
        </Pressable>

        <Text className="font-bold text-slate-600 text-2xl">
          {i18n.t("home.currentLanguage")}: {locale}
        </Text>

        <View className="flex-row gap-8 items-center justify-around">
          <Pressable onPress={setToEnglish}>
            <Text className="text-black dark:text-white text-base">
              🇺🇸 English
            </Text>
          </Pressable>

          <Pressable onPress={setToSpanish}>
            <Text className="text-black dark:text-white text-base">
              🇪🇸 Español
            </Text>
          </Pressable>
        </View>

        <Link href="/modal" asChild>
          <Pressable>
            <Text className="text-black dark:text-white text-base">
              For Nerds: Open Modal
            </Text>
          </Pressable>
        </Link>

        <Pressable onPress={checkHardwareAuth}>
          <Text className="text-black dark:text-white text-base">
            For Nerds: Console.log() Hardware available for authentication
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
