import ContactItem from '@/components/common/service-code/ContactItem';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Clock,
    Headset,
    MessageCircle,
    Phone,
    Send
} from 'lucide-react-native';
import React from 'react';
import {
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const COLORS = {
    primary: "#E11D48",
    textDark: "#0F172A",
    textGray: "#64748B",
    viber: "#7360f2",
    telegram: "#229ED9",
};

const SupportScreen = () => {
    const router = useRouter();

    const openLink = (url: string) => {
        Linking.openURL(url).catch(() => alert("Cannot open link"));
    };

    return (
        <ScreenWrapper headerShown={false} isSafeArea={false}>

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                style={styles.header}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ArrowLeft size={24} color="#dc2626" />
                    </TouchableOpacity>
                    <DynamicText fontWeight="bold" style={styles.headerTitle}>Help Center</DynamicText>
                    <View style={{ width: 42 }} />
                </View>

                <View style={styles.heroSection}>
                    <View style={styles.iconCircle}>
                        <Headset size={40} color={COLORS.primary} />
                    </View>
                    <DynamicText fontWeight="bold" style={styles.heroTitle}>How can we help you?</DynamicText>
                    <DynamicText style={styles.heroSub}>
                        ငွေဖြည့်မရောက်ခြင်း နှင့် အခြားပြဿနာများအတွက်{"\n"}ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ
                    </DynamicText>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <View style={styles.infoCard}>
                    <View style={styles.row}>
                        <Clock size={20} color={COLORS.textGray} />
                        <View style={{ marginLeft: 12 }}>
                            <DynamicText fontWeight="bold" style={styles.cardTitle}>Working Hours</DynamicText>
                            <DynamicText style={styles.cardSub}>9:00 AM - 11:00 PM (Daily)</DynamicText>
                        </View>
                    </View>
                </View>

                <DynamicText fontWeight="bold" style={styles.sectionTitle}>Contact Us Directly</DynamicText>


                <ContactItem
                    title="Telegram Support"
                    subTitle="အမြန်ဆုံး ပြန်လည်ဖြေကြားပေးပါမည်"
                    icon={Send}
                    color={COLORS.telegram}
                    actionLabel="Chat"
                    onPress={() => openLink("https://t.me/your_telegram_username")}
                />

                <ContactItem
                    title="Viber Support"
                    subTitle="ငွေလွှဲပြေစာ ပေးပို့ရန်"
                    icon={MessageCircle}
                    color={COLORS.viber}
                    actionLabel="Chat"
                    onPress={() => openLink("viber://chat?number=959xxxxxxxxx")}
                />

                <ContactItem
                    title="Hotline"
                    subTitle="09-123456789"
                    icon={Phone}
                    color={COLORS.primary}
                    actionLabel="Call"
                    onPress={() => openLink("tel:09123456789")}
                />

            </ScrollView>
        </ScreenWrapper>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    header: {
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    heroSection: {
        alignItems: "center",
        marginTop: 20
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 }
    },
    heroTitle: {
        fontSize: 22,
        color: "white",
        marginBottom: 8
    },
    heroSub: {
        fontSize: 14,
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
        lineHeight: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
    },
    infoCard: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        marginBottom: 25,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        flexDirection: "row",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    cardTitle: {
        fontSize: 16,
        color: COLORS.textDark
    },
    cardSub: {
        fontSize: 13,
        color: COLORS.textGray,
        marginTop: 2
    },
    sectionTitle: {
        fontSize: 18,
        color: COLORS.textDark,
        marginBottom: 15
    }
});