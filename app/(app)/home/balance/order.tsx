import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useWalletStore } from "@/store/useWalletStore";

const { height } = Dimensions.get('window');

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
    const transactions = useWalletStore((state) => state.transactions);
    const orderList = transactions.filter((t) => t.type === 'purchase');

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case "success": return { bg: COLORS.successBg, text: COLORS.success, icon: "checkmark-circle" };
            case "pending": return { bg: COLORS.pendingBg, text: COLORS.pending, icon: "time" };
            case "failed": return { bg: COLORS.failedBg, text: COLORS.failed, icon: "close-circle" };
            default: return { bg: COLORS.iconBg, text: COLORS.textGray, icon: "help-circle" };
        }
    };

    const EmptyState = () => (
        <View style={styles.emptyWrapper}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="receipt-outline" size={40} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySub}>You havent made any purchases yet.</Text>

            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8} onPress={() => router.navigate("/(app)/home/popular")}>
                <Text style={styles.actionBtnText}>Start Shopping</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        const statusStyle = getStatusStyles(item.status);
        const priceDisplay = `${item.amount.toLocaleString()} ${item.currency}`;
        const imageSource = item.image ? item.image : null;

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.iconContainer}>
                        {imageSource ? (
                            <Image source={imageSource} style={styles.itemImage} resizeMode="contain" />
                        ) : (
                            <Ionicons name="game-controller" size={24} color={COLORS.primary} />
                        )}
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.itemSubTitle} numberOfLines={1}>{item.subTitle}</Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Ionicons name={statusStyle.icon as any} size={12} color={statusStyle.text} style={{ marginRight: 4 }} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Text>
                    </View>
                </View>
                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.dateRow}>
                        <Ionicons name="calendar-outline" size={14} color={COLORS.textGray} />
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    <Text style={styles.priceText}>{priceDisplay}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable={false}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={styles.placeholderIcon} />
                </View>

                <View style={styles.listContainer}>
                    <FlashList
                        data={orderList}
                        renderItem={renderItem}
                        estimatedItemSize={140}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
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
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
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
        borderColor: COLORS.border
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