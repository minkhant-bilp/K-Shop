import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 📍 API Hook ကို Import လုပ်ပါပြီ
import { useCoin } from "@/structure/hooks/useCoin";
import useTranslation from '@/structure/hooks/useTranslation';

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

const Deposit = () => {
    const router = useRouter();
    const { t } = useTranslation();

    // 📍 API ကနေ Data ကို တိုက်ရိုက်ဆွဲယူပါမယ်
    const { rechargeHistory, walletQuery } = useCoin();
    const depositList = rechargeHistory || [];

    const getStatusColor = (status: string) => {
        const s = status ? status.toLowerCase() : "pending";
        switch (s) {
            case "success": return { bg: "#ecfdf5", text: COLORS.success, icon: "checkmark-circle" };
            case "pending": return { bg: "#fffbeb", text: COLORS.pending, icon: "time" };
            case "failed": return { bg: "#fef2f2", text: COLORS.failed, icon: "close-circle" };
            default: return { bg: "#f1f5f9", text: COLORS.textGray, icon: "help-circle" };
        }
    };

    const getTranslatedStatus = (status: string) => {
        const s = status ? status.toLowerCase() : "pending";
        switch (s) {
            case "success": return t.statusSuccess || "Success";
            case "pending": return t.statusPending || "Pending";
            case "failed": return t.statusFailed || "Failed";
            default: return t.statusPending || "Pending";
        }
    };

    const getImageForMethod = (title: string) => {
        if (!title) return require('@/assets/game_image/wave.png');
        if (title.includes("KBZ")) return require('@/assets/game_image/wave.png');
        if (title.includes("Wave")) return require('@/assets/game_image/wave.png');
        // TrueMoney လိုမျိုး ထပ်ဖြည့်ချင်ရင် ဒီမှာ ဖြည့်လို့ရပါတယ်
        if (title.toLowerCase().includes("true")) return require('@/assets/game_image/truemoney.png');
        return require('@/assets/game_image/wave.png');
    };

    // 📍 Date ကို အတိအကျနဲ့ လှလှပပပေါ်အောင် ပြောင်းပေးမယ့် Function
    const formatDate = (dateInput: any) => {
        if (!dateInput) return t.justNow || "Just now";

        // Server က Milliseconds နဲ့လာလာ၊ String နဲ့လာလာ Date object အဖြစ်ပြောင်းပေးပါတယ်
        const date = new Date(dateInput);

        // Date မှားနေရင်
        if (isNaN(date.getTime())) return t.justNow || "Just now";

        // ဥပမာ - "15 Mar 2026, 10:30 AM" ပုံစံဖြင့် ပြပေးပါမယ်
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const EmptyState = () => (
        <View style={styles.emptyWrapper}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="wallet-outline" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>{t.noDepositsYet || "No Deposits Yet"}</Text>
            <Text style={styles.emptySub}>{t.topupWalletToStart || "Top up your wallet to get started!"}</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => router.navigate("/home/balance/topup")}>
                <Text style={styles.actionBtnText}>{t.topUpNow || "Top Up Now"}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        const statusStyle = getStatusColor(item.status);
        const translatedStatus = getTranslatedStatus(item.status);
        const isFailed = item.status === 'failed';

        // Backend ကလာတဲ့ data keys တွေကို မှန်းပြီး ထည့်ပေးထားပါတယ်။ Backend နဲ့ မကိုက်ရင် နာမည်လေးတွေ ပြင်ပေးရပါမယ်။
        const methodTitle = item.paymentMethod || item.title || t.topupTitle || "Topup";
        const displayImage = item.image ? { uri: item.image } : getImageForMethod(methodTitle);

        const amount = item.amount || 0;
        const currency = item.currency || "Ks";
        const displayAmount = `+${Number(amount).toLocaleString()} ${currency}`;

        const txnId = item.id ? `TXN-${String(item.id).slice(-6)}` : "TXN-000";

        // 📍 Backend က ဘယ်လိုနာမည်နဲ့ Date ကိုပေးလဲဆိုတာပေါ်မူတည်ပြီး ယူသုံးပါတယ်။ 
        // ဥပမာ - item.createdDateInMilliSeconds သို့မဟုတ် item.createdAt
        const exactDate = item.createdDateInMilliSeconds || item.createdAt || item.date;
        const displayDate = formatDate(exactDate);

        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.logoBox}>
                        <Image source={displayImage as any} style={styles.logoImage} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.methodTitle}>{methodTitle}</Text>
                        <Text style={styles.txnId}>{txnId}</Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <Ionicons
                            name={statusStyle.icon as any}
                            size={12}
                            color={statusStyle.text}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {translatedStatus}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardBottom}>
                    {/* 📍 Date အတိအကျ ပေါ်မယ့်နေရာ */}
                    <Text style={styles.dateText}>{displayDate}</Text>

                    <Text style={[
                        styles.amountText,
                        isFailed && { color: COLORS.textGray, textDecorationLine: 'line-through' },
                        item.status === 'pending' && { color: COLORS.pending }
                    ]}>
                        {displayAmount}
                    </Text>
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
                    <Text style={styles.headerTitle}>{t.depositHistoryTitle || "Deposit History"}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={{ flex: 1 }}>
                    {/* 📍 API ခေါ်နေတုန်း Loading ပြပေးပါမယ် */}
                    {walletQuery.isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                            <Text style={{ marginTop: 12, color: COLORS.textGray, fontSize: 14 }}>
                                {t.loading || "Loading records..."}
                            </Text>
                        </View>
                    ) : (
                        <FlashList
                            data={depositList}
                            renderItem={renderItem}
                            estimatedItemSize={120}
                            // 📍 ဒီနေရာမှာ (item: any, index: number) လို့ Type သတ်မှတ်ပေးလိုက်ပါ
                            keyExtractor={(item: any, index: number) => item.id?.toString() || index.toString()}
                            contentContainerStyle={{ padding: 20 }}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={EmptyState}
                        />
                    )}
                </View>

            </View>
        </ScreenWrapper>
    );
};

// Styles အပိုင်းက အရင်အတိုင်းမို့ မပြောင်းလဲပါဘူး
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
    logoBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        overflow: 'hidden'
    },
    logoImage: {
        width: '100%',
        height: '100%'
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 2
    },
    txnId: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: "500"
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700"
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginBottom: 12
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    dateText: {
        fontSize: 13,
        color: "#94a3b8",
        fontWeight: "600"
    },
    amountText: {
        fontSize: 18,
        fontWeight: "800",
        color: COLORS.success
    }
});

export default Deposit;