import ContactItem from '@/components/common/service-code/ContactItem';
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
    View,
    Dimensions,
    Text
} from 'react-native';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const CONTENT_MAX_WIDTH = 600;

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
                style={[styles.header, isTablet && { paddingBottom: 60, alignItems: 'center' }]}
            >
                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                        <ArrowLeft size={isTablet ? 28 : 24} color="#dc2626" />
                    </TouchableOpacity>
                    <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>Help Center</Text>
                    <View style={{ width: isTablet ? 50 : 42 }} />
                </View>

                <View style={styles.heroSection}>
                    <View style={[styles.iconCircle, isTablet && { width: 100, height: 100, borderRadius: 50 }]}>
                        <Headset size={isTablet ? 50 : 40} color={COLORS.primary} />
                    </View>
                    <Text className='font-bold' style={[styles.heroTitle, isTablet && { fontSize: 28 }]}>How can we help you?</Text>
                    <Text style={[styles.heroSub, isTablet && { fontSize: 16, lineHeight: 24 }]}>
                        ငွေဖြည့်မရောက်ခြင်း နှင့် အခြားပြဿနာများအတွက်{"\n"}ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ
                    </Text>
                </View>
            </LinearGradient>

            <View style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: 'center' }}>
                <ScrollView
                    style={[styles.container, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0 }]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <View style={[styles.infoCard, isTablet && { padding: 25, marginTop: 30 }]}>
                        <View style={styles.row}>
                            <Clock size={isTablet ? 24 : 20} color={COLORS.textGray} />
                            <View style={{ marginLeft: 12 }}>
                                <Text className='font-bold' style={[styles.cardTitle, isTablet && { fontSize: 18 }]}>Working Hours</Text>
                                <Text style={[styles.cardSub, isTablet && { fontSize: 15 }]}>9:00 AM - 11:00 PM (Daily)</Text>
                            </View>
                        </View>
                    </View>

                    <Text className='font-bold' style={[styles.sectionTitle, isTablet && { fontSize: 22, marginBottom: 20 }]}>Contact Us Directly</Text>

                    <View style={isTablet && { gap: 10 }}>
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
                    </View>

                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    header: {
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
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
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        width: '100%'
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