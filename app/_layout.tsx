import { Slot } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="bg-red-500 flex-1 p-8">
      <Slot />
    </View>
  );
}
