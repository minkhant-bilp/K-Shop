import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, Pressable, useWindowDimensions, View } from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";


const GAME_LIST = [
    {
        id: "1",
        title: "Mobile Legend",

        image: require("@/assets/game_image/photo1.png"),
    },
    {
        id: "2",
        title: "Weekly Pass",
        image: require("@/assets/game_image/photo2.png"),
    },
    {
        id: "3",
        title: "Pubg",
        image: require("@/assets/game_image/photo3.png"),
    },
    {
        id: "4",
        title: "FC Mobile",
        image: require("@/assets/game_image/photo4.png"),
    },
    {
        id: "5",
        title: "Free Fire",
        image: require("@/assets/game_image/photo5.png"),
    },
    {
        id: "6",
        title: "Destiny",
        image: require("@/assets/game_image/photo6.png"),
    },
    {
        id: "7",
        title: "Were Wolf",
        image: require("@/assets/game_image/photo7.png"),
    },
    {
        id: "8",
        title: "Warfare",
        image: require("@/assets/game_image/photo8.png"),
    },
    {
        id: "9",
        title: "MineCraft",
        image: require("@/assets/game_image/photo9.png"),
    },
    {
        id: "10",
        title: "Coc",
        image: require("@/assets/game_image/photo10.png"),
    },
    {
        id: "11",
        title: "Coc",
        image: require("@/assets/game_image/photo10.png"),
    },

];

export default function Products() {
    const { width } = useWindowDimensions();

    const isTablet = width > 600;
    const numColumns = isTablet ? 4 : 2;

    const imageHeight = isTablet ? 140 : 160;

    return (
        <View className="flex-1 bg-white px-5 top-[-10px]">



            <View className="h-full">
                <FlashList
                    key={numColumns}

                    data={GAME_LIST}
                    numColumns={numColumns}

                    estimatedItemSize={200}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}

                    renderItem={({ item }) => (
                        <Pressable
                            className="flex-1 mb-6 mr-3 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                            onPress={() => console.log(item.title)}
                        >
                            <Image
                                source={item.image}
                                style={{ width: '100%', height: imageHeight }}
                                resizeMode="cover"
                            />


                            <View className="p-2.5">
                                <DynamicText fontSize="sm" fontWeight="bold" fontColor="slate" numberOfLines={1}>
                                    {item.title}
                                </DynamicText>


                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
};
