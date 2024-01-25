import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppTheme } from "@/hooks/useAppTheme";

import Ionicons from "@expo/vector-icons/Ionicons";

const blurhash = "L57nRR%M004nWBM{t7%M00ay~qt7";

export default function Page() {
  const { iconColor } = useAppTheme();
  const { i18n } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Image
        style={{
          backgroundColor: "#0553",
          width: 200,
          height: 200,
          borderRadius: 16,
        }}
        source={require("../../../images/thumbnail.png")}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />

      <Text className="text-2xl font-medium text-center text-black dark:text-white">
        Made With ❤️ By IPR0310
      </Text>

      <View className="flex justify-center items-center absolute inset-x-0 bottom-0 h-16">
        <View className="w-full max-w-sm">
          <Link asChild href="https://github.com/ipr0310/my-super-diaries">
            <Button
              label={i18n.t("credits.sourceCode")}
              color="error"
              Icon={<Ionicons name="git-branch" size={24} color={iconColor} />}
            />
          </Link>
        </View>
      </View>
    </View>
  );
}
