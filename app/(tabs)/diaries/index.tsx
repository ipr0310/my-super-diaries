import { Alert, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { formatDistance } from "date-fns";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useDiaries } from "@/hooks/useDiaries";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { eq } from "drizzle-orm";
import { diaries } from "@/types/database";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { i18n, dateLocale } = useTranslation();
  const { iconColor } = useAppTheme();
  const { navigate } = useRouter();
  const { data, mutate } = useDiaries();
  const db = useDatabaseContext();

  const createNewDiary = () => navigate("/diaries/create");

  const deleteDiary = async (id: string) => {
    try {
      await db.delete(diaries).where(eq(diaries.id, id));
      await mutate();
      Alert.alert("Success", i18n.t("diaries.deleteSuccess"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 relative flex items-start justify-start">
      {data.length ? (
        <View className="w-full h-full pb-16 gap-8">
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View className="flex items-start justify-start p-4 border-b-2 bottom-1 border-slate-300 dark:border-gray-50">
                <Text className="w-full text-lg text-black dark:text-white">
                  {item.title}
                </Text>

                <Text className="w-full text-base text-black dark:text-white opacity-80">
                  {item.description}
                </Text>

                <Text className="w-full text-sm text-black dark:text-white opacity-60 mb-2">
                  {formatDistance(new Date(item.timestamp), new Date(), {
                    addSuffix: true,
                    locale: dateLocale,
                  })}
                </Text>

                <Button
                  label={i18n.t("delete")}
                  color="error"
                  onPress={() => deleteDiary(item.id)}
                />
              </View>
            )}
            estimatedItemSize={200}
          />
        </View>
      ) : (
        <View className="w-full h-full justify-center items-center gap-4">
          <Text className="text-9xl py-4">📒</Text>
          <Text className="text-2xl font-medium text-center text-black dark:text-white">
            {i18n.t("diaries.noDiaries")}
          </Text>
          <Text className="text-center text-black dark:text-white">
            {i18n.t("startCreating")}
          </Text>
        </View>
      )}

      <View className="flex justify-center items-center absolute inset-x-0 bottom-0 h-16">
        <View className="w-full max-w-sm">
          <Button
            label={i18n.t("diaries.createDiary")}
            color="primary"
            onPress={createNewDiary}
            Icon={<Ionicons name="create" size={24} color={iconColor} />}
          />
        </View>
      </View>
    </View>
  );
}
