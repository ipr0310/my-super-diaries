import { Text, View } from "react-native";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-300 gap-4">
      <Image
        className="w-full h-36"
        style={{ backgroundColor: "#0553" }}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />

      <Text className="text-2xl font-medium text-center">
        Made With ❤️ By IPR0310
      </Text>
    </View>
  );
}
