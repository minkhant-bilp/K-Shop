import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Animated, { FadeInDown, FadeInUp, ZoomIn, } from "react-native-reanimated";

import DynamicText from "../ui/dynamic-text/dynamic-text";

type Country = "MM" | "TH";

type PackageItem = {
    id: number;
    amount: string;
    price: string;
    image: any;
};

const PACKAGES_BY_COUNTRY: Record<Country, PackageItem[]> = {
    MM: [
        { id: 1, amount: "10 Diamonds", price: "500 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 2, amount: "50 Diamonds", price: "2,500 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 3, amount: "100 Diamonds", price: "5,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 4, amount: "Weekly Pass", price: "4,500 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 5, amount: "300 Diamonds", price: "15,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 6, amount: "500 Diamonds", price: "25,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 7, amount: "Starlight", price: "20,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 8, amount: "Twilight Pass", price: "19,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 9, amount: "1000 Diamonds", price: "50,000 Ks", image: require("@/assets/game_image/diamond.png") },
        { id: 10, amount: "2000 Diamonds", price: "100,000 Ks", image: require("@/assets/game_image/diamond.png") },
    ],
    TH: [
        { id: 101, amount: "50 Diamonds", price: "฿29", image: require("@/assets/game_image/diamond.png") },
        { id: 102, amount: "150 Diamonds", price: "฿79", image: require("@/assets/game_image/diamond.png") },
        { id: 103, amount: "300 Diamonds", price: "฿149", image: require("@/assets/game_image/diamond.png") },
        { id: 104, amount: "Weekly Pass", price: "฿99", image: require("@/assets/game_image/diamond.png") },
        { id: 105, amount: "500 Diamonds", price: "฿249", image: require("@/assets/game_image/diamond.png") },
        { id: 106, amount: "1000 Diamonds", price: "฿499", image: require("@/assets/game_image/diamond.png") },
    ],
};


const ListHeader = () => (
    <View>
        <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.stepContainer}
        >
            <View style={styles.stepTitleRow}>
                <View style={styles.stepNumberBadge}>
                    <DynamicText fontWeight="bold" style={styles.stepNumberText}>1</DynamicText>
                </View>
                <DynamicText fontWeight="bold" style={styles.stepTitleText}>Enter User ID</DynamicText>
            </View>

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="User ID"
                    placeholderTextColor="black"
                    style={[styles.inputBox, { flex: 1, color: "black" }]}
                />
                <TextInput
                    placeholder="Zone ID"
                    placeholderTextColor="black"

                    style={[styles.inputBox, { width: 100, color: "black" }]}
                />
            </View>
        </Animated.View>


        <View style={[styles.stepTitleRow, { paddingHorizontal: 4, marginBottom: 12 }]}>
            <View style={styles.stepNumberBadge}>
                <DynamicText fontWeight="bold" style={styles.stepNumberText}>2</DynamicText>
            </View>
            <DynamicText fontWeight="bold" style={styles.stepTitleText}>Select Recharge</DynamicText>
        </View>
    </View>
);

