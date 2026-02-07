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

const Deposit = () => {
    const router = useRouter();

    const { transactions } = useWalletStore();

    const depositList = transactions.filter(t => t.type === 'deposit');

    const getStatusColor = (status: string) => {
        const s = status ? status.toLowerCase() : "pending";
        switch (s) {
            case "success": return { bg: "#ecfdf5", text: COLORS.success, icon: "checkmark-circle" };
            case "pending": return { bg: "#fffbeb", text: COLORS.pending, icon: "time" };
            case "failed": return { bg: "#fef2f2", text: COLORS.failed, icon: "close-circle" };
            default: return { bg: "#f1f5f9", text: COLORS.textGray, icon: "help-circle" };
        }
    };

    const getImageForMethod = (title: string) => {
        if (title.includes("KBZ")) return require('@/assets/game_image/wave.png');
        if (title.includes("Wave")) return require('@/assets/game_image/wave.png');
        return require('@/assets/game_image/wave.png');
    };

    const EmptyState = () => (
        <View style={styles.emptyWrapper}>
            <View style={styles.emptyIconCircle}>
                <Ionicons name="wallet-outline" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No Deposits Yet</Text>
            <Text style={styles.emptySub}>Top up your wallet to get started!</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => router.navigate("/home/balance/topup")}>
                <Text style={styles.actionBtnText}>Top Up Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItem = ({ item }: { item: any }) => {
        const statusStyle = getStatusColor(item.status);
        const isFailed = item.status === 'failed';

        // Data Formatting
        const displayImage = item.image ? item.image : getImageForMethod(item.title);
        const displayAmount = item.amount ? `+${item.amount.toLocaleString()} ${item.currency}` : "+0 Ks";
        const displayTitle = item.title || "Topup";
        const txnId = item.id ? `TXN-${item.id.slice(-6)}` : "TXN-000";

        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.logoBox}>
                        <Image source={displayImage} style={styles.logoImage} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.methodTitle}>{displayTitle}</Text>
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
                            {item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : "Pending"}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardBottom}>
                    <Text style={styles.dateText}>{item.date || "Just now"}</Text>

                    <Text style={[
                        styles.amountText,
                        isFailed && { color: COLORS.textGray, textDecorationLine: 'line-through' }
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
                    <Text style={styles.headerTitle}>Deposit History</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={{ flex: 1 }}>
                    <FlashList
                        data={depositList}
                        renderItem={renderItem}
                        estimatedItemSize={120}
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

// import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
// import { Ionicons } from "@expo/vector-icons";
// import { FlashList } from "@shopify/flash-list";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// // 🔥 Store Import
// import { useWalletStore } from "@/store/useWalletStore";

// const { height } = Dimensions.get('window');

// const COLORS = {
//     primary: "#FF3232",
//     bg: "#F8FAFC",
//     card: "#FFFFFF",
//     textDark: "#0f172a",
//     textGray: "#64748b",
//     success: "#10b981",
//     pending: "#f59e0b",
//     failed: "#ef4444",
//     border: "#e2e8f0",
//     lightRed: "#FEF2F2"
// };

// const Deposit = () => {
//     const router = useRouter();

//     // 🔥 Store က Data ယူမယ်
//     const { transactions } = useWalletStore();

//     // Deposit စာရင်းကိုပဲ ယူမယ်
//     const depositList = transactions.filter(t => t.type === 'deposit');

//     const getStatusColor = (status: string) => {
//         const s = status ? status.toLowerCase() : "pending";
//         switch (s) {
//             case "success": return { bg: "#ecfdf5", text: COLORS.success, icon: "checkmark-circle" };
//             case "pending": return { bg: "#fffbeb", text: COLORS.pending, icon: "time" };
//             case "failed": return { bg: "#fef2f2", text: COLORS.failed, icon: "close-circle" };
//             default: return { bg: "#f1f5f9", text: COLORS.textGray, icon: "help-circle" };
//         }
//     };

//     // Helper: နာမည်နဲ့ ပုံရွေးပေးမယ့် Function
//     const getImageForMethod = (title: string) => {
//         if (title.includes("KBZ")) return require('@/assets/game_image/wave.png');
//         if (title.includes("Wave")) return require('@/assets/game_image/wave.png');
//         return require('@/assets/game_image/wave.png');
//     };

//     const EmptyState = () => (
//         <View style={styles.emptyWrapper}>
//             <View style={styles.emptyIconCircle}>
//                 <Ionicons name="wallet-outline" size={48} color={COLORS.primary} />
//             </View>
//             <Text style={styles.emptyTitle}>No Deposits Yet</Text>
//             <Text style={styles.emptySub}>Top up your wallet to get started!</Text>

//             <TouchableOpacity style={styles.actionBtn} onPress={() => router.navigate("/home/balance/topup")}>
//                 <Text style={styles.actionBtnText}>Top Up Now</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     const renderItem = ({ item }: { item: any }) => {
//         const statusStyle = getStatusColor(item.status);

//         // Data Formatting
//         const displayImage = item.image ? item.image : getImageForMethod(item.title);
//         const displayAmount = item.amount ? `+${item.amount.toLocaleString()} ${item.currency}` : "+0 Ks";
//         const displayTitle = item.title || "Topup";
//         const txnId = item.id ? `TXN-${item.id.slice(-6)}` : "TXN-000";

//         return (
//             <View style={styles.card}>
//                 <View style={styles.cardTop}>
//                     <View style={styles.logoBox}>
//                         <Image source={displayImage} style={styles.logoImage} resizeMode="contain" />
//                     </View>
//                     <View style={{ flex: 1, marginLeft: 12 }}>
//                         <Text style={styles.methodTitle}>{displayTitle}</Text>
//                         <Text style={styles.txnId}>{txnId}</Text>
//                     </View>

//                     {/* Status Badge */}
//                     <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
//                         <Ionicons name={statusStyle.icon as any} size={12} color={statusStyle.text} style={{ marginRight: 4 }} />
//                         <Text style={[styles.statusText, { color: statusStyle.text }]}>
//                             {item.status ? (item.status.charAt(0).toUpperCase() + item.status.slice(1)) : "Pending"}
//                         </Text>
//                     </View>
//                 </View>
//                 <View style={styles.divider} />
//                 <View style={styles.cardBottom}>
//                     <Text style={styles.dateText}>{item.date || "Just now"}</Text>

//                     {/* Failed ဖြစ်ရင် ပိုက်ဆံကို မျဉ်းခြစ်ပြမယ် */}
//                     <Text style={[
//                         styles.amountText,
//                         item.status === 'failed' && { color: COLORS.textGray, textDecorationLine: 'line-through' }
//                     ]}>
//                         {displayAmount}
//                     </Text>
//                 </View>
//             </View>
//         );
//     };

//     return (
//         <ScreenWrapper headerShown={false} isSafeArea={false} isScrollable={false}>
//             <View style={styles.container}>

//                 <View style={styles.header}>
//                     <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//                         <Ionicons name="chevron-back" size={24} color={COLORS.textDark} />
//                     </TouchableOpacity>
//                     <Text style={styles.headerTitle}>Deposit History</Text>
//                     <View style={{ width: 40 }} />
//                 </View>

//                 <View style={{ flex: 1 }}>
//                     <FlashList
//                         data={depositList}
//                         renderItem={renderItem}
//                         estimatedItemSize={120}
//                         keyExtractor={(item) => item.id}
//                         contentContainerStyle={{ padding: 20, }}
//                         showsVerticalScrollIndicator={false}
//                         ListEmptyComponent={EmptyState}
//                     />
//                 </View>

//             </View>
//         </ScreenWrapper>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: COLORS.bg },
//     header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: COLORS.bg },
//     headerTitle: { fontSize: 20, fontWeight: "800", color: COLORS.textDark },
//     backBtn: { width: 40, height: 40, alignItems: 'flex-start', justifyContent: 'center' },

//     emptyWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: height * 0.6 },
//     emptyIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.lightRed, alignItems: 'center', justifyContent: 'center', marginBottom: 20, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
//     emptyTitle: { fontSize: 20, fontWeight: "800", color: COLORS.textDark, marginBottom: 8 },
//     emptySub: { fontSize: 14, color: COLORS.textGray, marginBottom: 24, fontWeight: "500" },
//     actionBtn: { paddingVertical: 12, paddingHorizontal: 24, backgroundColor: COLORS.card, borderRadius: 30, borderWidth: 1, borderColor: COLORS.primary, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
//     actionBtnText: { color: COLORS.primary, fontWeight: "700", fontSize: 14 },
//     card: { backgroundColor: COLORS.card, borderRadius: 18, padding: 16, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, borderWidth: 1, borderColor: COLORS.border },
//     cardTop: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
//     logoBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center", padding: 8, overflow: 'hidden' },
//     logoImage: { width: '100%', height: '100%' },
//     methodTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textDark, marginBottom: 2 },
//     txnId: { fontSize: 12, color: COLORS.textGray, fontWeight: "500" },
//     statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
//     statusText: { fontSize: 11, fontWeight: "700" },
//     divider: { height: 1, backgroundColor: "#f1f5f9", marginBottom: 12 },
//     cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//     dateText: { fontSize: 13, color: "#94a3b8", fontWeight: "600" },
//     amountText: { fontSize: 18, fontWeight: "800", color: COLORS.success }
// });

// export default Deposit;