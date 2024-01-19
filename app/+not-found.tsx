import { Text, View } from "react-native";

export default function ErrorPage() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-4 justify-center items-center mb-8">
        <Text className="text-2xl text-center">
          Opps, you are navigating on a Mysterious Screen!
        </Text>
      </View>
    </View>
  );
}
