import { Text, View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/Button";
import { useTranslation } from "@/hooks/useTranslation";
import { useDatabaseContext } from "@/hooks/useDatabaseContext";

export default function Page() {
  const { i18n } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const db = useDatabaseContext();

  const onSubmit = handleSubmit((data) => {
    const { title, description } = data;

    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO diaries (title, description) VALUES (?, ?);",
          [title, description]
        );
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <View className="container px-8 mt-8 flex gap-8">
      <View className="gap-2">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={i18n.t("secrets.title")}
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
  );
}
