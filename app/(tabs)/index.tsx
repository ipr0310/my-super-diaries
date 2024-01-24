import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { Link } from "expo-router";

export default function Page() {
  const { i18n, locale, setLanguage } = useTranslation();
  const { themeMode, toggleThemeMode } = useAppTheme();
  const db = useDatabaseContext();

  const setToEnglish = () => setLanguage("en");
  const setToSpanish = () => setLanguage("es");
  const setToJapanese = () => setLanguage("jp");

  const getDiaries = () => {
    db.transaction(async (tx) => {
      tx.executeSql(
        "SELECT * FROM diaries LIMIT 250;",
        [],
        (result, resultSet) => console.log({ resultSet: resultSet.rows._array })
      );
    });
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

          <Pressable onPress={setToJapanese}>
            <Text className="text-black dark:text-white text-base">
              🇯🇵 日本語
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

        <Pressable>
          <Text onPress={getDiaries}>Get Diaries</Text>
        </Pressable>
      </View>
    </View>
  );
}
