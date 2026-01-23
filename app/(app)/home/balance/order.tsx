import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useWalletStore } from "@/store/useWalletStore";

const { height } = Dimensions.get('window');

const COLORS = {
    primary: "#FF3232",
    bg: "#F8FAFC",
    card: "#FFFFFF",
    textDark: "#0f172a",
    textGray: "#64748b",
    success: "#10b981",
    pending: "#f59e0b",
    failed: "#ef4444",
    border: "#e2e8f0",
    lightRed: "#FEF2F2"
};

const Order = () => {
    const router = useRouter();

    const transactions = useWalletStore((state) => state.transactions);

    const orderList = transactions.filter((t) => t.type === 'purchase');

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "success": return { bg: "#ecfdf5", text: COLORS.success };
            case "pending": return { bg: "#fffbeb", text: COLORS.pending };
            case "failed": return { bg: "#fef2f2", text: COLORS.failed };
            default: return { bg: "#f1f5f9", text: COLORS.textGray };
        }
    };

    const EmptyState = () => (
        <View style={styles.emptyWrapper}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="cart-outline" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySub}>Looks like you havent placed any orders.</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => router.navigate("/(app)/home/popular")}>
                <Text style={styles.actionBtnText}>Shop Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        const statusStyle = getStatusColor(item.status);
        const priceDisplay = `${item.amount.toLocaleString()} ${item.currency}`;

        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.iconBox}>
                        <Image source={item.image} style={styles.gameImage} resizeMode="cover" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.gameTitle}>{item.title}</Text>
                        <Text style={styles.itemDetail}>{item.subTitle}</Text>
                    </View>
                    <Text style={styles.price}>{priceDisplay}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardBottom}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <View style={[styles.dot, { backgroundColor: statusStyle.text }]} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable={false}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="chevron-back" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order History</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={{ flex: 1 }}>
                    <FlashList
                        data={orderList}
                        renderItem={renderItem}
                        estimatedItemSize={130}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 20 }}
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
        paddingBottom: 15,
        backgroundColor: COLORS.bg
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.textDark
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height * 0.6
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.lightRed,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: COLORS.textDark,
        marginBottom: 8
    },
    emptySub: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 24,
        fontWeight: "500"
    },
    actionBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: COLORS.card,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    actionBtnText: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: 14
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden'
    },
    gameImage: {
        width: '100%',
        height: '100%'
    },
    gameTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 2
    },
    itemDetail: {
        fontSize: 13,
        color: COLORS.textGray,
        fontWeight: "500"
    },
    price: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.primary
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginBottom: 10
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateText: {
        fontSize: 12,
        color: "#94a3b8",
        fontWeight: "600"
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700"
    }
});

export default Order;