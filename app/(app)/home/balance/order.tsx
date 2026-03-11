import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import * as Clipboard from 'expo-clipboard';
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Dimensions, Image, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";

import { useWalletStore } from "@/store/useWalletStore";
// 🔥 Translation Hook ကို Import လုပ်ထားပါသည်
import useTranslation from "@/structure/hooks/useTranslation"; // လမ်းကြောင်းမှန်ကန်မှုရှိမရှိ စစ်ဆေးပါ

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const COLORS = {
    primary: "#E11D48",
    bg: "#F8FAFC",
    card: "#FFFFFF",
    textDark: "#1E293B",
    textGray: "#64748B",
    success: "#10B981",
    pending: "#F59E0B",
    failed: "#EF4444",
    border: "#E2E8F0",
    successBg: "#ECFDF5",
    pendingBg: "#FFFBEB",
    failedBg: "#FEF2F2",
    iconBg: "#F1F5F9"
};

const Order = () => {
    const router = useRouter();
    const { t } = useTranslation(); // 🔥 Translation ခေါ်ယူထားပါသည်

    const transactions = useWalletStore((state) => state.transactions);
    const orderList = transactions.filter((t) => t.type === 'purchase');

    const numColumns = isTablet ? 2 : 1;

    const handleCopyID = async (id: string) => {
        await Clipboard.setStringAsync(id);
        if (Platform.OS === 'android') {
            ToastAndroid.show(t.transactionIdCopied || "Transaction ID Copied!", ToastAndroid.SHORT);
        } else {
            Alert.alert(t.copied || "Copied", t.transactionIdCopiedDesc || "Transaction ID copied to clipboard.");
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case "success": return { bg: COLORS.successBg, text: COLORS.success, icon: "checkmark-circle" };
            case "pending": return { bg: COLORS.pendingBg, text: COLORS.pending, icon: "time" };
            case "failed": return { bg: COLORS.failedBg, text: COLORS.failed, icon: "close-circle" };
            default: return { bg: COLORS.iconBg, text: COLORS.textGray, icon: "help-circle" };
        }
    };

    const getTranslatedStatus = (status: string) => {
        const s = status ? status.toLowerCase() : "pending";
        switch (s) {
            case "success": return t.statusSuccesss || "Success";
            case "pending": return t.statusPendings || "Pending";
            case "failed": return t.statusFaileds || "Failed";
            default: return t.statusPending || "Pending";
        }
    };

    const EmptyState = () => (
        <View style={styles.emptyWrapper}>
            <View style={[styles.emptyIconCircle, isTablet && { width: 120, height: 120, borderRadius: 60 }]}>
                <Ionicons name="receipt-outline" size={isTablet ? 60 : 40} color={COLORS.primary} />
            </View>
            <Text style={[styles.emptyTitle, isTablet && { fontSize: 24 }]}>{t.noOrdersYet || "No Orders Yet"}</Text>
            <Text style={[styles.emptySub, isTablet && { fontSize: 18 }]}>{t.noPurchasesYet || "You haven't made any purchases yet."}</Text>

            <TouchableOpacity
                style={[styles.actionBtn, isTablet && { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 20 }]}
                activeOpacity={0.8}
                onPress={() => router.navigate("/(app)/home/popular")}
            >
                <Text style={[styles.actionBtnText, isTablet && { fontSize: 18 }]}>{t.startShopping || "Start Shopping"}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const statusStyle = getStatusStyles(item.status);
        const translatedStatus = getTranslatedStatus(item.status);
        const priceDisplay = `${item.amount.toLocaleString()} ${item.currency}`;
        const imageSource = item.image ? item.image : null;

        return (
            <View
                style={[
                    styles.card,
                    isTablet && styles.cardTablet,
                    isTablet && { marginRight: index % 2 === 0 ? 15 : 0 }
                ]}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, isTablet && { width: 64, height: 64, borderRadius: 18 }]}>
                        {imageSource ? (
                            <Image source={imageSource} style={styles.itemImage} resizeMode="contain" />
                        ) : (
                            <Ionicons name="game-controller" size={isTablet ? 32 : 24} color={COLORS.primary} />
                        )}
                    </View>

                    <View style={styles.textContainer}>
                        <TouchableOpacity
                            style={styles.idRow}
                            activeOpacity={0.6}
                            onPress={() => handleCopyID(item.transactionId || "N/A")}
                        >
                            <Text style={[styles.transIdLabel, isTablet && { fontSize: 14 }]}>ID:</Text>
                            <Text style={[styles.transIdText, isTablet && { fontSize: 15 }]}>{item.transactionId || "N/A"}</Text>
                            <Ionicons name="copy-outline" size={isTablet ? 16 : 14} color={COLORS.primary} style={{ marginLeft: 4 }} />
                        </TouchableOpacity>

                        <Text style={[styles.itemTitle, isTablet && { fontSize: 20 }]} numberOfLines={1}>{item.title}</Text>
                        <Text style={[styles.itemSubTitle, isTablet && { fontSize: 15 }]} numberOfLines={1}>{item.subTitle}</Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }, isTablet && { paddingHorizontal: 14, paddingVertical: 8 }]}>
                        <Ionicons name={statusStyle.icon as any} size={isTablet ? 16 : 12} color={statusStyle.text} style={{ marginRight: 4 }} />
                        <Text style={[styles.statusText, { color: statusStyle.text }, isTablet && { fontSize: 13 }]}>
                            {translatedStatus}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.dateRow}>
                        <Ionicons name="calendar-outline" size={isTablet ? 18 : 14} color={COLORS.textGray} />
                        <Text style={[styles.dateText, isTablet && { fontSize: 14 }]}>{item.date}</Text>
                    </View>
                    <Text style={[styles.priceText, isTablet && { fontSize: 20 }]}>{priceDisplay}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable={false}>
            <View style={styles.container}>

                <View style={[styles.header, isTablet && { paddingTop: 60, paddingBottom: 30 }]}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={isTablet ? 28 : 24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, isTablet && { fontSize: 26 }]}>{t.myOrders || "My Orders"}</Text>
                    <View style={[styles.placeholderIcon, isTablet && { width: 50 }]} />
                </View>

                <View style={[styles.listContainer, isTablet && { paddingHorizontal: 30 }]}>
                    <FlashList
                        data={orderList}
                        renderItem={renderItem}
                        numColumns={numColumns}
                        key={isTablet ? 'tablet-2-cols' : 'mobile-1-col'}
                        estimatedItemSize={140}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={isTablet ? styles.listContentTablet : styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={EmptyState}
                    />
                </View>

            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: COLORS.bg,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.textDark,
        letterSpacing: 0.5
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    placeholderIcon: {
        width: 40
    },
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.textGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.textDark,
        marginBottom: 8
    },
    emptySub: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 24
    },
    actionBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4
    },
    actionBtnText: {
        color: "white",
        fontWeight: "700",
        fontSize: 14
    },
    listContainer: {
        flex: 1
    },
    // 櫨 Normal Content Style
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    // 櫨 Tablet Content Style (Removed paddingHorizontal)
    listContentTablet: {
        paddingBottom: 40,
        paddingHorizontal: 0
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
        flex: 1,
    },
    cardTablet: {
        padding: 24,
        borderRadius: 24,
        marginBottom: 20,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.iconBg,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
        overflow: "hidden"
    },
    itemImage: {
        width: "100%",
        height: "100%"
    },
    textContainer: {
        flex: 1,
        marginRight: 8
    },
    idRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F1F5F9",
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 6,
    },
    transIdLabel: {
        fontSize: 12,
        color: COLORS.textGray,
        marginRight: 4,
    },
    transIdText: {
        fontSize: 13,
        color: COLORS.textDark,
        fontWeight: "700",
        letterSpacing: 0.5
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 4
    },
    itemSubTitle: {
        fontSize: 13,
        color: COLORS.textGray,
        fontWeight: "500"
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700"
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        width: "100%",
        marginBottom: 14,
        opacity: 0.6
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: "500"
    },
    priceText: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.primary
    }
});

export default Order;