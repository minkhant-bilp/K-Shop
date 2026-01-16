import { router } from "expo-router";
import {
  FileText,
  Flame,
  Headset,
  Megaphone,
  Monitor,
  MoreHorizontal,
  Smartphone,
  Ticket
} from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import FlashSaleList from "@/components/pager/Category";
import Popular from "@/components/pager/Popular";
import Products from "@/components/pager/Products";
import SeeMore from "@/components/pager/SeeMore";
import WalletCard from "@/components/pager/WalletCard";
import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import GameShopHeader from "@/components/ui/header/home-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";

const icons = [
  { id: 1, title: "Popular", icon: Flame, route: "/home/popular" },
  { id: 2, title: "Top up", icon: Smartphone, route: "/home/top-up" },
  { id: 3, title: "PC Game", icon: Monitor, route: "/home/pc-game" },
  { id: 4, title: "Voucher", icon: Ticket, route: "/home/voucher" },
  { id: 5, title: "Promo", icon: Megaphone, route: "/home/promo" },
  { id: 6, title: "Transaction", icon: FileText, route: "/home/transaction" },
  { id: '7', title: 'Service', icon: Headset, route: '/home/service', color: '#10b981' },

  { id: 8, title: "All features", icon: MoreHorizontal, route: "/home/all-features" },
];

const Particle = ({ delay, style }: { delay: number; style: any }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0, { duration: 800 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[style, animatedStyle]} />;
};

const IconItemComponent = ({ item }: { item: any }) => {
  return (
    <View className="w-[22%] mb-6 items-center">
      <Pressable
        className="items-center w-full"
        onPress={() => router.push(item.route)}
      >
        <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center mb-2 shadow-sm border border-rose-50 overflow-hidden relative">

          <Particle
            delay={0}
            style={{ position: 'absolute', top: 8, left: 8, width: 4, height: 4, borderRadius: 2, backgroundColor: '#fecdd3' }}
          />
          <Particle
            delay={500}
            style={{ position: 'absolute', bottom: 10, right: 10, width: 6, height: 6, borderRadius: 3, backgroundColor: '#ffe4e6' }}
          />
          <Particle
            delay={1000}
            style={{ position: 'absolute', top: 12, right: 8, width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#f43f5e' }}
          />

          <item.icon size={26} color="#f43f5e" strokeWidth={1.5} />
        </View>

        <DynamicText fontWeight="semibold" fontSize="xs" style={{ color: '#64748b', textAlign: 'center' }}>
          {item.title}
        </DynamicText>
      </Pressable>
    </View>
  );
};

const AnimatedIconItem = React.memo(IconItemComponent);

const HomeScreen = () => {
  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>
      <GameShopHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletCard />

        <View className="flex-row flex-wrap justify-between px-4 mt-4">
          {icons.map((item, index) => (
            <AnimatedIconItem key={item.id} item={item} />
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