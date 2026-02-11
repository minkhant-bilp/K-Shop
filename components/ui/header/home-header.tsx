import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../button/button";
import DynamicText from "../dynamic-text/dynamic-text";

export const SECONDARY_COLOR = ["#FF3232", "#000000"];

const { width } = Dimensions.get("window");
const isTablet = width > 600;

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
  const router = useRouter();

  return (
    <LinearGradient
      colors={SECONDARY_COLOR as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingHorizontal: isTablet ? 40 : 20,
          minHeight: isTablet ? 100 : 88
        }
      ]}
    >
      <DynamicText fontSize="2xl" fontWeight="bold" fontColor="#fff">
        {title}
      </DynamicText>

      <View style={styles.right}>
        <Button onPress={onSearchPress} style={styles.iconButton}>
          <Ionicons name="search-outline" size={22} color="#fff" />
        </Button>
        <Button style={styles.iconButton} onPress={() => router.navigate("/(app)/(bottom-tab)/notification")}>
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
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 6,
  },
});

export default GameShopHeader;