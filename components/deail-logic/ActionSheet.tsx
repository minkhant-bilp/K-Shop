import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, SlideInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DynamicText from "../ui/dynamic-text/dynamic-text";

import { useWalletStore } from "@/store/useWalletStore";
import useTranslation from "@/structure/hooks/useTranslation";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

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
    const insets = useSafeAreaInsets();


    const { t } = useTranslation();

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
                style={[
                    styles.sheetContainer,
                    isTablet && styles.sheetContainerTablet,
                    { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 40 }
                ]}
            >
                <View style={[styles.sheetHandle, isTablet && { width: 60, height: 6, marginBottom: 30 }]} />

                <View style={styles.sheetContent}>
                    <Text className="font-bold" style={[styles.sheetTitle, isTablet && { fontSize: 28, marginBottom: 30 }]}>
                        {t.checkout || "Checkout"}
                    </Text>

                    <View style={[styles.productCard, isTablet && { padding: 20, marginBottom: 30, borderRadius: 20 }]}>
                        <Image
                            source={item.image}
                            style={[styles.sheetImage, isTablet && { width: 80, height: 80, marginRight: 20 }]}
                            resizeMode="contain"
                        />
                        <View style={styles.productInfo}>
                            <Text style={[styles.label, isTablet && { fontSize: 16, marginBottom: 5 }]}>
                                {t.packageLabel || "Package"}
                            </Text>
                            <Text className="font-bold" style={[styles.itemName, isTablet && { fontSize: 24 }]}>{item.amount}</Text>
                        </View>
                        <Text className="font-bold" style={[styles.itemPrice, isTablet && { fontSize: 24 }]}>{item.price}</Text>
                    </View>

                    {/* User Info */}
                    <View style={[styles.infoRow, isTablet && { marginBottom: 25 }]}>
                        <Text style={[styles.infoLabel, isTablet && { fontSize: 18 }]}>
                            {t.userIdLabel || "User ID:"}
                        </Text>
                        <Text className="font-bold" style={[styles.infoValue, isTablet && { fontSize: 18 }]}>{userId} ({zoneId})</Text>
                    </View>

                    <View style={[styles.divider, isTablet && { marginBottom: 25 }]} />

                    {/* Wallet Section */}
                    <View style={[styles.walletSection, isTablet && { marginBottom: 40 }]}>
                        <View style={[styles.walletRow, isTablet && { marginBottom: 10 }]}>
                            <View style={[styles.walletLabelGroup, isTablet && { gap: 10 }]}>
                                <Ionicons name="wallet-outline" size={isTablet ? 28 : 18} color="#64748b" />
                                <Text style={[styles.walletLabel, isTablet && { fontSize: 18 }]}>
                                    {t.yourBalance || "Your Balance:"}
                                </Text>
                            </View>

                            <DynamicText
                                fontWeight="bold"
                                style={StyleSheet.flatten([
                                    styles.walletValue,
                                    isTablet && { fontSize: 22 },
                                    { color: isSufficient ? "#10b981" : "#ef4444" }
                                ])}
                            >
                                {currentBalance.toLocaleString()} {currencySymbol}
                            </DynamicText>
                        </View>

                        {!isSufficient && (
                            <View style={[styles.errorContainer, isTablet && { padding: 12, marginTop: 10 }]}>
                                <Ionicons name="alert-circle" size={isTablet ? 20 : 14} color="#ef4444" />
                                <Text style={[styles.errorText, isTablet && { fontSize: 16 }]}>
                                    {t.insufficientBalanceDesc || "ငွေပမာဏ မလုံလောက်ပါ။ ကျေးဇူးပြု၍ ငွေဖြည့်ပါ။"}
                                </Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.sheetConfirmBtn,
                            isTablet && { paddingVertical: 20, borderRadius: 20 },
                            !isSufficient && styles.disabledBtn
                        ]}
                        activeOpacity={0.8}
                        onPress={onSubmit}
                        disabled={!isSufficient}
                    >
                        <Text className="font-bold" style={[styles.sheetConfirmText, isTablet && { fontSize: 20 }]}>
                            {isSufficient
                                ? (t.confirmPayment || "Confirm Payment")
                                : (t.insufficientBalance || "Insufficient Balance")
                            }
                        </Text>
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
        elevation: 50,
        zIndex: 999
    },
    sheetContainerTablet: {
        width: '60%',
        maxWidth: 600,
        alignSelf: 'center',
        bottom: 20,
        borderRadius: 28,
        left: 'auto',
        right: 'auto',
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
        elevation: 2,
        marginBottom: 10
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