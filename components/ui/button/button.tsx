import { cn } from "@/lib/utils/utils";
import { bgDefault } from "@/styles/colors";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import DynamicText from "../dynamic-text/dynamic-text";

type ButtonVariant = "normal" | "large";

type ButtonProps = PropsWithChildren<{
  className?: string;
  variant?: ButtonVariant;
  isDisabled?: boolean;
}> &
  TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({
  className,
  onPress = () => {},
  children,
  variant,
  isDisabled,
  ...props
}) => {
  const isLarge = variant === "large";

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={isDisabled}
      className={cn(
        "px-[16] py-[16]",
        !isLarge ? "rounded-[8px]" : "rounded-full",
        isDisabled && bgDefault,
        className
      )}
      onPress={onPress}
      {...props}
    >
      {typeof children === "string" ? (
        <DynamicText align="center" fontWeight="semibold" fontColor="white" fontSize="lg">
          {children}
        </DynamicText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
