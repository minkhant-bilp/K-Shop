import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import React, { useState } from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring, ZoomIn } from "react-native-reanimated";

type Country = "TH" | "MM";


const THAI_PRODUCTS = [
  { id: "t1", title: "True Move H", price: "50 Baht", image: require("@/assets/bill_image/thai.png") },
  { id: "t2", title: "True Move H", price: "100 Baht", image: require("@/assets/bill_image/thai.png") },
  { id: "t3", title: "True Move H", price: "500 Baht", image: require("@/assets/bill_image/thai.png") },
  { id: "t4", title: "Ais 12 Call", price: "50 Baht", image: require("@/assets/bill_image/thai2.png") },
  { id: "t5", title: "Ais 12 Call", price: "100 Baht", image: require("@/assets/bill_image/thai2.png") },
  { id: "t6", title: "Ais 12 Call", price: "500 Baht", image: require("@/assets/bill_image/thai2.png") },
  { id: "t7", title: "Dtac", price: "50 Baht", image: require("@/assets/bill_image/thai3.png") },
  { id: "t8", title: "Dtac", price: "100 Baht", image: require("@/assets/bill_image/thai3.png") },
  { id: "t9", title: "Dtac", price: "500 Baht", image: require("@/assets/bill_image/thai3.png") },
];

const MYANMAR_PRODUCTS = [
  { id: "m1", title: "Mytel", price: "1,000 Kyats", image: require("@/assets/bill_image/mm1.png") },
  { id: "m2", title: "Mytel", price: "5,000 Kyats", image: require("@/assets/bill_image/mm1.png") },
  { id: "m3", title: "Mytel", price: "10,000 Kyats", image: require("@/assets/bill_image/mm1.png") },
  { id: "m4", title: "Atom", price: "1,000 Kyats", image: require("@/assets/bill_image/mm2.png") },
  { id: "m5", title: "Atom", price: "5,000 Kyats", image: require("@/assets/bill_image/mm2.png") },
  { id: "m6", title: "Atom", price: "10,000 Kyats", image: require("@/assets/bill_image/mm2.png") },
  { id: "m7", title: "Ooredoo", price: "1,000 Kyats", image: require("@/assets/bill_image/mm3.png") },
  { id: "m8", title: "Ooredoo", price: "5,000 Kyats", image: require("@/assets/bill_image/mm3.png") },
  { id: "m9", title: "Ooredoo", price: "10,000 Kyats", image: require("@/assets/bill_image/mm3.png") },
  { id: "m10", title: "Mytel", price: "1,000 Kyats", image: require("@/assets/bill_image/mm4.png") },
  { id: "m11", title: "Mytel", price: "5,000 Kyats", image: require("@/assets/bill_image/mm4.png") },
  { id: "m12", title: "Mytel", price: "10,000 Kyats", image: require("@/assets/bill_image/mm4.png") },
];


const ProductCard = ({ item, index }: { item: any, index: number }) => (

  <Animated.View
    entering={ZoomIn.delay(index * 50).springify()}
    className="flex-1 m-1 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm items-center"
  >
    {/* ပုံ */}
    <Image
      source={item.image}
      className="w-full h-16 rounded-xl bg-slate-50 mb-2"
      resizeMode="contain"
    />

    <DynamicText fontWeight="bold" fontSize="xs" numberOfLines={1} style={{ color: "#1e293b", textAlign: "center" }}>
      {item.title}
    </DynamicText>

    <DynamicText fontWeight="bold" fontSize="xs" style={{ color: "#ef4444", marginTop: 2 }}>
      {item.price}
    </DynamicText>
  </Animated.View>
);

export default function PhoneBillProducts() {
  const [country, setCountry] = useState<Country>("TH");
  const [containerWidth, setContainerWidth] = useState(0);

  const products = country === "TH" ? THAI_PRODUCTS : MYANMAR_PRODUCTS;


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(country === "TH" ? 0 : containerWidth / 2, { damping: 15, stiffness: 120 }) }],
    };
  });

  return (
    <View className="flex-1 bg-white p-4">
      <View
        className="h-14 bg-slate-100 rounded-full flex-row items-center relative mb-4 p-1 border border-slate-200"
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width - 8)}
      >

        <Animated.View
          style={[
            animatedStyle,
            {
              width: "50%", height: "100%", position: "absolute", left: 4,
              backgroundColor: "white",
              borderRadius: 999,
              shadowColor: "#000", shadowOpacity: 0.1, elevation: 3,
            }
          ]}
        />


        <Pressable onPress={() => setCountry("TH")} className="flex-1 h-full justify-center items-center z-10">
          <DynamicText fontWeight="bold" fontSize="base" style={{ color: country === "TH" ? "#1e293b" : "#94a3b8" }}>
            🇹🇭 Thailand
          </DynamicText>
        </Pressable>


        <Pressable onPress={() => setCountry("MM")} className="flex-1 h-full justify-center items-center z-10">
          <DynamicText fontWeight="bold" fontSize="base" style={{ color: country === "MM" ? "#1e293b" : "#94a3b8" }}>
            🇲🇲 Myanmar
          </DynamicText>
        </Pressable>
      </View>


      <FlatList
        key={country}
        data={products}
        keyExtractor={(item) => item.id}


        numColumns={3}

        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 8 }}

        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )}
      />
    </View>
  );
}