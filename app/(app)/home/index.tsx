import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FileText,
  Flame,
  Megaphone,
  Monitor,
  MoreHorizontal,
  Smartphone,
  Ticket
} from "lucide-react-native";
import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";

import SearchModal from "@/components/common/search/SearchModal";
import FlashSaleList from "@/components/pager/Category";
import Popular from "@/components/pager/Popular";
import Products from "@/components/pager/Products";
import SeeMore from "@/components/pager/SeeMore";
import WalletCard from "@/components/pager/WalletCard";
import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import GameShopHeader from "@/components/ui/header/home-header";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";

import useTranslation from "@/structure/hooks/useTranslation";

const AdminSupportIcon = ({ size, color }: { size: number, color: string }) => (
  <MaterialIcons name="support-agent" size={size} color={color} />
);

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 32) / 4;

const IconItemComponent = ({ item }: { item: any }) => {
  return (
    <View style={{ width: ITEM_WIDTH, marginBottom: 24, alignItems: "center" }}>
      <Pressable
        className="items-center w-full"
        onPress={() => router.push(item.route)}
      >
        <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center mb-2 shadow-sm border border-rose-50 overflow-hidden relative">
          <item.icon size={26} color="#f43f5e" strokeWidth={1.5} />
        </View>

        <DynamicText fontWeight="semibold" fontSize="xs" style={{ color: '#64748b', textAlign: 'center' }}>
          {item.title}
        </DynamicText>
      </Pressable>
    </View>
  );
};

const HomeScreen = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { t } = useTranslation();

  const icons = [
    { id: 1, title: t.popular || "Popular", icon: Flame, route: "/home/popular" },
    { id: 2, title: t.bill || "Bill", icon: Smartphone, route: "/home/top-up" },
    { id: 3, title: t.pcGame || "PC Game", icon: Monitor, route: "/home/pc-game" },
    { id: 4, title: t.voucher || "Voucher", icon: Ticket, route: "/home/voucher" },
    { id: "5", title: t.promo || "Promo", icon: Megaphone, route: "/home/promo" },
    { id: 6, title: t.transaction || "Transaction", icon: FileText, route: "/home/transaction" },
    { id: '7', title: t.admin || "Admin", icon: AdminSupportIcon, route: '/home/service', color: '#10b981' },
    { id: 8, title: t.allFeatures || "All features", icon: MoreHorizontal, route: "/home/all-features" },
  ];

  return (
    <ScreenWrapper headerShown={false} isSafeArea={false}>

      <GameShopHeader
        onSearchPress={() => setIsSearchVisible(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <WalletCard />

        <View className="flex-row flex-wrap px-4 mt-4">
          {icons.map((item) => (
            <IconItemComponent key={item.id} item={item} />
          ))}
        </View>

        <SeeMore />
        <FlashSaleList />
        <Popular />
        <Products />
      </ScrollView>

      <View className="h-4"></View>

      <SearchModal
        visible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
      />

    </ScreenWrapper>
  );
};

export default HomeScreen;