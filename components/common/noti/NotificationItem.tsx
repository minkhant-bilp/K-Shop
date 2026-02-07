import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface NotificationData {
    id: string;
    type: "order" | "promo" | "system" | "security";
    title: string;
    message: string;
    time: string;
    isRead: boolean;
}

interface NotificationProps {
    item: NotificationData;
    onPress: () => void;
}

const NotificationItem = ({ item, onPress }: NotificationProps) => {

    const getIconConfig = (type: string) => {
        switch (type) {
            case 'order': return { name: "cart", color: "#10b981", bg: "#d1fae5" };
            case 'promo': return { name: "pricetag", color: "#f59e0b", bg: "#fef3c7" };
            case 'security': return { name: "shield-checkmark", color: "#3b82f6", bg: "#dbeafe" };
            default: return { name: "notifications", color: "#E11D48", bg: "#ffe4e6" };
        }
    };

    const iconConfig = getIconConfig(item.type);

    return (
        <TouchableOpacity
            style={[styles.container, !item.isRead && styles.unreadContainer]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={[styles.iconBox, { backgroundColor: iconConfig.bg }]}>
                <Ionicons name={iconConfig.name as any} size={20} color={iconConfig.color} />
            </View>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <DynamicText fontWeight="bold" style={styles.title} numberOfLines={1}>
                        {item.title}
                    </DynamicText>
                    <DynamicText style={styles.time}>{item.time}</DynamicText>
                </View>

                <Text
                    style={[styles.message, !item.isRead && styles.unreadMessage]}
                    numberOfLines={2}
                >
                    {item.message}
                </Text>
            </View>

            {!item.isRead && <View style={styles.redDot} />}
        </TouchableOpacity>
    );
};

export default NotificationItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 16,
        backgroundColor: "white",
        marginBottom: 2,
        alignItems: "flex-start"
    },
    unreadContainer: {
        backgroundColor: "#fff1f2",
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    title: {
        fontSize: 16,
        color: "#0f172a",
        flex: 1,
        marginRight: 10
    },
    time: {
        fontSize: 12,
        color: "#94a3b8"
    },
    message: {
        fontSize: 13,
        color: "#64748b",
        lineHeight: 18
    },
    unreadMessage: {
        color: "#334155",
        fontWeight: "500"
    },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E11D48",
        marginLeft: 8,
        marginTop: 6
    }
});