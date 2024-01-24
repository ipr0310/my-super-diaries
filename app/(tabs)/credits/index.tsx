import { Text, View } from "react-native";
import { Image } from "expo-image";

const blurhash = "L57nRR%M004nWBM{t7%M00ay~qt7";

export default function Page() {
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
        transition={1000}
      />

      <Text className="text-2xl font-medium text-center text-black dark:text-white">
        Made With ❤️ By IPR0310
      </Text>
    </View>
  );
}
