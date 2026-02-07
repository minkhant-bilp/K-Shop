import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import DynamicText from "../ui/dynamic-text/dynamic-text";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width / 2) - 24;

export interface PcGameData {
    id: string;
    title: string;
    price: string;
    platform: "Steam" | "Epic" | "Battle.net";
    image: any;
    genre: string;
}

interface Props {
    item: PcGameData;
    index: number;
    onPress: () => void;
}

const PcGameCard = ({ item, index, onPress }: Props) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).duration(500)}
            style={styles.container}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.card}
            >
                <Image source={item.image} style={styles.image} resizeMode="cover" />

                <View style={styles.badge}>
                    <Ionicons name="game-controller" size={12} color="white" />
                    <DynamicText style={styles.badgeText}>{item.platform}</DynamicText>
                </View>

                <View style={styles.info}>
                    <DynamicText fontWeight="bold" numberOfLines={1} style={styles.title}>
                        {item.title}
                    </DynamicText>

                    <DynamicText style={styles.genre}>{item.genre}</DynamicText>

                    <View style={styles.priceRow}>
                        <DynamicText fontWeight="bold" style={styles.price}>
                            {item.price}
                        </DynamicText>
                        <View style={styles.buyBtn}>
                            <Ionicons name="add" size={16} color="white" />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};


export default PcGameCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        marginHorizontal: 8,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#f1f5f9"
    },
    image: {
        width: "100%",
        height: 180,
    },
    badge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    badgeText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold"
    },
    info: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        color: "#0f172a",
        marginBottom: 4,
    },
    genre: {
        fontSize: 12,
        color: "#64748b",
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    price: {
        fontSize: 16,
        color: "#E11D48",
    },
    buyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center"
    }
});