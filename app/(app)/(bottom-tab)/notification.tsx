import NotificationItem, { NotificationData } from '@/components/common/noti/NotificationItem';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';


// const NOTIFICATIONS: NotificationData[] = [
//     { id: '1', type: 'order', title: 'Payment Successful', message: 'Your top-up of 1000 Diamonds has been successfully added.', time: '2m ago', isRead: false },
//     { id: '2', type: 'promo', title: 'Weekend Flash Sale!', message: 'Get 50% Bonus Diamonds only for today!', time: '1h ago', isRead: false },
//     { id: '3', type: 'security', title: 'Login Alert', message: 'New login detected from iPhone 14 Pro Max.', time: '5h ago', isRead: true },
// ];


const NOTIFICATIONS: NotificationData[] = [];

const Notification = () => {

    const hasNotifications = NOTIFICATIONS.length > 0;

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />
                <View style={styles.headerContent}>
                    <DynamicText fontWeight="bold" style={styles.headerTitle}>Notifications</DynamicText>

                    {hasNotifications && (
                        <TouchableOpacity activeOpacity={0.7}>
                            <Ionicons name="checkmark-done-outline" size={24} color="rgba(255,255,255,0.8)" />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            <View style={styles.container}>

                {hasNotifications ? (
                    <FlashList
                        data={NOTIFICATIONS}
                        estimatedItemSize={80}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <NotificationItem
                                item={item}
                                onPress={() => console.log("Read Noti", item.id)}
                            />
                        )}
                    />
                ) : (
                    <View style={styles.emptyStateContainer}>
                        <LinearGradient
                            colors={["#fff1f2", "#ffe4e6"]}
                            style={styles.emptyIconCircle}
                        >
                            <Ionicons name="mail-open-outline" size={50} color="#E11D48" />
                            <View style={[styles.dot, { top: 25, right: 25, backgroundColor: "#fca5a5" }]} />
                            <View style={[styles.dot, { bottom: 30, left: 25, backgroundColor: "#fecaca", width: 6, height: 6 }]} />
                        </LinearGradient>

                        <DynamicText fontWeight="bold" style={styles.emptyText}>No Notifications Yet</DynamicText>
                        <DynamicText style={styles.emptySubText}>
                            Well let you know when updates{"\n"}and promos arrive!
                        </DynamicText>

                    </View>
                )}
            </View>
        </ScreenWrapper>
    )
}

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc"
    },
    header: {
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 10,
        zIndex: 10,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 22,
        color: "white",
        letterSpacing: 0.5
    },

    listContent: {
        paddingTop: 10,
        paddingBottom: 40
    },

    emptyStateContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
        paddingBottom: 50
    },
    emptyIconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 25,
        shadowColor: "#E11D48",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10
    },
    dot: {
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    emptyText: {
        fontSize: 20,
        color: "#1e293b",
        marginBottom: 8
    },
    emptySubText: {
        fontSize: 14,
        color: "#64748b",
        textAlign: "center",
        lineHeight: 22
    },
    actionBtn: {
        marginTop: 30,
        backgroundColor: "#E11D48",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 25,
        shadowColor: "#E11D48",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5
    },
    actionBtnText: {
        color: "white",
        fontSize: 16
    }
});