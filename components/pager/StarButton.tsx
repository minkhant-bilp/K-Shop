import { Star } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, ToastAndroid } from "react-native";

type StarButtonProps = {
  isActive: boolean;        // ကြယ်လင်းနေလား
  onToggle: () => void;     // နှိပ်ရင် ဘာလုပ်မလဲ
};

export default function StarButton({ isActive, onToggle }: StarButtonProps) {

  const handlePress = () => {
    // Active မဖြစ်သေးခင် နှိပ်လိုက်ရင် Toast (စာတန်း) ပေါ်မယ်
    if (!isActive && Platform.OS === 'android') {
      ToastAndroid.show("Added to Favorites! 🌟", ToastAndroid.SHORT);
    }
    // State ပြောင်းမယ်
    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      // ပုံပေါ်မှာထပ်ဖို့ absolute နဲ့ top/right ကို ဒီမှာပဲ ထည့်ပေးထားတယ်
      className="absolute top-2 right-2 z-10 bg-white/90 p-1.5 rounded-full shadow-sm"
    >
      <Star
        size={20}
        color={isActive ? "#fbbf24" : "#94a3b8"} // အဝါ vs မီးခိုး
        fill={isActive ? "#fbbf24" : "transparent"}
      />
    </Pressable>
  );
}