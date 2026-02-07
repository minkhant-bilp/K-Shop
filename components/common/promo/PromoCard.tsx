import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";


export interface PromoData {
    id: string;
    title: string;
    description: string;
    discount: string;
    validUntil: string;
    image: any;
    tag: "Hot" | "New" | "Limited";
}

interface PromoProps {
    item: PromoData;
    index: number;
    onPress: () => void;
}

const PromoCard = ({ item, index, onPress }: PromoProps) => {

    const getTagColor = (tag: string) => {
        switch (tag) {
            case 'Hot': return '#ef4444';
            case 'New': return '#3b82f6';
            default: return '#f59e0b';
        }
    };

    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100).duration(600)}
            style={styles.wrapper}
        >
            <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.cardContainer}>

                <ImageBackground source={item.image} style={styles.bgImage} imageStyle={{ borderRadius: 16 }}>

                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
                        style={styles.gradient}
                    >
                        <View style={[styles.tagBadge, { backgroundColor: getTagColor(item.tag) }]}>
                            <DynamicText fontWeight="bold" style={styles.tagText}>{item.tag}</DynamicText>
                        </View>

                        <View style={styles.content}>
                            <DynamicText fontWeight="bold" style={styles.discountText}>{item.discount}</DynamicText>
                            <DynamicText fontWeight="bold" style={styles.title} numberOfLines={1}>{item.title}</DynamicText>
                            <DynamicText style={styles.description} numberOfLines={2}>{item.description}</DynamicText>

                            <View style={styles.footer}>
                                <View style={styles.dateBox}>
                                    <Ionicons name="time-outline" size={14} color="#cbd5e1" />
                                    <DynamicText style={styles.dateText}>Until {item.validUntil}</DynamicText>
                                </View>

                                <View style={styles.claimBtn}>
                                    <DynamicText fontWeight="bold" style={styles.claimText}>Check Now</DynamicText>
                                    <Ionicons name="arrow-forward" size={16} color="#dc2626" />
                                </View>
                            </View>
                        </View>

                    </LinearGradient>
                </ImageBackground>

            </TouchableOpacity>
        </Animated.View>
    );
};

export default PromoCard;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        marginHorizontal: 20,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    cardContainer: {
        height: 220,
        borderRadius: 16,
        backgroundColor: "#1e293b",
    },
    bgImage: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    gradient: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        borderRadius: 16,
        padding: 16
    },


    tagBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    tagText: {
        color: "white",
        fontSize: 12,
        textTransform: "uppercase"
    },

    content: {
        gap: 4
    },
    discountText: {
        fontSize: 28,
        color: "#fca5a5",
        marginBottom: 4
    },
    title: {
        fontSize: 18,
        color: "white",
    },
    description: {
        fontSize: 13,
        color: "#cbd5e1",
        marginBottom: 10
    },


    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255,255,255,0.1)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8
    },
    dateText: {
        color: "#cbd5e1",
        fontSize: 12
    },
    claimBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6
    },
    claimText: {
        color: "#dc2626",
        fontSize: 12
    }
});