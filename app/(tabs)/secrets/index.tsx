import { View, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useSecrets } from "@/hooks/useSecrets";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { eq } from "drizzle-orm";
import { secrets } from "@/types/database";

import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Page() {
  const { i18n } = useTranslation();
  const { iconColor } = useAppTheme();
  const { push } = useRouter();
  const { data, mutate } = useSecrets();
  const db = useDatabaseContext();
  const [canSaveSecret, setCanSaveSecret] = useState(false);

  useEffect(() => {
    (async () => {
      const authLevel = await LocalAuthentication.getEnrolledLevelAsync();
      if (authLevel === LocalAuthentication.SecurityLevel.BIOMETRIC) {
        setCanSaveSecret(true);
      }
    })();
  }, []);

  const createNewSecret = () => push("/secrets/create");

  const readSecret = async (key: string) => {
    try {
      const result = await SecureStore.getItemAsync(key, {
        requireAuthentication: true,
        authenticationPrompt: i18n.t("secrets.readPrompt"),
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      if (!result) return Alert.alert("No values stored under that key.");

      Alert.alert("Secret:", result);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Operation cancelled");
    }
  };

  const deleteSecret = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key, {
        requireAuthentication: true,
        authenticationPrompt: i18n.t("secrets.deletePrompt"),
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      await db.delete(secrets).where(eq(secrets.key, key));
      await mutate();
      Alert.alert("Success", i18n.t("secrets.deleteSuccess"));
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Deletion request cancelled");
    }
  };

  return (
    <View className="flex-1 relative flex items-start justify-start">
      {!!data.length ? (
        <View className="w-full h-full pb-16 gap-8">
          <FlashList
            data={data}
            renderItem={({ item }) => (
              <View className="flex items-start justify-start p-4 border-b-2 bottom-1 border-slate-300 dark:border-gray-50">
                <Text className="w-full text-lg text-black dark:text-white">
                  {item.key}
                </Text>

                <View className="flex flex-row justify-between items-center bg-red-600 border-1 border-red-600 p-8 gap-8">
                  <Button
                    label={i18n.t("read")}
                    color="primary"
                    onPress={() => readSecret(item.key)}
                  />

                  <Button
                    label={i18n.t("delete")}
                    color="error"
                    onPress={() => deleteSecret(item.key)}
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

      <View className="flex justify-center items-center absolute inset-x-0 bottom-0">
        <View className="w-full max-w-md">
          {canSaveSecret ? (
            <Button
              label={i18n.t("secrets.createSecret")}
              color="secondary"
              onPress={createNewSecret}
              Icon={<Ionicons name="create" size={24} color={iconColor} />}
            />
          ) : (
            <Text className="text-red-500 font-bold text-center text-lg">
              {i18n.t("secrets.noBiometrics")}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