export default function GameDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams(); const [country, setCountry] = useState<Country>("MM");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const imageSource = params.image ? Number(params.image) : null;
    const packages = PACKAGES_BY_COUNTRY[country];

    const renderItem = ({ item, index }: { item: PackageItem, index: number }) => {
        const isSelected = selectedId === item.id;
        const isOdd = index % 2 !== 0;

        return (
            <Animated.View
                entering={ZoomIn.delay(index * 50)}
                style={{ flex: 1, marginRight: isOdd ? 0 : 10, marginBottom: 12 }}
            >
                <TouchableOpacity
                    onPress={() => setSelectedId(item.id)}
                    activeOpacity={0.7}
                    style={[
                        styles.packageCard,
                        isSelected ? styles.packageCardSelected : styles.packageCardNormal
                    ]}
                >
                    <Image
                        source={item.image}
                        style={styles.packageImage}
                        resizeMode="contain"
                    />
                    <DynamicText fontWeight="bold" style={styles.packageAmount}>{item.amount}</DynamicText>


                    <DynamicText
                        fontWeight="bold"
                        style={StyleSheet.flatten([
                            styles.packagePrice,
                            { color: isSelected ? "#e11d48" : "#64748b" }
                        ])}
                    >
                        {item.price}
                    </DynamicText>

                    {isSelected && (
                        <Animated.View entering={ZoomIn} style={styles.checkMark}>
                            <DynamicText fontWeight="bold" style={styles.checkMarkText}>✓</DynamicText>
                        </Animated.View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.screenContainer}>



            <Animated.View entering={FadeInDown.duration(600)} style={styles.headerContainer}>

                <View style={styles.navRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <DynamicText fontWeight="bold" style={styles.whiteText}>←</DynamicText>
                    </TouchableOpacity>
                    <DynamicText fontWeight="bold" style={styles.headerTitle}>Game Shop</DynamicText>
                </View>


                <View style={styles.gameInfoRow}>
                    <View style={styles.gameImageContainer}>
                        {imageSource ? (
                            <Image source={imageSource} style={styles.gameImage} />
                        ) : (
                            <View style={[styles.gameImage, { backgroundColor: "#334155" }]} />
                        )}
                    </View>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <DynamicText fontWeight="bold" style={styles.gameName}>
                            {params.title || "Mobile Legends"}
                        </DynamicText>
                        <View style={styles.secureBadge}>
                            <View style={styles.greenDot} />
                            <DynamicText style={styles.secureText}>လုံခြုံသော ငွေပေးချေမှုများ</DynamicText>
                        </View>
                    </View>
                </View>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        onPress={() => { setCountry("MM"); setSelectedId(null); }}
                        style={[styles.toggleButton, { backgroundColor: country === "MM" ? "#e11d48" : "transparent" }]}
                    >
                        <DynamicText fontWeight="bold" style={styles.whiteText}>Myanmar 🇲🇲</DynamicText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setCountry("TH"); setSelectedId(null); }}
                        style={[styles.toggleButton, { backgroundColor: country === "TH" ? "#e11d48" : "transparent" }]}
                    >
                        <DynamicText fontWeight="bold" style={styles.whiteText}>Thailand 🇹🇭</DynamicText>
                    </TouchableOpacity>
                </View>
            </Animated.View>


            <FlashList
                data={packages}
                renderItem={renderItem}
                numColumns={2}
                estimatedItemSize={120}
                ListHeaderComponent={ListHeader}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                extraData={selectedId}
            />


            <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.buyButton, { backgroundColor: selectedId ? "#e11d48" : "#cbd5e1" }]}
                    disabled={!selectedId}
                >
                    <DynamicText fontWeight="bold" style={styles.buyButtonText}>Buy Now</DynamicText>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#f1f5f9",
    },

    headerContainer: {
        backgroundColor: "#0f172a",
        paddingTop: 50,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        zIndex: 10,
        elevation: 10,
    },
    navRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 5,
        marginRight: 15,
    },
    whiteText: {
        color: "white",
        top: -3
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
    },
    gameInfoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    gameImageContainer: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: 5,
    },
    gameImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#334155",
    },
    gameName: {
        color: "white",
        fontSize: 20,
        marginBottom: 6,
    },
    secureBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#4ade80",
        marginRight: 6,
    },
    secureText: {
        color: "#cbd5e1",
        fontSize: 12,
    },
    toggleContainer: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 4, borderRadius: 12,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    // Body Styles
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    stepContainer: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 1,
    },
    stepTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    stepNumberBadge: {
        width: 24,
        height: 24,
        backgroundColor: "#e11d48",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    stepNumberText: {
        color: "white",
        fontSize: 12,
    },
    stepTitleText: {
        fontSize: 16,
        color: "#334155",
    },
    inputRow: {
        flexDirection: "row",
        gap: 10,
    },
    inputBox: {
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },

    // Package Card Styles
    packageCard: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        width: '100%',
    },
    packageCardNormal: {
        borderColor: "#f1f5f9",
        backgroundColor: "white",
    },
    packageCardSelected: {
        borderColor: "#e11d48",
        backgroundColor: "#fff1f2",
    },
    packageImage: {
        width: 45,
        height: 45,
        marginBottom: 8,
    },
    packageAmount: {
        fontSize: 14,
        color: "#0f172a",
        textAlign: "center",
    },
    packagePrice: {
        fontSize: 13,
        marginTop: 4,
    },
    checkMark: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#e11d48",
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    checkMarkText: {
        color: "white",
        fontSize: 10,
    },

    // Footer Styles
    footerContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        padding: 16,
        elevation: 20,
    },
    buyButton: {
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
    },
    buyButtonText: {
        color: "white",
        fontSize: 18,
    },
});