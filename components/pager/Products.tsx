import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";
import StarButton from "./StarButton";

// ... Data နှင့် Type များ ...
type Game = {
    id: string;
    title: string;
    image: any;
};

const GAME_LIST: Game[] = [
    { id: "1", title: "Mobile Legend Bang Bang", image: require("@/assets/game_image/photo1.png") },
    { id: "2", title: "Weekly Pass", image: require("@/assets/game_image/photo2.png") },
    { id: "3", title: "Pubg Mobile", image: require("@/assets/game_image/photo3.png") },
    { id: "4", title: "FC Mobile", image: require("@/assets/game_image/photo4.png") },
    { id: "5", title: "Free Fire", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Destiny", image: require("@/assets/game_image/photo6.png") },
    { id: "7", title: "Woolf Ware", image: require("@/assets/game_image/photo7.png") },
    { id: "8", title: "Solider Game", image: require("@/assets/game_image/photo8.png") },
    { id: "9", title: "Minecarft", image: require("@/assets/game_image/photo9.png") },
    { id: "10", title: "coc", image: require("@/assets/game_image/photo10.png") },
];

// 🔥 Log ဖျက်ပြီးသား Button 🔥
const HeartbeatButton = ({ item }: { item: Game }) => {
    const router = useRouter();
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleValue, { toValue: 1.05, duration: 800, useNativeDriver: true }),
                Animated.timing(scaleValue, { toValue: 1, duration: 800, useNativeDriver: true })
            ])
        ).start();
    }, []);

    const handlePress = () => {
        // Console Log မရှိတော့ပါ
        router.push({
            pathname: "/home/products",
            params: {
                id: item.id,
                title: item.title,
                image: item.image
            }
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={{ width: '100%', zIndex: 50, elevation: 5 }}
        >
            <Animated.View
                style={{ transform: [{ scale: scaleValue }] }}
                className="bg-rose-700 py-3 rounded-xl items-center justify-center shadow-md"
            >
                <DynamicText fontWeight="bold" style={{ color: "white" }}>Buy Now</DynamicText>
            </Animated.View>
        </TouchableOpacity>
    );
};

const Products: React.FC = () => {
    const { width } = useWindowDimensions();
    const numColumns = width > 600 ? 4 : 2;
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});

    const toggleFavorite = (id: string) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <View className="flex-1 bg-gray-50 px-4 pt-2">
            <FlashList<Game>
                data={GAME_LIST}
                extraData={favorites}
                numColumns={numColumns}
                estimatedItemSize={250}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

                renderItem={({ item, index }) => {
                    const isLastColumn = (index + 1) % numColumns === 0;
                    return (
                        <View
                            // Backticks (``) ပြန်ထည့်ပေးထားပါတယ်
                            className={`flex-1 mb-4 ${isLastColumn ? "mr-0" : "mr-3"} bg-white rounded-2xl p-3 shadow-sm border border-slate-200 relative`}>
                            <View className="relative w-full z-10">
                                <Image source={item.image} className="w-full h-36 rounded-xl" resizeMode="cover" />
                                <StarButton isActive={!!favorites[item.id]} onToggle={() => toggleFavorite(item.id)} />
                            </View>

                            <View className="mt-3 mb-2">
                                <DynamicText fontWeight="bold" fontSize="sm" numberOfLines={1} style={{ color: "#0f172a" }}>
                                    {item.title}
                                </DynamicText>
                            </View>

                            <HeartbeatButton item={item} />
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default Products;