import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function Page() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-4 justify-center items-center mb-8">
        <Text className="font-bold">Welcome to this planet!</Text>
        <Text className="font-bold text-slate-600 text-2xl capitalize">
          Current Color Scheme: {colorScheme}
        </Text>

        <Text className="font-bold text-slate-600 text-2xl capitalize">
          Current Language: English
        </Text>
      </View>
    </View>
  );
}
