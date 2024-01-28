import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useSecrets } from "@/hooks/useSecrets";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";

import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { i18n } = useTranslation();
  const { iconColor } = useAppTheme();
  const { push } = useRouter();
  const { secrets, mutate } = useSecrets();
  const db = useDatabaseContext();

  const createNewSecret = () => push("/secrets/create");

  const readSecret = async (id: string) => {
    try {
      const result = await SecureStore.getItemAsync(id, {
        requireAuthentication: true,
        authenticationPrompt: i18n.t("secrets.readPrompt"),
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      if (!result) throw new Error("Cancelled");

      Alert.alert("Secret:", result);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Operation cancelled");
    }
  };

  const deleteSecret = async (id: string) => {
    try {
      await SecureStore.deleteItemAsync(id, {
        requireAuthentication: true,
        authenticationPrompt: i18n.t("secrets.deletePrompt"),
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      db.transaction((tx) => {
        tx.executeSql("DELETE FROM secrets WHERE id = ?;", [id], () =>
          mutate()
        );
      });

      Alert.alert("Success", i18n.t("secrets.deleteSuccess"));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Deletion request cancelled");
    }
  };

  return (
    <View className="flex-1 relative flex items-start justify-start">
      {!!secrets.length ? (
        <View className="w-full h-full pb-16 gap-8">
          <FlashList
            data={secrets}
            renderItem={({ item }) => (
              <View className="flex items-start justify-start p-4 border-b-2 bottom-1 border-slate-300 dark:border-gray-50">
                <Text className="w-full text-lg text-black dark:text-white">
                  {/* @ts-ignore */}
                  {item.key}
                </Text>

                <View className="flex flex-row justify-between items-center bg-red-600 border-1 border-red-600 p-8 gap-8">
                  <Button
                    label={i18n.t("read")}
                    color="primary"
                    // @ts-ignore
                    onPress={() => readSecret(item.id)}
                  />

                  <Button
                    label={i18n.t("delete")}
                    color="error"
                    // @ts-ignore
                    onPress={() => deleteSecret(item.id)}
                  />
                </View>
              </View>
            )}
            estimatedItemSize={200}
          />
        </View>
      ) : (
        <View className="w-full h-full justify-center items-center gap-4">
          <Text className="text-9xl py-4">🤐</Text>
          <Text className="text-2xl font-medium text-center text-black dark:text-white">
            {i18n.t("secrets.noSecrets")}
          </Text>
          <Text className="text-center text-black dark:text-white">
            {i18n.t("startCreating")}
          </Text>
        </View>
      )}

      <View className="flex justify-center items-center absolute inset-x-0 bottom-0 h-16">
        <View className="w-full max-w-sm">
          <Button
            label={i18n.t("secrets.createSecret")}
            color="secondary"
            onPress={createNewSecret}
            Icon={<Ionicons name="create" size={24} color={iconColor} />}
          />
        </View>
      </View>
    </View>
  );
}
