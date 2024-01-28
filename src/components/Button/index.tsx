import type { ReactNode } from "react";
import { View, Text, Pressable } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const classes = tv({
  base: "flex flex-row items-center gap-2 justify-center font-medium active:opacity-80 ripple-[#333] ripple-bordered px-4 py-2 overflow-hidden",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-purple-500",
      error: "bg-red-500",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    color: "primary",
    fullWidth: false,
  },
});

type ButtonVariants = VariantProps<typeof classes>;

interface Props extends ButtonVariants {
  label: string;
  onPress?: () => void;
  Icon?: ReactNode;
}

export const Button = ({
  onPress,
  label,
  color,
  fullWidth = false,
  Icon,
}: Props) => {
  return (
    <Pressable className={classes({ color, fullWidth })} onPress={onPress}>
      {Icon && <View>{Icon}</View>}

      <Text className="text-white dark:text-black text-lg text-center">
        {label}
      </Text>
    </Pressable>
  );
};
