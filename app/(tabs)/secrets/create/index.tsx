import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 relative flex items-start justify-start">
      <View className="w-full h-full pb-16">
        <Text className="w-full  black-white dark:text-white text-9xl">
          Create
        </Text>
      </View>
    </View>
  );
}
