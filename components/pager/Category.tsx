import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const products = [
  { id: "1", title: "Cyberpunk 2077", price: "Rp244.999", oldPrice: "Rp699.000", discount: "-65%", image: require("@/assets/game_image/category1.png") },
  { id: "2", title: "Watch Dogs", price: "Rp210.000", oldPrice: "Rp399.000", discount: "-25%", image: require("@/assets/game_image/category2.png") },
  { id: "3", title: "FootBall", price: "Rp210.000", oldPrice: "Rp399.000", discount: "-25%", image: require("@/assets/game_image/category3.png") },
  { id: "4", title: "Watch Dogs 2", price: "Rp210.000", oldPrice: "Rp399.000", discount: "-25%", image: require("@/assets/game_image/category4.png") },
];

const PulsingBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="bg-rose-500 px-2 py-0.5 rounded-md mr-2">
      {children}
    </View>
  );
};

export default function FlashSaleList() {
  const router = useRouter();

  return (
    <View className="mt-4 pb-10">
      <FlashList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        estimatedItemSize={isTablet ? 260 : 160}
        renderItem={({ item }) => (
          <Pressable
            className={`${isTablet ? 'w-60 mr-6 p-3' : 'w-40 mr-4 p-2'} bg-white rounded-2xl shadow-sm border border-slate-100`}
            onPress={() => {
              router.push({
                pathname: "/home/products",
                params: {
                  id: item.id,
                  title: item.title,
                  image: item.image
                }
              });
            }}
          >
            <Image
              source={item.image}
              className={`w-full ${isTablet ? 'h-40' : 'h-28'} rounded-xl bg-slate-50`}
              resizeMode="cover"
            />

            <DynamicText
              fontWeight="semibold"
              fontSize={isTablet ? "sm" : "xs"}
              numberOfLines={1}
              style={{ marginTop: 8, color: '#334155' }}
            >
              {item.title}
            </DynamicText>

            <View className="flex-row items-center mt-2">
              <PulsingBadge>
                <DynamicText
                  fontWeight="semibold"
                  style={{ fontSize: isTablet ? 12 : 10, color: "white" }}
                >
                  {item.discount}
                </DynamicText>
              </PulsingBadge>
              <DynamicText
                fontSize={isTablet ? "sm" : "xs"}
                style={{ textDecorationLine: "line-through", color: "#94a3b8" }}
              >
                {item.oldPrice}
              </DynamicText>
            </View>

            <DynamicText
              fontWeight="bold"
              fontSize={isTablet ? "lg" : "sm"}
              style={{ color: "#0f172a", marginTop: 2 }}
            >
              {item.price}
            </DynamicText>
          </Pressable>
        )}
      />
    </View>
  );
}