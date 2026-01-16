import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const promoGames = [
    { id: "1", title: "Genshin Impact", desc: "Genesis Crystal", image: require("@/assets/game_image/category1.png") },
    { id: "2", title: "Honor of Kings", desc: "Tokens Package", image: require("@/assets/game_image/category2.png") },
    { id: "3", title: "Mobile Legends", desc: "Diamonds Bonus", image: require("@/assets/game_image/photo3.png") },
    { id: "4", title: "PUBG Mobile", desc: "UC Special Deal", image: require("@/assets/game_image/photo4.png") },
    { id: "5", title: "Free Fire", desc: "Garena Shells", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Roblox", desc: "Robux Promo", image: require("@/assets/game_image/photo6.png") },
];

const AnimatedGameCard = ({ item, index, onPress }: { item: any, index: number, onPress: () => void }) => {

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).springify()}>
            <Pressable
                onPress={onPress}
                onPressIn={() => (scale.value = withSpring(0.95))}
                onPressOut={() => (scale.value = withSpring(1))}
                className="mr-4 mb-2"
            >
                <Animated.View
                    style={animatedStyle}
                    className="flex-row bg-white rounded-2xl p-3 w-72 border-1 shadow-lg"
                >
                    <Image
                        source={item.image}
                        className="w-28 h-28 rounded-xl bg-slate-50"
                        resizeMode="cover"
                    />

                    <View className="ml-3 flex-1 justify-center">
                        <DynamicText
                            fontWeight="bold"
                            fontSize="sm"
                            numberOfLines={1}
                            style={{ color: "#0f172a", marginBottom: 4 }}
                        >
                            {item.title}
                        </DynamicText>

                        <DynamicText
                            fontSize="xs"
                            numberOfLines={1}
                            style={{ color: "#64748b", marginBottom: 4 }}
                        >
                            {item.desc}
                        </DynamicText>

                        <DynamicText
                            fontWeight="bold"
                            fontSize="xs"
                            style={{ color: "#ef4444" }}
                        >
                            Save 20%
                        </DynamicText>
                    </View>
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
};

export default function PromoGameList() {
    const listRef = useRef<FlashList<any>>(null);
    const [isEnd, setIsEnd] = useState(false);
    const router = useRouter();

    const goToEnd = () => {
        listRef.current?.scrollToEnd({ animated: true });
    };

    const goToStart = () => {
        listRef.current?.scrollToIndex({ index: 0, animated: true });
    };

    return (
        <View className="w-full my-2 relative justify-center"><View className="min-h-[100px]">
            <FlashList
                ref={listRef}
                data={promoGames}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
                estimatedItemSize={280}
                onScroll={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    const contentWidth = e.nativeEvent.contentSize.width;
                    const layoutWidth = e.nativeEvent.layoutMeasurement.width;

                    if (contentWidth > 0 && layoutWidth > 0) {
                        const isCloseToEnd = offsetX + layoutWidth >= contentWidth - 20;
                        setIsEnd(isCloseToEnd);
                    }
                }}
                scrollEventThrottle={16}

                renderItem={({ item, index }) => (
                    <AnimatedGameCard
                        item={item}
                        index={index}
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
                    />
                )}
            />
        </View>

            {!isEnd && (
                <TouchableOpacity
                    onPress={goToEnd}
                    activeOpacity={0.8}
                    className="absolute right-2 top-[40%] z-20 bg-rose-600 shadow-md p-1 rounded-full border border-slate-100"
                >
                    <ChevronRight size={18} color="white" />
                </TouchableOpacity>
            )}

            {isEnd && (
                <TouchableOpacity
                    onPress={goToStart}
                    activeOpacity={0.8}
                    className="absolute left-1 top-[40%] z-20 bg-rose-600 shadow-md p-1 rounded-full border border-slate-100"
                >
                    <ChevronLeft size={18} color="white" />
                </TouchableOpacity>
            )}

        </View>
    );
}