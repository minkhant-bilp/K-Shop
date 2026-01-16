import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { Easing, SlideInDown } from "react-native-reanimated";
import DynamicText from "../ui/dynamic-text/dynamic-text";

import { useWalletStore } from "@/store/useWalletStore";

type PackageItem = { id: number; amount: string; price: string; image: any; };

type PurchaseActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    item: PackageItem | undefined;
    userId: string;
    zoneId: string;
};

export default function ActionSheet({ visible, onClose, onSubmit, item, userId, zoneId }: PurchaseActionSheetProps) {

    const { mmBalance, thBalance, selectedCountry } = useWalletStore();

    if (!item) return null;

    const getNumericPrice = (priceString: string) => {
        return parseInt(priceString.replace(/[^0-9]/g, ''), 10);
    };

    const packagePrice = getNumericPrice(item.price);

    const currentBalance = selectedCountry === "MM" ? mmBalance : thBalance;
    const currencySymbol = selectedCountry === "MM" ? "Ks" : "฿";

    const isSufficient = currentBalance >= packagePrice;

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose} />

            <Animated.View
                entering={SlideInDown.duration(300).easing(Easing.out(Easing.quad))}
                style={styles.sheetContainer}
            >
                <View style={styles.sheetHandle} />

                <View style={styles.sheetContent}>
                    <DynamicText fontWeight="bold" style={styles.sheetTitle}>Checkout</DynamicText>

                    {/* Product Info */}
                    <View style={styles.productCard}>
                        <Image source={item.image} style={styles.sheetImage} resizeMode="contain" />
                        <View style={styles.productInfo}>
                            <DynamicText style={styles.label}>Package</DynamicText>
                            <DynamicText fontWeight="bold" style={styles.itemName}>{item.amount}</DynamicText>
                        </View>
                        <DynamicText fontWeight="bold" style={styles.itemPrice}>{item.price}</DynamicText>
                    </View>

                    {/* User ID */}
                    <View style={styles.infoRow}>
                        <DynamicText style={styles.infoLabel}>User ID:</DynamicText>
                        <DynamicText fontWeight="bold" style={styles.infoValue}>{userId} ({zoneId})</DynamicText>
                    </View>

                    <View style={styles.divider} />

                    {/* Wallet Check Section */}
                    <View style={styles.walletSection}>
                        <View style={styles.walletRow}>
                            <View style={styles.walletLabelGroup}>
                                <Ionicons name="wallet-outline" size={18} color="#64748b" />
                                <DynamicText style={styles.walletLabel}>Your Balance:</DynamicText>
                            </View>

                            <DynamicText
                                fontWeight="bold"
                                style={StyleSheet.flatten([
                                    styles.walletValue,
                                    { color: isSufficient ? "#10b981" : "#ef4444" }
                                ])}
                            >
                                {currentBalance.toLocaleString()} {currencySymbol}
                            </DynamicText>
                        </View>

                        {!isSufficient && (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={14} color="#ef4444" />
                                <DynamicText style={styles.errorText}>
                                    ငွေပမာဏ မလုံလောက်ပါ။ ကျေးဇူးပြု၍ ငွေဖြည့်ပါ။
                                </DynamicText>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[styles.sheetConfirmBtn, !isSufficient && styles.disabledBtn]}
                        activeOpacity={0.8}
                        onPress={onSubmit}
                        disabled={!isSufficient}
                    >
                        <DynamicText fontWeight="bold" style={styles.sheetConfirmText}>
                            {isSufficient ? "Confirm Payment" : "Insufficient Balance"}
                        </DynamicText>
                    </TouchableOpacity>

                </View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    sheetContainer: {

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 40,
        elevation: 50,
        zIndex: 999
    },
    sheetHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#cbd5e1',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20
    },
    sheetContent: {
        width: '100%'
    },
    sheetTitle: {
        fontSize: 20,
        color: '#0f172a',
        marginBottom: 20,
        textAlign: "center"
    },

    productCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        padding: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e2e8f0"
    },
    sheetImage: {
        width: 45,
        height: 45,
        marginRight: 12
    },
    productInfo: {
        flex: 1
    },
    label: {
        fontSize: 11,
        color: "#64748b",
        marginBottom: 2
    },
    itemName: {
        fontSize: 16,
        color: '#0f172a'
    },
    itemPrice: {
        fontSize: 16,
        color: "#e11d48"
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16
    },
    infoLabel: {
        fontSize: 14,
        color: "#64748b"
    },
    infoValue: {
        fontSize: 14,
        color: "#334155"
    },
    divider: {
        height: 1,
        backgroundColor: "#e2e8f0",
        width: "100%",
        marginBottom: 16
    },

    walletSection: {
        marginBottom: 24
    },
    walletRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    walletLabelGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    walletLabel: {
        fontSize: 14,
        color: "#64748b"
    },
    walletValue: {
        fontSize: 16
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 6,
        backgroundColor: "#fef2f2",
        padding: 8,
        borderRadius: 8
    },
    errorText: {
        fontSize: 12,
        color: "#ef4444"
    },

    sheetConfirmBtn: {
        width: '100%',
        backgroundColor: '#e11d48',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2
    },
    disabledBtn: {
        backgroundColor: '#94a3b8',
        elevation: 0
    },
    sheetConfirmText: {
        color: 'white',
        fontSize: 16
    }
});