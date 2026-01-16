import { useWalletStore } from "@/store/useWalletStore";
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Platform, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp, LinearTransition } from "react-native-reanimated";
import DynamicText from '../ui/dynamic-text/dynamic-text';

import ActionSheet from '../deail-logic/ActionSheet';
import ListHeader from '../deail-logic/ListHeader';
import SuccessModal from '../deail-logic/SuccesModal';

type Country = "MM" | "TH";
type PackageItem = { id: number; amount: string; price: string; image: any; };

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

export default function GameDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const { mmBalance, thBalance, selectedCountry, setCountry, buyPackage } = useWalletStore();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [userId, setUserId] = useState("");
    const [zoneId, setZoneId] = useState("");

    const [showPurchaseSheet, setShowPurchaseSheet] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const imageSource = params.image ? Number(params.image) : null;
    const packages = PACKAGES_BY_COUNTRY[selectedCountry];
    const selectedPackage = packages.find(p => p.id === selectedId);

    const handleBuyNow = () => {
        if (!userId.trim() || !zoneId.trim()) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("ကျေးဇူးပြု၍ User ID နှင့် Zone ID ဖြည့်ပေးပါ!", ToastAndroid.SHORT);
            } else {
                Alert.alert("သတိပေးချက်", "ကျေးဇူးပြု၍ User ID နှင့် Zone ID ဖြည့်ပေးပါ!");
            }
            return;
        }
        setShowPurchaseSheet(true);
    };

    const handleConfirmPurchase = () => {
        if (selectedPackage) {
            const price = parseInt(selectedPackage.price.replace(/[^0-9]/g, ''), 10);
            buyPackage(price, selectedCountry, selectedPackage.amount);
        }

        setShowPurchaseSheet(false);

        setShowSuccessModal(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccessModal(false);
    };

    const renderItem = ({ item, index }: { item: PackageItem, index: number }) => {
        const isSelected = selectedId === item.id;
        const isOdd = index % 2 !== 0;
        return (
            <Animated.View layout={LinearTransition.duration(300)} entering={FadeInUp.delay(index * 50).duration(500)} style={isOdd ? styles.gridItemRight : styles.gridItemLeft}>
                <TouchableOpacity onPress={() => setSelectedId(item.id)} activeOpacity={0.7} style={isSelected ? styles.cardSelected : styles.cardNormal}>
                    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
                    <DynamicText fontWeight="bold" style={styles.cardAmount}>{item.amount}</DynamicText>
                    <DynamicText fontWeight="bold" style={isSelected ? styles.cardPriceSelected : styles.cardPriceNormal}>{item.price}</DynamicText>
                    {isSelected && <Animated.View entering={FadeIn.duration(300)} style={styles.checkMark}><DynamicText fontWeight="bold" style={styles.checkMarkText}>✓</DynamicText></Animated.View>}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.screenContainer}>
            <Animated.View entering={FadeIn.duration(700)} style={styles.headerContainer}>

                <View style={styles.navRow}>
                    <View style={styles.leftNavGroup}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <DynamicText fontWeight="bold" style={styles.whiteText}>←</DynamicText>
                        </TouchableOpacity>
                        <DynamicText fontWeight="bold" style={styles.headerTitle}>Game Shop</DynamicText>
                    </View>

                    <View style={styles.balanceBadge}>
                        <Ionicons name="wallet" size={16} color="#FFD700" style={{ marginRight: 6 }} />
                        <DynamicText fontWeight="bold" style={styles.balanceText}>
                            {selectedCountry === "MM"
                                ? `${mmBalance.toLocaleString()} Ks`
                                : `${thBalance.toLocaleString()} ฿`}
                        </DynamicText>
                    </View>
                </View>

                <View style={styles.gameInfoRow}>
                    <View style={styles.gameImageWrapper}>{imageSource ? <Image source={imageSource} style={styles.gameImage} /> : <View style={styles.gameImagePlaceholder} />}</View>
                    <View style={styles.gameInfoTextWrapper}>
                        <DynamicText fontWeight="bold" style={styles.gameName}>{params.title || "Mobile Legends"}</DynamicText>
                        <View style={styles.secureBadge}><View style={styles.greenDot} /><DynamicText style={styles.secureText}>လုံခြုံသော ငွေပေးချေမှုများ</DynamicText></View>
                    </View>
                </View>

                <View style={styles.toggleRow}>
                    <TouchableOpacity
                        onPress={() => { setCountry("MM"); setSelectedId(null); }}
                        style={selectedCountry === "MM" ? styles.toggleButtonActive : styles.toggleButtonInactive}
                    >
                        <DynamicText fontWeight="bold" style={styles.whiteText}>Myanmar 🇲🇲</DynamicText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setCountry("TH"); setSelectedId(null); }}
                        style={selectedCountry === "TH" ? styles.toggleButtonActive : styles.toggleButtonInactive}
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
                ListHeaderComponent={<ListHeader userId={userId} setUserId={setUserId} zoneId={zoneId} setZoneId={setZoneId} />}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                extraData={selectedId}
            />

            {!showPurchaseSheet && !showSuccessModal && (
                <Animated.View entering={FadeInUp.duration(500)} exiting={FadeInDown.duration(300)} style={styles.footerContainer}>
                    <TouchableOpacity style={selectedId ? styles.buyButtonActive : styles.buyButtonInactive} disabled={!selectedId} onPress={handleBuyNow}>
                        <Ionicons name="cart-outline" size={24} color="white" style={styles.cartIcon} />
                        <DynamicText fontWeight="bold" style={styles.buyButtonText}>Buy Now</DynamicText>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <ActionSheet
                visible={showPurchaseSheet}
                onClose={() => setShowPurchaseSheet(false)}
                onSubmit={handleConfirmPurchase}
                item={selectedPackage}
                userId={userId}
                zoneId={zoneId}
            />

            <SuccessModal
                visible={showSuccessModal}
                onClose={handleCloseSuccess}
                item={selectedPackage}
                payment={undefined}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "#f1f5f9"
    },
    listContent: {
        padding: 16,
        paddingBottom: 100
    },
    headerContainer: {
        backgroundColor: "#0f172a",
        paddingTop: 50,
        paddingBottom: 25,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        zIndex: 10,
        elevation: 10
    },
    navRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    leftNavGroup: {
        flexDirection: "row",
        alignItems: "center"
    },
    backButton: {
        padding: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 5,
        marginRight: 15
    },
    whiteText: {
        color: "white",
        top: -3
    },
    headerTitle: {
        color: "white",
        fontSize: 18
    },
    balanceBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)"
    },
    balanceText: {
        color: "#FFD700",
        fontSize: 14
    },
    gameInfoRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    gameImageWrapper: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: 5
    },
    gameImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#334155"
    },
    gameImagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: "#334155"
    },
    gameInfoTextWrapper: {
        marginLeft: 16,
        flex: 1
    },
    gameName: {
        color: "white",
        fontSize: 20,
        marginBottom: 6
    },
    secureBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#4ade80",
        marginRight: 6
    },
    secureText: {
        color: "#cbd5e1",
        fontSize: 12
    },
    toggleRow: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 4,
        borderRadius: 12
    },
    toggleButtonActive: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#e11d48"
    },
    toggleButtonInactive: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "transparent"
    },
    gridItemLeft: {
        flex: 1,
        marginRight: 10,
        marginBottom: 12
    },
    gridItemRight: {
        flex: 1,
        marginRight: 0,
        marginBottom: 12
    },
    cardNormal: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderColor: "#f1f5f9",
        backgroundColor: "white"
    },
    cardSelected: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 16,
        borderWidth: 2,
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderColor: "#e11d48",
        backgroundColor: "#fff1f2"
    },
    cardImage: {
        width: 45,
        height: 45,
        marginBottom: 8
    },
    cardAmount: {
        fontSize: 14,
        color: "#0f172a",
        textAlign: "center"
    },
    cardPriceNormal: {
        fontSize: 13,
        marginTop: 4,
        color: "#64748b"
    },
    cardPriceSelected: {
        fontSize: 13,
        marginTop: 4,
        color: "#e11d48"
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
        justifyContent: "center"
    },
    checkMarkText: {
        color: "white",
        fontSize: 10
    },
    footerContainer: {
        position: "absolute",
        bottom: 40, alignSelf: "center",
        backgroundColor: "transparent",
        elevation: 0,
        zIndex: 20
    },
    buyButtonActive: {
        flexDirection: "row",
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#e11d48",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: "#e11d48"
    },
    buyButtonInactive: {
        flexDirection: "row",
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#e11d48",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: "#cbd5e1"
    },
    buyButtonText: {
        color: "white",
        fontSize: 18,
        letterSpacing: 0.5
    },
    cartIcon: {
        marginRight: 8
    },
});