import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Text
} from 'react-native';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const CONTENT_MAX_WIDTH = 700;

const POLICY_SECTIONS = [
    {
        title: "1. Introduction",
        content: "Welcome to GameShop. We value your privacy and are committed to protecting your personal information. This policy explains how we handle your data."
    },
    {
        title: "2. Information We Collect",
        content: "We collect information you provide directly to us, such as your name, email address, and transaction details when you make a purchase."
    },
    {
        title: "3. How We Use Your Data",
        content: "Your data is used to process transactions, improve our services, and send you important updates regarding your account."
    },
    {
        title: "4. Data Security",
        content: "We implement top-tier security measures to protect your data. Your payment information is encrypted and never shared with third parties."
    },
    {
        title: "5. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact our support team via the 'Help Center'."
    }
];

export default function Privacy() {
    const router = useRouter();

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>

            <Stack.Screen options={{ headerShown: false }} />

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                style={[styles.header, isTablet && { paddingBottom: 60, alignItems: 'center' }]} // Tablet Header Padding & Center
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0, marginTop: 15 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                        <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                    </TouchableOpacity>
                    <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 26 }]}>Privacy Policy</Text>
                    <View style={{ width: isTablet ? 50 : 40 }} />
                </View>

                <View style={[styles.dateSection, isTablet && { marginTop: 25 }]}>
                    <Text style={[styles.dateText, isTablet && { fontSize: 16, paddingHorizontal: 20, paddingVertical: 6, borderRadius: 25 }]}>
                        Last Updated: Jan 20, 2026
                    </Text>
                </View>
            </LinearGradient>

            <View style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: 'center' }}>
                <ScrollView
                    style={[styles.body, isTablet && { width: CONTENT_MAX_WIDTH, marginTop: -40, paddingHorizontal: 0 }]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {POLICY_SECTIONS.map((item, index) => (
                        <View key={index} style={[styles.sectionCard, isTablet && { padding: 30, marginBottom: 20, borderRadius: 20 }]}>
                            <View style={[styles.iconBox, isTablet && { width: 50, height: 50, borderRadius: 25, marginRight: 20 }]}>
                                <Ionicons name="shield-checkmark-outline" size={isTablet ? 28 : 20} color="#E11D48" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text className='font-bold' style={[styles.sectionTitle, isTablet && { fontSize: 20, marginBottom: 10 }]}>{item.title}</Text>
                                <Text style={[styles.sectionContent, isTablet && { fontSize: 16, lineHeight: 26 }]}>{item.content}</Text>
                            </View>
                        </View>
                    ))}

                    <Text style={[styles.footerText, isTablet && { fontSize: 14, marginTop: 20 }]}>
                        By using our app, you agree to our Terms of Service.
                    </Text>

                </ScrollView>
            </View>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 30,
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
    dateSection: {
        alignItems: "center",
        marginTop: 15
    },
    dateText: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
        backgroundColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        overflow: "hidden"
    },

    body: {
        flex: 1,
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
        width: '100%'
    },

    sectionCard: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff1f2",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        marginTop: 2
    },
    sectionTitle: {
        fontSize: 16,
        color: "#0f172a",
        marginBottom: 6
    },
    sectionContent: {
        fontSize: 14,
        color: "#64748b",
        lineHeight: 22
    },

    footerText: {
        textAlign: "center",
        color: "#94a3b8",
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20
    }
});