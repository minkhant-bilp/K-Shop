import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export interface TransactionData {
    id: string;
    type: "deposit" | "purchase";
    title: string;
    date: string;
    amount: number;
    status: "success" | "pending" | "failed";
}

interface TransactionItemProps {
    item: TransactionData;
    index: number;
}

const TransactionItem = ({ item, index }: TransactionItemProps) => {
    const isDeposit = item.type === "deposit";

    const amountColor = isDeposit ? "#10b981" : "#e11d48";
    const iconName = isDeposit ? "arrow-down" : "arrow-up";
    const iconBg = isDeposit ? "#dcfce7" : "#ffe4e6";

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success': return '#10b981';
            case 'pending': return '#f59e0b'; // Orange
            case 'failed': return '#ef4444';
            default: return '#94a3b8';
        }
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50).duration(400)}
            style={styles.card}
        >
            <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                <Ionicons name={iconName} size={20} color={amountColor} />
            </View>

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.rightSection}>
                <Text style={[styles.amount, { color: amountColor }]}>
                    {isDeposit ? "+" : "-"} {item.amount.toLocaleString()} Ks
                </Text>

                <View style={styles.statusBadge}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#f8fafc"
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 8
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: "#0f172a",
        marginBottom: 4,
        letterSpacing: 0.3
    },
    date: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: '500'
    },
    rightSection: {
        alignItems: "flex-end",
        justifyContent: 'center'
    },
    amount: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        gap: 6
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        color: "#64748b",
        textTransform: "capitalize"
    }
});