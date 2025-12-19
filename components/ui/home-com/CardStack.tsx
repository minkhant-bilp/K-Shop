import React from "react";
import { View } from "react-native";

type CardStackProps = {
  colors?: string[]; // allow custom colors
};

const CardStack: React.FC<CardStackProps> = ({ colors = ["#9E9E9E", "#BDBDBD", "#E0E0E0"] }) => {
  return (
    <View className="relative w-full h-[400px] mb-8 flex items-center justify-center">
      {/* Front card */}
      <View
        className="absolute w-full top-24 h-[340px] left-0 right-0 rounded-3xl"
        style={{
          zIndex: 20,
          backgroundColor: colors[0],
          transform: [{ translateY: 0 }, { scale: 1 }],
        }}
      />

      {/* Middle card */}
      <View
        className="absolute w-full top-24 h-[340px] left-0 right-0 rounded-3xl"
        style={{
          zIndex: 10,
          backgroundColor: colors[1],
          transform: [{ translateY: -40 }, { scale: 0.95 }, ],
        }}
      />

      {/* Back card */}
      <View
        className="absolute w-full top-24 h-[340px] left-0 right-0 rounded-3xl"
        style={{
          zIndex: 0,
          backgroundColor: colors[2],
          transform: [{ translateY: -60 }, { translateX: -5 }, { scale: 0.9 }, { rotate: "3deg" }],
        }}
      />
    </View>
  );
};

export default CardStack;
