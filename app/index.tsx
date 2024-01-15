import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Link } from "expo-router";

export default function Page() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  // const changeColor = () =>
  //   setColorScheme(colorScheme === "light" ? "dark" : "light");

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-300">
      <View className="flex gap-4 justify-center items-center mb-8">
        <Text>Welcome to this planet!</Text>
        <Text>Current Color Scheme: {colorScheme}</Text>
      </View>

      <View className="flex gap-8">
        <Pressable onPress={toggleColorScheme}>
          <Text className="bg-blue-500 p-4 font-bold">Change Scheme</Text>
        </Pressable>

        <Link href="/about" asChild>
          <Pressable>
            <Text className="bg-red-500 p-4 font-bold">Visit About page</Text>
          </Pressable>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
