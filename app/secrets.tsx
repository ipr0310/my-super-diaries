import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex gap-4 justify-center items-center mb-8">
        <Text>This is the Secrets Screen</Text>
        <Text>We will use expo secure store</Text>
      </View>
    </View>
  );
}