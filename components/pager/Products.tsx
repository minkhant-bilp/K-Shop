import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import DynamicText from "../ui/dynamic-text/dynamic-text"; // Path အမှန်ချိန်းပါ

const GAME_LIST = [
    {
        id: "1",
        title: "Mobile Legend Bang Bang",
        image: require("@/assets/game_image/photo1.png"),
    },
    {
        id: "2",
        title: "Weekly Pass",
        image: require("@/assets/game_image/photo2.png"),
    },
    {
        id: "3",
        title: "Pubg Mobile",
        image: require("@/assets/game_image/photo3.png"),
    },
    {
        id: "4",
        title: "FC Mobile",
        image: require("@/assets/game_image/photo4.png"),
    },
    { id: "5", title: "Free Fire", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Destiny", image: require("@/assets/game_image/photo6.png") },
];

export default function Products() {
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 4 : 2;

    return (
        <View className="flex-1 bg-gray-50 px-4 pt-2">
            <FlashList
                data={GAME_LIST}
                numColumns={numColumns}
                estimatedItemSize={250}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

                renderItem={({ item, index }) => {
                    const isLastColumn = (index + 1) % numColumns === 0;

                    return (
                        <Pressable
                            className={`flex-1 mb-4 ${isLastColumn ? 'mr-0' : 'mr-3'} bg-slate-200 rounded-2xl p-3 shadow-sm border border-slate-100`}

                            android_ripple={{ color: '#fee2e2' }}
                        >
                            {/* 1. Image */}
                            <Image
                                source={item.image}
                                className="w-full h-32 rounded-xl"
                                resizeMode="cover"
                            />

                            {/* 2. Content with DynamicText */}
                            <View className="mt-3">

                                {/* Title */}
                                <DynamicText
                                    fontWeight="bold"
                                    fontSize="sm"
                                    numberOfLines={1}
                                    style={{ color: '#0f172a', marginBottom: 4 }} // Slate-900
                                >
                                    {item.title}
                                </DynamicText>


                                <Button className="bg-rose-700 rounded-lg " onPress={() => console.log(item.title)}>
                                    <ButtonText className="text-white">
                                        Buy Now
                                    </ButtonText>
                                </Button>

                            </View>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
}
