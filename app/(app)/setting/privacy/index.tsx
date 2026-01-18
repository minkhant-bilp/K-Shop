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
    View
} from 'react-native';

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
                style={styles.header}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#dc2626" />
                    </TouchableOpacity>
                    <DynamicText fontWeight="bold" style={styles.headerTitle}>Privacy Policy</DynamicText>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.dateSection}>
                    <DynamicText style={styles.dateText}>Last Updated: Jan 20, 2026</DynamicText>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {POLICY_SECTIONS.map((item, index) => (
                    <View key={index} style={styles.sectionCard}>
                        <View style={styles.iconBox}>
                            <Ionicons name="shield-checkmark-outline" size={20} color="#E11D48" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DynamicText fontWeight="bold" style={styles.sectionTitle}>{item.title}</DynamicText>
                            <DynamicText style={styles.sectionContent}>{item.content}</DynamicText>
                        </View>
                    </View>
                ))}

                <DynamicText style={styles.footerText}>
                    By using our app, you agree to our Terms of Service.
                </DynamicText>

            </ScrollView>

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
        backgroundColor: "#F8FAFC",
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
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