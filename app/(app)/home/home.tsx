import {
  FileText,
  Flame,
  Gift,
  Monitor,
  MoreHorizontal,
  Percent,
  Smartphone,
  Ticket,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

// Components Imports
import FlashSaleList from "@/components/pager/Category";
import Popular from "@/components/pager/Popular";
import Products from "@/components/pager/Products";
import SeeMore from "@/components/pager/SeeMore";
import ViewPager from "@/components/pager/ViewPager";
import GameTopUpHeader from "@/components/ui/header/home-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";

// Reanimated Imports (အပေါ်မှာရေးခဲ့တဲ့ Component ကို ဒီဖိုင်ထဲထည့်မယ်ဆိုရင် Import လုပ်ဖို့မမေ့ပါနဲ့)
import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// --- Icons Data ---
const icons = [
  { id: 1, title: "Popular", icon: Flame },
  { id: 2, title: "Mobile Game", icon: Smartphone },
  { id: 3, title: "PC Game", icon: Monitor },
  { id: 4, title: "Voucher", icon: Ticket },
  { id: 5, title: "Promo", icon: Percent },
  { id: 6, title: "Transaction", icon: FileText },
  { id: 7, title: "Gift Cards", icon: Gift },
  { id: 8, title: "All features", icon: MoreHorizontal },
];

// --- Animated Component (ဖိုင်မခွဲချင်ရင် ဒီမှာထားပါ) ---
const AnimatedIconItem = ({ item, index }: { item: any, index: number }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      // Staggered Entrance Animation (လှလှလေးဖြစ်စေတဲ့အချက်)
      entering={FadeInDown.delay(index * 100).springify().damping(12)}
      className="w-[22%] mb-6 items-center"
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.9))}
        onPressOut={() => (scale.value = withSpring(1))}
        className="items-center w-full"
      >
        <Animated.View
          style={animatedStyle}
          // Design Upgrade: အဖြူရောင်နောက်ခံ၊ အရိပ်ပါးပါးနဲ့ ပိုကြွတက်လာအောင် လုပ်ထားတယ်
          className="w-14 h-14 bg-white rounded-2xl items-center justify-center mb-2 shadow-sm border border-rose-50"
        >
          {/* Icon အရောင်ကို Red (rose-500) သုံးလိုက်တယ် */}
          <item.icon size={26} color="#f43f5e" strokeWidth={1.5} />
        </Animated.View>

        <DynamicText fontWeight="semibold" fontSize="xs" style={{ color: '#64748b', textAlign: 'center' }}>
          {item.title}
        </DynamicText>
      </Pressable>
    </Animated.View>
  );
};

// --- Main Screen ---
const HomeScreen = () => {
  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>
      <GameTopUpHeader />
      <ViewPager />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Icons Grid Section */}
        <View className="flex-row flex-wrap justify-between px-4 mt-7">
          {icons.map((item, index) => (
            <AnimatedIconItem key={item.id} item={item} index={index} />
          ))}
        </View>

        <SeeMore />
        <FlashSaleList />
        <Popular />
        <Products />
      </ScrollView>

      <View className="h-4"></View>
    </ScreenWrapper>
  );
};

export default HomeScreen;