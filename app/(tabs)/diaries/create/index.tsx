import { Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";
import { useDiaries } from "@/hooks/useDiaries";
import { diaries } from "@/types/database";

import * as Crypto from "expo-crypto";

export default function Page() {
  const { i18n } = useTranslation();
  const { mutate } = useDiaries();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { navigate } = useRouter();
  const db = useDatabaseContext();

  const onSubmit = handleSubmit(async (data) => {
    const { title, description } = data;
    const id = Crypto.randomUUID();
    const timestamp = Date.now();

    try {
      await db.insert(diaries).values({ id, title, description, timestamp });
      await mutate();
      Alert.alert("Success", i18n.t("diaries.addSuccess"));
      reset();
      navigate("/diaries");
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
            name="title"
          />

          {errors.title && (
            <Text className="text-red-500">{i18n.t("form.required")}</Text>
          )}
        </View>

        <View className="gap-2">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={i18n.t("secrets.description")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="w-full h-40 border-1 border border-black dark:border-white text-black dark:text-white p-4 rounded-xl flex items-start justify-start"
                multiline
              />
            )}
            name="description"
          />

          {errors.description && (
            <Text className="text-red-500">{i18n.t("form.required")}</Text>
          )}
        </View>

        <Button label={i18n.t("form.submit")} onPress={onSubmit} />
      </View>
    </ScrollView>
  );
}
