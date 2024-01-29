import { Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { useSecrets } from "@/hooks/useSecrets";
import { secrets } from "@/types/database";

import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";

export default function Page() {
  const { i18n } = useTranslation();
  const { mutate } = useSecrets();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      secret: "",
    },
  });

  const { navigate } = useRouter();
  const db = useDatabaseContext();

  const onSubmit = handleSubmit(async (data) => {
    const secret = data.secret.trim();
    const id = Crypto.randomUUID();
    const key = Crypto.randomUUID();

    try {
      await SecureStore.setItemAsync(key, secret, {
        requireAuthentication: true,
        authenticationPrompt: i18n.t("secrets.addPrompt"),
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      await db.insert(secrets).values({ id, key });
      await mutate();
      Alert.alert("Success", i18n.t("secrets.addSuccess"));
      reset();
      navigate("/secrets");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <ScrollView className="flex-1">
      <View className="container px-8 mt-8 flex gap-8">
        <View className="gap-2">
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={i18n.t("form.title")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="w-full h-16 border border-black dark:border-white text-black dark:text-white p-4 rounded-xl"
              />
            )}
            name="secret"
          />

          {errors.secret && (
            <Text className="text-red-500">{i18n.t("form.required")}</Text>
          )}
        </View>

        <Button label={i18n.t("form.submit")} onPress={onSubmit} />
      </View>
    </ScrollView>
  );
}
