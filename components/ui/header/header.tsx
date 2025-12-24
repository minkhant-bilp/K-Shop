

import { bgWhiteCode } from "@/structure/styles/colors";
import { cn } from "@/structure/utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button/button";
import DynamicText from "../dynamic-text/dynamic-text";

const isIOS = Platform.OS === "ios";

interface HeaderProps {
  title?: string;
  onLeftIconPress?: () => void;
  onRightComponentPress?: () => void;
  leftIcon?: React.ReactNode;
  headerRightComponent?: React.ReactNode;
  type?: "default" | "landing";
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onLeftIconPress,
  onRightComponentPress,
  leftIcon,
  headerRightComponent,
  type = "default",
  showBackButton = true,
}) => {
  const insets = useSafeAreaInsets();

  const onPressBack = useCallback(() => {
    if (onLeftIconPress && leftIcon) {
      onLeftIconPress();
    } else {
      router.back();
    }
  }, [router, onLeftIconPress, leftIcon]);

  const headerType = type === "default" ? "pb-0" : "pb-10";

  return (
    <View
      className={cn(
        `flex-row justify-between items-center ${headerType} pb-1 px-4 py-6`
      )}
      style={{
        paddingTop: isIOS ? insets.top : insets.top,
        backgroundColor: bgWhiteCode,
        minHeight: 80,
      }}
    >
      <View className="flex-row items-center">
        {!leftIcon
          ? showBackButton && (
              <Button className="p-1" onPress={onPressBack}>
                <AntDesign name="left" size={24} color="black" />
              </Button>
            )
          : leftIcon}
        <View
          style={{
            marginLeft: showBackButton ? 0 : 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DynamicText
            type="rk"
            lineHeightHelper
            fontSize="base"
            fontWeight="bold"
            fontColor="#ffffff"
          >
            {title}
          </DynamicText>
        </View>
      </View>
      <Button onPress={onRightComponentPress}>{headerRightComponent}</Button>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
