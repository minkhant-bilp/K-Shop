import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicText from "../dynamic-text/dynamic-text";
import { SECONDARY_COLOR } from "./home-header";

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
          paddingTop: insets.top + 20,
        },
      ]}
    >
      <View className="items-center pb-6">
        <View className="w-28 h-28 rounded-full items-center justify-center bg-white/20">
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            className="w-24 h-24 rounded-full"
            resizeMode="cover"
          />
        </View>

        <DynamicText fontSize="lg" fontWeight="bold" fontColor="white" className="text-2xl font-semibold mt-4">
          Aung Myo Khant
        </DynamicText>
        <DynamicText fontColor="white" className="text-sm">
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
