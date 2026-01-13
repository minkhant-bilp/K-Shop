import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button/button";
import DynamicText from "../dynamic-text/dynamic-text";

export const SECONDARY_COLOR = ["#FF3232", "#000000"];
const isIOS = Platform.OS === "ios";

interface GameShopHeaderProps {
  title?: string;
  onSearchPress?: () => void;
  onNotiPress?: () => void;
}

const GameShopHeader: React.FC<GameShopHeaderProps> = ({
  title = "Game Shop",
  onSearchPress,
  onNotiPress,
}) => {
  const insets = useSafeAreaInsets();

  const onPressBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <LinearGradient
      colors={SECONDARY_COLOR as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      {/* <View style={styles.left}> */}
        {/* <Button onPress={onPressBack} style={styles.iconButton}>
          <AntDesign name="left" size={22} color="#fff" />
        </Button> */}
        <DynamicText fontSize="2xl" fontWeight="bold" fontColor="#fff">
          {title}
        </DynamicText>
      {/* </View> */}

      <View style={styles.right}>
        <Button onPress={onSearchPress} style={styles.iconButton}>
          <Ionicons name="search-outline" size={22} color="#fff" />
        </Button>
        <Button onPress={onNotiPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    // gap: 4,
  },
  iconButton: {
    padding: 6,
  },
});

export default GameShopHeader;
