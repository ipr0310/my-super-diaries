import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@/hooks/useAppTheme";

import Ionicons from "@expo/vector-icons/Ionicons";

const DATA = [
  {
    title: "1 Item",
  },
  {
    title: "2 Item",
  },
  {
    title: "3 Item",
  },
  {
    title: "4 Item",
  },
  {
    title: "5 Item",
  },
  {
    title: "6 Item",
  },
  {
    title: "7 Item",
  },
  {
    title: "8 Item",
  },
];

export default function Page() {
  const { i18n } = useTranslation();
  const { iconColor } = useAppTheme();
  const { navigate } = useRouter();

  const createNewDiary = () => navigate("/diaries/create");

  return (
    <View className="flex-1 relative flex items-start justify-start">
      <View className="w-full h-full pb-16">
        <FlashList
          data={DATA}
          renderItem={({ item }) => (
            <Text className="w-full  black-white dark:text-white text-9xl">
              {item.title}
            </Text>
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
