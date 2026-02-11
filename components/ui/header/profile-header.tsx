import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicText from "../dynamic-text/dynamic-text";
import { SECONDARY_COLOR } from "./home-header";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const ProfileHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={SECONDARY_COLOR as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.container,
        {
          paddingTop: insets.top + (isTablet ? 40 : 20),
          paddingBottom: isTablet ? 40 : 6
        },
      ]}
    >
      <View className="items-center pb-6">

        <View
          className={`${isTablet ? 'w-40 h-40' : 'w-28 h-28'} rounded-full items-center justify-center bg-white/20`}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className={`${isTablet ? 'w-36 h-36' : 'w-24 h-24'} rounded-full`}
            resizeMode="cover"
          />
        </View>

        <DynamicText
          fontSize={isTablet ? "3xl" : "lg"}
          fontWeight="bold"
          fontColor="white"
          style={{ marginTop: isTablet ? 24 : 16 }}
        >
          Aung Myo Khant
        </DynamicText>

        <DynamicText
          fontColor="white"
          className={`${isTablet ? 'text-xl' : 'text-sm'} mt-1`}
        >
          aungmyokhant459@gmail.com
        </DynamicText>
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});