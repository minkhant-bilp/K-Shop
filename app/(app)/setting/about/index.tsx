import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import useTranslation from "@/structure/hooks/useTranslation";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const CONTENT_MAX_WIDTH = 600;

export default function About() {
    const router = useRouter();
    const { t } = useTranslation(); // 🔥

    const openLink = (url: string) => {
        Linking.openURL(url).catch(() => console.log("Cannot open link"));
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>

            <Stack.Screen options={{ headerShown: false }} />

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                style={[styles.header, isTablet && { paddingBottom: 60, alignItems: 'center' }]}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0, marginTop: 15 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                        <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                    </TouchableOpacity>
                    <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 26 }]}>
                        {t.aboutUs || "About Us"}
                    </Text>
                    <View style={{ width: isTablet ? 50 : 40 }} />
                </View>
            </LinearGradient>

            <View style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: 'center' }}>
                <ScrollView
                    style={[styles.body, isTablet && { width: CONTENT_MAX_WIDTH, marginTop: -40, paddingHorizontal: 0 }]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                >
                    <View style={[styles.logoSection, isTablet && { marginTop: 40, marginBottom: 40 }]}>
                        <View style={[styles.logoContainer, isTablet && { width: 140, height: 140, borderRadius: 30, padding: 10 }]}>
                            <Image
                                source={require("@/assets/game_image/klogo.png")}
                                style={[styles.appLogo, isTablet && { borderRadius: 25 }]}
                            />
                        </View>
                        <Text className='font-bold' style={[styles.appName, isTablet && { fontSize: 32, marginBottom: 10 }]}>GameShop</Text>
                        <View style={[styles.versionBadge, isTablet && { paddingHorizontal: 15, paddingVertical: 6, borderRadius: 16 }]}>
                            <Text style={[styles.versionText, isTablet && { fontSize: 16 }]}>
                                {t.version || "Version 1.0.0"}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.card, isTablet && { padding: 30, borderRadius: 25, marginBottom: 25 }]}>
                        <Text className='font-bold' style={[styles.cardTitle, isTablet && { fontSize: 20, marginBottom: 15 }]}>
                            {t.ourMission || "Our Mission"}
                        </Text>
                        <Text style={[styles.cardContent, isTablet && { fontSize: 16, lineHeight: 28 }]}>
                            {t.missionDesc || "We provide the fastest and most secure game top-up services for gamers in Myanmar. Enjoy seamless transactions and 24/7 support."}
                        </Text>
                    </View>

                    <View style={[styles.card, isTablet && { padding: 30, borderRadius: 25, marginBottom: 25 }]}>
                        <Text className='font-bold' style={[styles.cardTitle, isTablet && { fontSize: 20, marginBottom: 15 }]}>
                            {t.whyChooseUs || "Why Choose Us?"}
                        </Text>
                        <View style={[styles.featureRow, isTablet && { marginBottom: 15 }]}>
                            <Ionicons name="flash" size={isTablet ? 24 : 16} color="#E11D48" />
                            <Text style={[styles.featureText, isTablet && { fontSize: 16, marginLeft: 15 }]}>
                                {t.instantDelivery || "Instant Delivery"}
                            </Text>
                        </View>
                        <View style={[styles.featureRow, isTablet && { marginBottom: 15 }]}>
                            <Ionicons name="shield-checkmark" size={isTablet ? 24 : 16} color="#E11D48" />
                            <Text style={[styles.featureText, isTablet && { fontSize: 16, marginLeft: 15 }]}>
                                {t.securePayment || "100% Secure Payment"}
                            </Text>
                        </View>
                        <View style={[styles.featureRow, isTablet && { marginBottom: 15 }]}>
                            <Ionicons name="headset" size={isTablet ? 24 : 16} color="#E11D48" />
                            <Text style={[styles.featureText, isTablet && { fontSize: 16, marginLeft: 15 }]}>
                                {t.customerSupport || "24/7 Customer Support"}
                            </Text>
                        </View>
                    </View>

                    <Text className='font-bold' style={[styles.socialHeader, isTablet && { fontSize: 20, marginTop: 20 }]}>
                        {t.followUs || "Follow Us"}
                    </Text>

                    <View style={[styles.socialRow, isTablet && { gap: 25, marginBottom: 40 }]}>
                        <TouchableOpacity
                            style={[styles.socialBtn, { backgroundColor: "#1877F2" }, isTablet && { width: 60, height: 60, borderRadius: 30 }]}
                            onPress={() => openLink("https://facebook.com")}
                        >
                            <Ionicons name="logo-facebook" size={isTablet ? 32 : 24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialBtn, { backgroundColor: "#229ED9" }, isTablet && { width: 60, height: 60, borderRadius: 30 }]}
                            onPress={() => openLink("https://t.me")}
                        >
                            <Ionicons name="paper-plane" size={isTablet ? 32 : 24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialBtn, { backgroundColor: "#E1306C" }, isTablet && { width: 60, height: 60, borderRadius: 30 }]}
                            onPress={() => openLink("https://instagram.com")}
                        >
                            <Ionicons name="logo-instagram" size={isTablet ? 32 : 24} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialBtn, { backgroundColor: "#000000" }, isTablet && { width: 60, height: 60, borderRadius: 30 }]}
                            onPress={() => openLink("https://tiktok.com")}
                        >
                            <Ionicons name="logo-tiktok" size={isTablet ? 32 : 24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.copyright, isTablet && { fontSize: 14 }]}>
                        {t.copyright || "© 2026 GameShop. All rights reserved."}
                    </Text>

                </ScrollView>
            </View>

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
        width: '100%'
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        width: '100%'
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
        marginTop: -30,
        paddingHorizontal: 20,
        width: '100%'
    },
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