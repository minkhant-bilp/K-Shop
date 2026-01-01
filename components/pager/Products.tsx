import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";

const GAME_LIST = [
    // ... (Data တွေက အတူတူပါပဲ)
    { id: "1", title: "Mobile Legend", image: require("@/assets/game_image/photo1.png") },
    { id: "2", title: "Weekly Pass", image: require("@/assets/game_image/photo2.png") },
    { id: "3", title: "Pubg", image: require("@/assets/game_image/photo3.png") },
    { id: "4", title: "FC Mobile", image: require("@/assets/game_image/photo4.png") },
    { id: "5", title: "Free Fire", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Destiny", image: require("@/assets/game_image/photo6.png") },
    { id: "7", title: "Were Wolf", image: require("@/assets/game_image/photo7.png") },
    { id: "8", title: "Warfare", image: require("@/assets/game_image/photo8.png") },
    { id: "9", title: "MineCraft", image: require("@/assets/game_image/photo9.png") },
    { id: "10", title: "Coc", image: require("@/assets/game_image/photo10.png") },
];

export default function Products() {
    const { width } = useWindowDimensions();

    const isTablet = width > 600;
    const numColumns = isTablet ? 4 : 2;

    const imageHeight = isTablet ? 180 : 160;

    return (
        <View className="flex-1 bg-gray-50 px-4 top-[-10px]">
            <View className="h-full">
                <FlashList
                    key={numColumns}
                    data={GAME_LIST}
                    numColumns={numColumns}
                    estimatedItemSize={220}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}



                    renderItem={({ item, index }) => {

                        const isLastColumn = (index + 1) % numColumns === 0;

                        return (
                            <Pressable
                                className={`flex-1 mb-6 ${isLastColumn ? 'mr-0' : 'mr-4'} bg-white rounded-2xl shadow-md border-2 border-rose-100 overflow-hidden`}
                                onPress={() => console.log(item.title)}

                                android_ripple={{ color: 'rgba(225, 29, 72, 0.15)' }}
                                style={({ pressed }) => [


                                ]}
                            >
                                <Image
                                    source={item.image}
                                    style={{ width: '100%', height: imageHeight }}
                                    resizeMode="cover"
                                />

                                <View className="p-3 bg-white border-t border-rose-50">

                                    <DynamicText
                                        fontSize="sm"
                                        fontWeight="bold"
                                        numberOfLines={1}
                                        style={{
                                            color: '#e11d48',
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5
                                        }}
                                    >
                                        {item.title}
                                    </DynamicText>


                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
        </View>
    )
};