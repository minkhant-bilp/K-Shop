import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import DynamicText from "../ui/dynamic-text/dynamic-text";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

type Game = {
    id: string;
    title: string;
    image: any;
};

const GAME_LIST: Game[] = [
    { id: "1", title: "Mobile Legend", image: require("@/assets/game_image/photo1.png") },
    { id: "2", title: "Weekly Pass", image: require("@/assets/game_image/photo2.png") },
    { id: "3", title: "PUBG Mobile", image: require("@/assets/game_image/photo3.png") },
    { id: "4", title: "FC Mobile", image: require("@/assets/game_image/photo4.png") },
    { id: "5", title: "Free Fire", image: require("@/assets/game_image/photo5.png") },
    { id: "6", title: "Destiny", image: require("@/assets/game_image/photo6.png") },
    { id: "7", title: "Wolf Ware", image: require("@/assets/game_image/photo7.png") },
    { id: "8", title: "Soldier Game", image: require("@/assets/game_image/photo8.png") },
    { id: "9", title: "Minecraft", image: require("@/assets/game_image/photo9.png") },
    { id: "10", title: "COC", image: require("@/assets/game_image/photo10.png") },
];

const GameCardComponent = ({
    item,
    isLastColumn,
    onPress
}: {
    item: Game,
    isLastColumn: boolean,
    onPress: () => void
}) => {
    return (
        <View
            className={`flex-1 mb-4  ${isLastColumn ? "mr-0" : "mr-3"} bg-white rounded-2xl ${isTablet ? 'p-4' : 'p-2.5'}`}
            style={{
                shadowColor: "#E11D48",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
                borderWidth: 1,
                borderColor: "#f1f5f9"
            }}
        >
            <View className="w-full shadow-sm top-[-20px] ">
                <Image
                    source={item.image}
                    className={`w-full ${isTablet ? 'h-52' : 'h-36'} rounded-xl bg-slate-100`}
                    resizeMode="cover"
                />
            </View>

            <View className={`${isTablet ? 'mt-4 mb-4' : 'mt-3 mb-3'} px-1`}>
                <DynamicText
                    fontWeight="bold"
                    fontSize={isTablet ? "lg" : "sm"}
                    numberOfLines={1}
                    style={{ color: "#0f172a" }}
                >
                    {item.title}
                </DynamicText>
            </View>

            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={["#E11D48", "#be123c"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                        paddingVertical: isTablet ? 14 : 10,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <DynamicText
                        fontWeight="bold"
                        fontSize={isTablet ? "sm" : "xs"}
                        style={{ color: "white", letterSpacing: 0.5 }}
                    >
                        BUY NOW
                    </DynamicText>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const Products: React.FC = () => {
    const router = useRouter();

    const numColumns = isTablet ? 3 : 2;

    const handlePressProduct = (item: Game) => {
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
        <View className={`flex-1 bg-white ${isTablet ? 'px-8 pt-4' : 'px-4 pt-2'}`}>
            <FlashList
                data={GAME_LIST}
                numColumns={numColumns}
                key={isTablet ? 'tablet-3-cols' : 'mobile-2-cols'}
                estimatedItemSize={260}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}

                renderItem={({ item, index }) => {
                    const isLastColumn = (index + 1) % numColumns === 0;
                    return (
                        <GameCardComponent
                            item={item}
                            isLastColumn={isLastColumn}
                            onPress={() => handlePressProduct(item)}
                        />
                    );
                }}
            />
        </View>
    );
};

export default Products;