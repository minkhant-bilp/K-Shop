import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, Pressable, View } from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";

const products = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    price: "Rp244.999",
    oldPrice: "Rp699.000",
    discount: "-65%",
    image: require("@/assets/game_image/category1.png"),
  },
  {
    id: "2",
    title: "Watch Dogs",
    price: "Rp210.000",
    oldPrice: "Rp399.000",
    discount: "-25%",
    image: require("@/assets/game_image/category2.png")
  },
  {
    id: "3",
    title: "FootBall",
    price: "Rp210.000",
    oldPrice: "Rp399.000",
    discount: "-25%",
    image: require("@/assets/game_image/category3.png")
  },
  {
    id: "4",
    title: "Watch Dogs 2",
    price: "Rp210.000",
    oldPrice: "Rp399.000",
    discount: "-25%",
    image: require("@/assets/game_image/category4.png")
  },
];

export default function FlashSaleList() {
  return (
    <View className="mt-4 pb-10">

      <FlashList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        estimatedItemSize={160}
        renderItem={({ item }) => (
          <Pressable className="w-40 mr-4 bg-white rounded-2xl shadow-sm p-2 mb-2">
            <Image
              source={item.image}
              className="w-full h-28 rounded-xl"
              resizeMode="cover"
            />

            <DynamicText fontWeight="semibold" fontSize="xs"
              numberOfLines={1}
              style={{ marginTop: 8 }}
            >
              {item.title}
            </DynamicText>

            <View className="flex-row items-center mt-1">
              <DynamicText fontWeight="bold" style={{ marginRight: 5, color: "#ef4444" }} >
                {item.discount}
              </DynamicText>
              <DynamicText fontSize="xs" style={{ textDecorationLine: "line-through", color: "gray" }} >
                {item.oldPrice}
              </DynamicText>
            </View>

            <DynamicText fontWeight="bold" fontSize="sm" style={{ color: "black", lineHeight: 20 }} >
              {item.price}
            </DynamicText>
          </Pressable>
        )}
      />


    </View>
  );
}