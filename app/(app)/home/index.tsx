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

import FlashSaleList from "@/components/pager/Category";
import Popular from "@/components/pager/Popular";
import Products from "@/components/pager/Products";
import SeeMore from "@/components/pager/SeeMore";
import ViewPager from "@/components/pager/ViewPager";
import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import GameTopUpHeader from "@/components/ui/header/home-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";

import { router } from "expo-router";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const icons = [
  { id: 1, title: "Popular", icon: Flame, route: "/home/popular" },
  { id: 2, title: "Mobile Game", icon: Smartphone, route: "/home/mobile-game" },
  { id: 3, title: "PC Game", icon: Monitor, route: "/home/pc-game" },
  { id: 4, title: "Voucher", icon: Ticket, route: "/home/voucher" },
  { id: 5, title: "Promo", icon: Percent, route: "/home/promo" },
  { id: 6, title: "Transaction", icon: FileText, route: "/home/transaction" },
  { id: 7, title: "Gift Cards", icon: Gift, route: "/home/gift-cards" },
  { id: 8, title: "All features", icon: MoreHorizontal, route: "/home/all-features" },
];


const IconItemComponent = ({ item, index }: { item: any, index: number }) => {



  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify().damping(12)}
      className="w-[22%] mb-6 items-center"
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(0.9))}
        onPressOut={() => (scale.value = withSpring(1))}
        className="items-center w-full"
         onPress={() => router.push(item.route)}
      >
        <Animated.View
          style={animatedStyle}
          className="w-14 h-14 bg-white rounded-2xl items-center justify-center mb-2 shadow-sm border border-rose-50"
        >
          <item.icon size={26} color="#f43f5e" strokeWidth={1.5} />
        </Animated.View>

        <DynamicText fontWeight="semibold" fontSize="xs" style={{ color: '#64748b', textAlign: 'center' }}>
          {item.title}
        </DynamicText>
      </Pressable>
    </Animated.View>
  );
};


const AnimatedIconItem = React.memo(IconItemComponent);


const HomeScreen = () => {
  console.log("Rendering HomeScreen...");

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>
      <GameTopUpHeader />
      <ViewPager />

      <ScrollView showsVerticalScrollIndicator={false}>

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