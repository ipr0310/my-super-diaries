import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useDiaries } from "@/hooks/useDiaries";
import { formatDistance } from "date-fns";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { i18n, dateLocale } = useTranslation();
  const { iconColor } = useAppTheme();
  const { navigate } = useRouter();
  const diaries = useDiaries();

  const createNewDiary = () => navigate("/diaries/create");

  return (
    <View className="flex-1 relative flex items-start justify-start">
      <View className="w-full h-full pb-16 gap-8">
        <FlashList
          data={diaries}
          renderItem={({ item }) => (
            <View className="flex items-center p-4 border-b-2 bottom-1 border-slate-300 dark:border-gray-50">
              <Text className="w-full text-lg text-black dark:text-white">
                {/* @ts-ignore */}
                {item.title}
              </Text>

              <Text className="w-full  text-lg text-black dark:text-white">
                {/* @ts-ignore */}
                {item.description}
              </Text>

              <Text className="w-full  text-black dark:text-white opacity-60">
                {/* @ts-ignore */}
                {formatDistance(new Date(item.timestamp), new Date(), {
                  addSuffix: true,
                  locale: dateLocale,
                })}
              </Text>
            </View>
          )}
          estimatedItemSize={200}
        />
      </View>

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
