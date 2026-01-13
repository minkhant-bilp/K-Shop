import { Star } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, ToastAndroid } from "react-native";

type StarButtonProps = {
  isActive: boolean;
  onToggle: () => void;
};

export default function StarButton({ isActive, onToggle }: StarButtonProps) {

  const handlePress = () => {
    if (!isActive && Platform.OS === 'android') {
      ToastAndroid.show("Added to Favorites! 🌟", ToastAndroid.SHORT);
    }
    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      className="absolute top-2 right-2 z-10 bg-white/90 p-1.5 rounded-full shadow-sm"
    >
      <Star
        size={20}
        color={isActive ? "#fbbf24" : "#94a3b8"}
        fill={isActive ? "#fbbf24" : "transparent"}
      />
    </Pressable>
  );
}