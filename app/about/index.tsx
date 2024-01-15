import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-8">About Page</Text>

      <Link href="/" asChild>
        <Pressable>
          <Text className="border border-red-500 p-8">Visit Home page</Text>
        </Pressable>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}
