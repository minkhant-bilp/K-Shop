import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

type Game = {
    id: string;
    title: string;
    image: any;
};

const GAME_LIST: Game[] = [
    { id: "1", title: "Mobile Legend", image: require("@/assets/game_image/photo1.png") },
    { id: "2", title: "Weekly Pass", image: require("@/assets/game_image/photo2.png") },
    { id: "3", title: "Pubg Mobile", image: require("@/assets/game_image/photo3.png") },
    { id: "4", title: "FC Mobile", image: require("@/assets/game_image/photo4.png") },
    { id: "5", title: "Free Fire", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Destiny", image: require("@/assets/game_image/photo6.png") },
    { id: "7", title: "Woolf Ware", image: require("@/assets/game_image/photo7.png") },
    { id: "8", title: "Solider Game", image: require("@/assets/game_image/photo8.png") },
    { id: "9", title: "Minecraft", image: require("@/assets/game_image/photo9.png") },
    { id: "10", title: "COC", image: require("@/assets/game_image/photo10.png") },
];

const AnimatedProductCard = ({ item, index, onPress }: { item: Game, index: number, onPress: () => void }) => {
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
            >
                <Animated.View
                    style={animatedStyle}
                    className="w-36 mr-4 bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100"
                >
                    <Image
                        source={item.image}
                        className="w-full h-28 rounded-xl bg-slate-50"
                        resizeMode="cover"
                    />
                    <View className="mt-2.5 items-center">
                        <DynamicText
                            fontWeight="bold"
                            fontSize="xs"
                            numberOfLines={1}
                            style={{ color: "#334155" }}
                        >
                            {item.title}
                        </DynamicText>
                    </View>
                </Animated.View>
            </Pressable>
        </Animated.View>
    );
};

export default function Products() {
    const listRef = useRef<FlashList<Game>>(null);
    const [isEnd, setIsEnd] = useState(false);
    const router = useRouter();

    const goToEnd = () => {
        listRef.current?.scrollToEnd({ animated: true });
    };

    const goToStart = () => {
        listRef.current?.scrollToIndex({ index: 0, animated: true });
    };

    return (
        <View className="relative w-full min-h-[180px] justify-center my-2">

            <FlashList<Game>
                ref={listRef}
                data={GAME_LIST}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
                estimatedItemSize={140}
                onScroll={(e) => {
                    const offsetX = e.nativeEvent.contentOffset.x;
                    const contentWidth = e.nativeEvent.contentSize.width;
                    const layoutWidth = e.nativeEvent.layoutMeasurement.width; if (contentWidth > 0 && layoutWidth > 0) {
                        setIsEnd(offsetX + layoutWidth >= contentWidth - 10);
                    }
                }}
                scrollEventThrottle={16}

                renderItem={({ item, index }) => (
                    <AnimatedProductCard
                        item={item}
                        index={index}
                        onPress={() => {
                            router.push({
                                pathname: "/home/products",
                                params: {
                                    id: item.id,
                                    title: item.title,
                                    image: item.image,
                                }
                            });
                        }}
                    />
                )}
            />

            {!isEnd && (
                <TouchableOpacity
                    onPress={goToEnd}
                    className="absolute right-2 top-[40%] z-10 bg-rose-600 p-1.5 rounded-full shadow-md border border-slate-100"
                >
                    <ChevronRight size={20} color="white" />
                </TouchableOpacity>
            )}

            {isEnd && (
                <TouchableOpacity
                    onPress={goToStart}
                    className="absolute left-2 top-[40%] z-10 bg-rose-600 p-1.5 rounded-full shadow-md border border-slate-100"
                >
                    <ChevronLeft size={20} color="white" />
                </TouchableOpacity>
            )}

        </View>
    );
}