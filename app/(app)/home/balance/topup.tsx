import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    Image,
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

const COLORS = {
    primary: "#E11D48",
    background: "#FFFFFF",
    surface: "#FFF1F2",
    textDark: "#0F172A",
    textMuted: "#64748B",
    border: "#FECDD3",
    success: "#10B981",
};

const CONFIG = {
    MM: {
        flag: "🇲🇲", label: "Myanmar", currency: "MMK", symbol: "Ks",
        presets: [5000, 10000, 20000, 50000, 100000, 500000],
        methods: [
            { id: "kpay", name: "KBZ Pay", logo: require("@/assets/game_image/diamond.png") },
            { id: "wave", name: "Wave Money", logo: require("@/assets/game_image/diamond.png") },
        ],
    },
    TH: {
        flag: "🇹🇭", label: "Thailand", currency: "THB", symbol: "฿",
        presets: [100, 500, 1000, 2000, 5000, 10000],
        methods: [
            { id: "kbank", name: "K-Bank", logo: require("@/assets/game_image/diamond.png") },
            { id: "scb", name: "SCB Bank", logo: require("@/assets/game_image/diamond.png") },
        ],
    },
};

export default function DepositScreen() {
    const router = useRouter();
    const [country, setCountry] = useState<"MM" | "TH">("MM");
    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const current = useMemo(() => CONFIG[country], [country]);

    const handleDeposit = () => {
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

    const renderMethod = useCallback(({ item }: any) => {
        const isActive = selectedMethod === item.id;
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setSelectedMethod(item.id)}
                    style={StyleSheet.flatten([styles.methodCard, isActive && styles.activeMethodCard])}
                >
                    <View style={styles.methodInfo}>
                        <View style={styles.logoBox}>
                            <Image source={item.logo} style={styles.paymentLogo} resizeMode="contain" />
                        </View>
                        <View>
                            <DynamicText fontWeight="bold" style={styles.methodName}>{item.name}</DynamicText>
                            <DynamicText style={styles.methodSub}>Automatic Verification</DynamicText>
                        </View>
                    </View>
                    <View style={StyleSheet.flatten([styles.radio, isActive && styles.radioActive])}>
                        {isActive && <View style={styles.radioDot} />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }, [selectedMethod]); const listHeader = useMemo(() => {
        return (
            <View style={{ padding: 20 }}>
                {/* ၁။ Country Toggle */}
                <View style={styles.toggleContainer}>
                    {(["MM", "TH"] as const).map((c) => (
                        <TouchableOpacity
                            key={c}
                            onPress={() => setCountry(c)}
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
                        <DynamicText style={styles.inputLabel} fontWeight="semibold">Deposit Amount</DynamicText>
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
                        />
                    </View>
                </LinearGradient>

                {/* ၃။ Payment Amount Grid */}
                <View style={styles.sectionRow}>
                    <FontAwesome5 name="wallet" size={14} color={COLORS.primary} />
                    <DynamicText style={styles.sectionTitle} fontWeight="bold">Payment Amount</DynamicText>
                </View>

                <View style={styles.grid}>
                    {current.presets.map((v) => {
                        const isActive = amount === v.toString();
                        return (
                            <View key={v} style={styles.gridItem}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setAmount(v.toString())}
                                    style={StyleSheet.flatten([styles.presetBox, isActive && styles.activePresetBox])}
                                >
                                    <View style={StyleSheet.flatten([styles.iconCircle, isActive && styles.activeIconCircle])}>
                                        <MaterialCommunityIcons name="cash-multiple" size={16} color={isActive ? "#FFF" : COLORS.primary} />
                                    </View>
                                    <DynamicText style={StyleSheet.flatten([styles.presetVal, isActive && styles.activePresetVal])} fontWeight="bold">
                                        {v.toLocaleString()}
                                    </DynamicText>
                                    <DynamicText style={StyleSheet.flatten([{ fontSize: 9, color: COLORS.textMuted }, isActive && { color: "#FFF" }])}>{current.currency}
                                    </DynamicText>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.sectionRow}>
                    <FontAwesome5 name="shield-alt" size={14} color={COLORS.success} />
                    <DynamicText style={styles.sectionTitle} fontWeight="bold">Secure Payments</DynamicText>
                </View>
            </View>
        );
    }, [country, amount, current]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScreenWrapper style={styles.container} isSafeArea={true} headerShown={false}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backCircle}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                    <DynamicText style={styles.headerTitle} fontWeight="bold">Deposit</DynamicText>
                    <View style={{ width: 45 }} />
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
                        disabled={!amount || !selectedMethod}
                        style={StyleSheet.flatten([styles.payBtn, (!amount || !selectedMethod) && styles.disabledBtn])}
                        onPress={handleDeposit}
                    >
                        <DynamicText fontWeight="bold" style={styles.payBtnText}>Confirm Deposit</DynamicText>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
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
        color: COLORS.textDark
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
        shadowColor: "#000",
        shadowOpacity: 0.3
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputLabel: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        textTransform: "uppercase"
    },
    currencyBadge: {
        backgroundColor: "rgba(255,255,255,0.2)",
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
        alignItems: "center",
        marginTop: 15
    },
    symbolText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginRight: 10
    },
    textInput: {
        flex: 1,
        fontSize: 42,
        fontWeight: "900",
        color: "#FFF",
        padding: 0
    },

    sectionRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 15
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
    presetBox: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: 22,
        paddingVertical: 18,
        alignItems: "center"
    },
    activePresetBox: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8
    },
    activeIconCircle: {
        backgroundColor: "rgba(255,255,255,0.2)"
    },
    presetVal: {
        fontSize: 16,
        color: COLORS.textDark
    },
    activePresetVal: {
        color: "#FFF"
    },

    methodCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 22,
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: COLORS.border,
        marginBottom: 12
    },
    activeMethodCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface
    },
    methodInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    logoBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.border
    },
    paymentLogo: {
        width: "80%",
        height: "80%"
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

    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 24,
        backgroundColor: "rgba(255,255,255,0.95)"
    },
    payBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 20,
        borderRadius: 22,
        alignItems: "center"
    },
    disabledBtn: {
        backgroundColor: "#E2E8F0"
    },
    payBtnText: {
        color: "#FFF",
        fontSize: 18
    },
});