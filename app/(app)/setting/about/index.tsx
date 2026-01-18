import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

export default function About() {
    const router = useRouter();

    const openLink = (url: string) => {
        Linking.openURL(url).catch(() => console.log("Cannot open link"));
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>

            <Stack.Screen options={{ headerShown: false }} />

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                style={styles.header}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#dc2626" />
                    </TouchableOpacity>
                    <DynamicText fontWeight="bold" style={styles.headerTitle}>About Us</DynamicText>
                    <View style={{ width: 40 }} />
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <View style={styles.logoSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("@/assets/game_image/klogo.png")}
                            style={styles.appLogo}
                        />
                    </View>
                    <DynamicText fontWeight="bold" style={styles.appName}>GameShop</DynamicText>
                    <View style={styles.versionBadge}>
                        <DynamicText style={styles.versionText}>Version 1.0.0</DynamicText>
                    </View>
                </View>

                <View style={styles.card}>
                    <DynamicText fontWeight="bold" style={styles.cardTitle}>Our Mission</DynamicText>
                    <DynamicText style={styles.cardContent}>
                        We provide the fastest and most secure game top-up services for gamers in Myanmar. Enjoy seamless transactions and 24/7 support.
                    </DynamicText>
                </View>

                <View style={styles.card}>
                    <DynamicText fontWeight="bold" style={styles.cardTitle}>Why Choose Us?</DynamicText>
                    <View style={styles.featureRow}>
                        <Ionicons name="flash" size={16} color="#E11D48" />
                        <DynamicText style={styles.featureText}>Instant Delivery</DynamicText>
                    </View>
                    <View style={styles.featureRow}>
                        <Ionicons name="shield-checkmark" size={16} color="#E11D48" />
                        <DynamicText style={styles.featureText}>100% Secure Payment</DynamicText>
                    </View>
                    <View style={styles.featureRow}>
                        <Ionicons name="headset" size={16} color="#E11D48" />
                        <DynamicText style={styles.featureText}>24/7 Customer Support</DynamicText>
                    </View>
                </View>

                <DynamicText fontWeight="bold" style={styles.socialHeader}>Follow Us</DynamicText>

                <View style={styles.socialRow}>
                    <TouchableOpacity
                        style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}
                        onPress={() => openLink("https://facebook.com")}
                    >
                        <Ionicons name="logo-facebook" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.socialBtn, { backgroundColor: "#229ED9" }]}
                        onPress={() => openLink("https://t.me")}
                    >
                        <Ionicons name="paper-plane" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.socialBtn, { backgroundColor: "#E1306C" }]}
                        onPress={() => openLink("https://instagram.com")}
                    >
                        <Ionicons name="logo-instagram" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.socialBtn, { backgroundColor: "#000000" }]}
                        onPress={() => openLink("https://tiktok.com")}
                    >
                        <Ionicons name="logo-tiktok" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <DynamicText style={styles.copyright}>
                    © 2026 GameShop. All rights reserved.
                </DynamicText>

            </ScrollView>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 50,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 10,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: "white",
        letterSpacing: 0.5
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },

    body: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        marginTop: -30,
        paddingHorizontal: 20,
    },

    // Logo Section
    logoSection: {
        alignItems: "center",
        marginBottom: 25,
        marginTop: 60
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: "white",
        padding: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 10
    },
    appLogo: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
    },
    appName: {
        fontSize: 22,
        color: "#0f172a",
        marginBottom: 5
    },
    versionBadge: {
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    versionText: {
        fontSize: 12,
        color: "#64748b",
        fontWeight: "600"
    },

    card: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    cardTitle: {
        fontSize: 16,
        color: "#0f172a",
        marginBottom: 10
    },
    cardContent: {
        fontSize: 14,
        color: "#64748b",
        lineHeight: 22
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8
    },
    featureText: {
        fontSize: 14,
        color: "#475569",
        marginLeft: 10
    },

    socialHeader: {
        fontSize: 16,
        color: "#0f172a",
        marginBottom: 15,
        marginTop: 5,
        textAlign: "center"
    },
    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        marginBottom: 30
    },
    socialBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 }
    },

    copyright: {
        textAlign: "center",
        fontSize: 12,
        color: "#94a3b8",
        paddingBottom: 20
    }
});