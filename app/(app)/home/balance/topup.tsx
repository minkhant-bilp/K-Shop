import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    Keyboard,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

// 🔥 Translation Hook
import useTranslation from "@/structure/hooks/useTranslation";

const { width } = Dimensions.get("window");
const isTablet = width > 600;
const contentWidth = isTablet ? 600 : "100%";

const COLORS = {
    primary: "#FF3232",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    textDark: "#0F172A",
    textMuted: "#64748B",
    border: "#E2E8F0",
    success: "#10B981",
    warning: "#FCD34D",
    activeLight: "#FEF2F2",
    infoBg: "#F0F9FF",
    infoText: "#0369A1"
};

export default function DepositScreen() {
    const router = useRouter();
    const { t } = useTranslation();

    const [country, setCountry] = useState<"MM" | "TH">("MM");
    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    const CONFIG = {
        MM: {
            flag: "🇲🇲", label: "Myanmar", currency: "MMK", symbol: "Ks",
            presets: [5000, 10000, 20000, 50000, 100000],
            methods: [
                {
                    id: "mmqr",
                    name: "MMQR Pay",
                    logo: require("@/assets/game_image/pc-image/mmqr.png"),
                    desc: t.mmqrDesc || "Kpay | Wave Pay | Banking နဲ့ပတ်သတ်တာ အကုန် Support လုပ်ထားတဲ့အတွက် ကြောင့် မိမိကြိုက်နှစ်သက်ရာ ဖြစ် MM QR Pay QR. ကိုးယူပြီး ကြိုက်နှစ်သက်ရာ တစ်ခု ဖြစ် ငွေလွှဲနိုင်ပါသည်။ နောက်တစ်ဆင့်မှာ ငွေစလွှဲရပါမည်"
                },
            ],
        },
        TH: {
            flag: "🇹🇭", label: "Thailand", currency: "THB", symbol: "฿",
            presets: [100, 500, 1000, 2000, 5000, 10000],
            methods: [
                {
                    id: "truemoney",
                    name: "TrueMoney Wallet",
                    logo: require("@/assets/game_image/truemoney.png"),
                    desc: t.trueMoneyDesc || "KBank | SCB Bank | TTB Bank | KTB Bank | True Money စသဖြစ် အကုန်လုံး Support လုပ်ထားတဲ့အတွက်ကြောင့် လူကြီးမင်းအနေနဲ့ ငွေလွဲမည်ဆိုပါက True Money QR. မှတစ်ဆင့် မိမိတို့ ကြိုက်နှစ်သက်ရာ Banking App မှာ တစ်ဆင့် ငွေလွဲနိုင်ပါသည်။ နောက်တစ်ဆင့်မှာ ငွေစလွှဲရပါမည်"
                },
            ],
        },
    };

    const current = CONFIG[country];
    const MIN_LIMIT = country === "MM" ? 2000 : 20;
    const numAmount = parseFloat(amount) || 0;
    const isBelowLimit = amount.length > 0 && numAmount < MIN_LIMIT;
    const isReadyToPay = numAmount >= MIN_LIMIT && selectedMethod !== null;

    const PRESET_UNIT = country === "MM" ? "MMK" : "B";

    const handleDeposit = () => {
        if (!selectedMethod || numAmount < MIN_LIMIT) {
            Alert.alert(t.invalidAmount || "Invalid Amount", `${t.minDepositIs || "Minimum deposit is"} ${MIN_LIMIT} ${current.symbol}`);
            return;
        }
        const methodDetails = current.methods.find(m => m.id === selectedMethod);
        router.push({
            pathname: "/home/balance/paymet",
            params: {
                amount: amount,
                currency: current.currency,
                methodName: methodDetails?.name,
                methodId: selectedMethod
            }
        });
    };

    const renderMethod = ({ item }: any) => {
        const isActive = selectedMethod === item.id;
        return (
            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setSelectedMethod(item.id)}
                    style={StyleSheet.flatten([styles.methodCard, isActive && styles.activeMethodCard])}
                >
                    <View style={styles.methodContentRow}>
                        <View style={styles.methodInfo}>
                            <View style={styles.logoBox}>
                                <Image source={item.logo} style={styles.paymentLogo} resizeMode="contain" />
                            </View>
                            <View>
                                <DynamicText fontWeight="bold" style={styles.methodName}>{item.name}</DynamicText>
                                <DynamicText style={styles.methodSub}>{t.automaticVerification || "Automatic Verification"}</DynamicText>
                            </View>
                        </View>
                        <View style={StyleSheet.flatten([styles.radio, isActive && styles.radioActive])}>
                            {isActive && <View style={styles.radioDot} />}
                        </View>
                    </View>

                    {isActive && (
                        <View style={styles.instructionBox}>
                            <View style={styles.instructionHeader}>
                                <Ionicons name="information-circle" size={18} color={COLORS.primary} />
                                <DynamicText fontWeight="bold" style={styles.instructionTitle}>
                                    {t.instructions || "အသုံးပြုပုံ"}
                                </DynamicText>
                            </View>
                            <DynamicText style={styles.instructionText}>
                                {item.desc}
                            </DynamicText>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    const listHeader = (
        <View style={{ padding: 20 }}>
            <View style={styles.toggleContainer}>
                {(["MM", "TH"] as const).map((c) => (
                    <TouchableOpacity
                        key={c}
                        onPress={() => {
                            setCountry(c);
                            setSelectedMethod(null);
                            setAmount("");
                        }}
                        style={StyleSheet.flatten([styles.toggleBtn, country === c && styles.activeToggle])}
                    >
                        <DynamicText style={{ fontSize: 16 }}>{CONFIG[c].flag}</DynamicText>
                        <DynamicText fontWeight="bold" style={StyleSheet.flatten([styles.toggleLabel, country === c && styles.activeToggleLabel])}>
                            {CONFIG[c].label}
                        </DynamicText>
                    </TouchableOpacity>
                ))}
            </View>

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.amountCard}
            >
                <View style={styles.cardHeader}>
                    <DynamicText style={styles.inputLabel} fontWeight="semibold">{t.depositAmount || "Deposit Amount"}</DynamicText>
                    <View style={styles.currencyBadge}>
                        <DynamicText style={styles.currencyText} fontWeight="bold">{current.currency}</DynamicText>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <DynamicText style={styles.symbolText}>{current.symbol}</DynamicText>
                    <TextInput
                        style={styles.textInput}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        textAlignVertical="center"
                    />
                </View>

                {isBelowLimit && (
                    <View style={styles.warningContainer}>
                        <Ionicons name="alert-circle" size={14} color={COLORS.warning} />
                        <DynamicText style={styles.warningText} fontWeight="medium">
                            {t.minDepositIs || "Minimum deposit is"} {MIN_LIMIT.toLocaleString()} {current.currency}
                        </DynamicText>
                    </View>
                )}
            </LinearGradient>

            <View style={styles.sectionRow}>
                <FontAwesome5 name="wallet" size={14} color={COLORS.primary} />
                <DynamicText style={styles.sectionTitle} fontWeight="bold">{t.quickSelect || "Quick Select"}</DynamicText>
            </View>

            <View style={styles.grid}>
                {current.presets.map((v) => {
                    const isActive = amount === v.toString();
                    return (
                        <View key={v} style={styles.gridItem}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setAmount(v.toString())}
                                style={[styles.presetCard, isActive && styles.activePresetCard]}
                            >
                                <Text
                                    className="font-bold"
                                    style={[styles.presetText, isActive && styles.activePresetText]}
                                >
                                    {v.toLocaleString()} <DynamicText style={{ fontSize: 12 }}>{PRESET_UNIT}</DynamicText>
                                </Text>

                                {isActive && (
                                    <View style={styles.checkIcon}>
                                        <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>

            <View style={styles.sectionRow}>
                <FontAwesome5 name="shield-alt" size={14} color={COLORS.success} />
                <DynamicText style={styles.sectionTitle} fontWeight="bold">{t.paymentMethod || "Payment Method"}</DynamicText>
            </View>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScreenWrapper style={styles.container} isSafeArea={true} headerShown={false}>

                <View style={[styles.mainWrapper, { width: contentWidth }]}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
                            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                        <DynamicText style={styles.headerTitle} fontWeight="bold">{t.deposit || "Deposit"}</DynamicText>
                        <TouchableOpacity style={styles.helpBtn} activeOpacity={0.7} onPress={() => setShowHelp(true)}>
                            <Ionicons name="help-circle-outline" size={26} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>

                    <FlashList
                        data={current.methods}
                        extraData={selectedMethod}
                        renderItem={renderMethod}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={listHeader}
                        estimatedItemSize={85}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    />

                    <View style={styles.footer}>
                        <TouchableOpacity
                            disabled={!isReadyToPay}
                            style={StyleSheet.flatten([styles.payBtn, !isReadyToPay && styles.disabledBtn])}
                            onPress={handleDeposit}
                        >
                            <DynamicText fontWeight="bold" style={styles.payBtnText}>{t.confirmDeposit || "Confirm Deposit"}</DynamicText>
                        </TouchableOpacity>
                    </View>

                </View>

                <Modal
                    visible={showHelp}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowHelp(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContainer, isTablet && { width: 500 }]}>
                            <View style={styles.modalHeader}>
                                <View style={styles.modalIconBox}>
                                    <Ionicons name="information" size={24} color="#FFF" />
                                </View>
                                <DynamicText style={styles.modalTitle} fontWeight="bold">{t.howToDeposit || "How to Deposit?"}</DynamicText>
                            </View>
                            <View style={styles.modalBody}>
                                <View style={styles.stepRow}>
                                    <View style={styles.stepCircle}><DynamicText style={styles.stepNum}>1</DynamicText></View>
                                    <DynamicText style={styles.stepText}>{t.step1 || "Select your country."}</DynamicText>
                                </View>
                                <View style={styles.stepLine} />
                                <View style={styles.stepRow}>
                                    <View style={styles.stepCircle}><DynamicText style={styles.stepNum}>2</DynamicText></View>
                                    <DynamicText style={styles.stepText}>{t.step2 || "Enter amount or choose package."}</DynamicText>
                                </View>
                                <View style={styles.stepLine} />
                                <View style={styles.stepRow}>
                                    <View style={styles.stepCircle}><DynamicText style={styles.stepNum}>3</DynamicText></View>
                                    <DynamicText style={styles.stepText}>{t.step3 || "Select payment & confirm."}</DynamicText>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.modalCloseBtn} activeOpacity={0.8} onPress={() => setShowHelp(false)}>
                                <DynamicText style={styles.modalCloseText} fontWeight="bold">{t.understood || "Understood"}</DynamicText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScreenWrapper>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
    },
    mainWrapper: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        height: 60
    },
    backCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        fontSize: 24,
        color: COLORS.textDark,
        lineHeight: 34,
        paddingVertical: 2
    },
    helpBtn: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
    },

    toggleContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 6,
        marginBottom: 25
    },
    toggleBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8
    },
    activeToggle: {
        backgroundColor: "#FFF",
        elevation: 2
    },
    toggleLabel: {
        fontSize: 14,
        color: COLORS.textMuted
    },
    activeToggleLabel: {
        color: COLORS.primary
    },

    amountCard: {
        padding: 24,
        borderRadius: 28,
        marginBottom: 30,
        elevation: 8,
        shadowColor: "#dc2626",
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 }
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputLabel: {
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 13,
        textTransform: "uppercase"
    },
    currencyBadge: {
        backgroundColor: "rgba(255,255,255,0.25)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },
    currencyText: {
        color: "#FFF",
        fontSize: 12
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 15,
    },
    symbolText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFF",
        marginRight: 10,
        lineHeight: 45,
    },
    textInput: {
        flex: 1,
        fontSize: 42,
        fontWeight: "900",
        color: "#FFF",
        paddingVertical: 0,
        lineHeight: 55,
        height: Platform.OS === 'android' ? 65 : undefined,
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        backgroundColor: "rgba(0,0,0,0.2)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: "flex-start",
        gap: 6
    },
    warningText: {
        color: COLORS.warning,
        fontSize: 12,
    },

    sectionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15,
        marginTop: 10
    },
    sectionTitle: {
        fontSize: 18,
        color: COLORS.textDark
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -6,
        marginBottom: 20
    },
    gridItem: {
        width: "33.33%",
        padding: 6
    },
    presetCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
        height: 60,
        position: 'relative'
    },
    activePresetCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.activeLight,
        borderWidth: 1.5,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.15,
    },
    presetText: {
        fontSize: 14,
        color: COLORS.textDark,
        fontWeight: "600"
    },
    activePresetText: {
        color: COLORS.primary,
        fontWeight: "800"
    },
    checkIcon: {
        position: 'absolute',
        top: 4,
        right: 4
    },

    methodCard: {
        padding: 16,
        borderRadius: 18,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1
    },
    activeMethodCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.1
    },
    methodContentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    methodInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    logoBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F1F5F9"
    },
    paymentLogo: {
        width: "70%",
        height: "70%"
    },
    methodName: {
        fontSize: 16,
        color: COLORS.textDark
    },
    methodSub: {
        fontSize: 12,
        color: COLORS.textMuted
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center"
    },
    radioActive: {
        borderColor: COLORS.primary
    },
    radioDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary
    },

    instructionBox: {
        marginTop: 12,
        backgroundColor: COLORS.infoBg,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: "#BAE6FD",
    },
    instructionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6
    },
    instructionTitle: {
        fontSize: 13,
        color: COLORS.primary,
    },
    instructionText: {
        fontSize: 13,
        color: COLORS.textDark,
        lineHeight: 18,
        opacity: 0.9
    },

    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 24,
        backgroundColor: "rgba(255,255,255,0.98)",
        borderTopWidth: 1,
        borderColor: COLORS.border
    },
    payBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5
    },
    disabledBtn: {
        backgroundColor: "#CBD5E1",
        shadowOpacity: 0,
        elevation: 0
    },
    payBtnText: {
        color: "#FFF",
        fontSize: 18
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24
    },
    modalContainer: {
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        elevation: 10,
    },
    modalHeader: {
        alignItems: "center",
        marginBottom: 20
    },
    modalIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        color: COLORS.textDark,
        textAlign: "center"
    },
    modalBody: {
        width: "100%",
        marginBottom: 24
    },
    stepRow: {
        flexDirection: "row",
        gap: 12
    },
    stepCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.border
    },
    stepNum: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLORS.primary
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textMuted,
        lineHeight: 22
    },
    stepLine: {

    },
    modalCloseBtn: {
        width: "100%",
        backgroundColor: COLORS.primary,
        paddingVertical: 14, borderRadius: 16,
        alignItems: "center"
    },
    modalCloseText: {
        color: "#FFF",
        fontSize: 16
    }
});