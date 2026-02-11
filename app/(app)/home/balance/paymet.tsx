import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Modal,
    ActivityIndicator
} from "react-native";

import { useWalletStore } from "@/store/useWalletStore";

const COLORS = {
    primary: "#E11D48",
    background: "#F8FAFC",
    white: "#FFFFFF",
    textDark: "#0F172A",
    textGray: "#64748B",
    border: "#FECDD3",
    surface: "#FFF1F2",
    toastBg: "#1E293B",
    disabled: "#94A3B8",
    success: "#10B981",
    error: "#EF4444",
};

const getMethodIcon = (id: string) => {
    switch (id) {
        case "truemoney": return require("@/assets/game_image/truemoney.png");
        default: return require("@/assets/game_image/pc-image/mmqr.png");
    }
};

const getQrImage = (id: string) => {
    switch (id) {
        case "truemoney": return require("@/assets/game_image/truemoney1.png");
        default: return require("@/assets/game_image/pc-image/mmqr2.png");
    }
};

export default function PaymentDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { amount, currency, methodName, methodId } = params;

    const { requestTopUp } = useWalletStore();

    const [receiptImage, setReceiptImage] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const [isLoading, setIsLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setReceiptImage(result.assets[0].uri);
        }
    };

    const handleConfirm = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            requestTopUp(Number(amount), methodName as string);
            setReceiptImage(null);
            setStatus('success');
        }, 2000);
    };

    if (status === 'success') {
        return (
            <ScreenWrapper isSafeArea={true} headerShown={false}>
                <View style={styles.centeredContainer}>
                    <View style={styles.resultContent}>
                        <View style={[styles.iconCircle, { backgroundColor: COLORS.success, shadowColor: COLORS.success }]}>
                            <FontAwesome5 name="check" size={50} color={COLORS.white} />
                        </View>

                        <DynamicText style={styles.resultTitle} fontWeight="bold">Payment Submitted!</DynamicText>
                        <DynamicText style={styles.resultDesc}>
                            Your deposit request has been received. We will verify and top-up your account shortly.
                        </DynamicText>
                        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.navigate("/(app)/(bottom-tab)/history")}>
                            <DynamicText style={styles.btnText} fontWeight="bold">Back to History</DynamicText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper style={styles.container} isSafeArea={true} headerShown={false}>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isLoading}
                onRequestClose={() => { }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <DynamicText style={styles.loadingTitle} fontWeight="bold">Processing Payment</DynamicText>
                        <DynamicText style={styles.loadingDesc}>Verifying your slip, please wait...</DynamicText>
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <DynamicText style={styles.headerTitle} fontWeight="bold">Payment Details</DynamicText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                <View style={styles.summaryCard}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="clock" size={40} color={COLORS.primary} />
                    </View>
                    <DynamicText style={styles.statusText} fontWeight="bold">Pending Payment</DynamicText>
                    <DynamicText style={styles.descText}>Please complete the transfer below</DynamicText>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Total Amount</DynamicText>
                        <DynamicText style={styles.valueLarge} fontWeight="bold">
                            {Number(amount).toLocaleString()} <DynamicText style={{ fontSize: 14 }}>{currency}</DynamicText>
                        </DynamicText>
                    </View>

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Payment Method</DynamicText>
                        <View style={styles.methodBadge}>
                            <Image
                                source={getMethodIcon(methodId as string)}
                                style={{ width: 35, height: 35, marginRight: 5 }}
                                resizeMode="contain"
                            />
                            <DynamicText style={styles.methodText} fontWeight="semibold">{methodName}</DynamicText>
                        </View>
                    </View>
                </View>

                <View style={styles.reminderBox}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <DynamicText style={styles.reminderTitle} fontWeight="bold">သတိပြုရန်</DynamicText>
                        <DynamicText style={styles.reminderText}>
                            မိတ်ဆွေ {methodName} ကို ငွေလွှဲပြီးရင် ငွေလွှဲစလစ်လေးကို Save ထားဖို့ မမေ့ပါနဲ့နော်။ အောက်ဆုံးမှာ ငွေလွှဲစလစ်ဖြည့်ပေးရပါမည်။
                        </DynamicText>
                    </View>
                </View>

                {/* 🔥 Scan to Pay Section with Dynamic QR */}
                <View style={styles.accountCard}>
                    <View style={styles.scanHeader}>
                        <MaterialCommunityIcons name="qrcode-scan" size={22} color={COLORS.primary} />
                        <DynamicText style={styles.sectionTitle} fontWeight="bold">Scan to Pay</DynamicText>
                    </View>

                    <View style={styles.qrContainer}>
                        <Image
                            // 🔥 Dynamic QR Image Loading Logic
                            source={getQrImage(methodId as string)}
                            style={styles.qrImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.uploadSection}>
                    <DynamicText style={styles.sectionTitle} fontWeight="bold">Upload Screenshot</DynamicText>
                    <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                        {receiptImage ? (
                            <Image
                                source={{ uri: receiptImage }}
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <>
                                <View style={styles.uploadIconCircle}>
                                    <Ionicons name="cloud-upload-outline" size={30} color={COLORS.primary} />
                                </View>
                                <DynamicText style={styles.uploadText}>Tap to upload payment slip</DynamicText>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    disabled={!receiptImage || isLoading}
                    style={[
                        styles.confirmBtn,
                        (!receiptImage || isLoading) && styles.disabledBtn
                    ]}
                    onPress={handleConfirm}
                >
                    <DynamicText fontWeight="bold" style={styles.btnText}>
                        {isLoading ? "Processing..." : "Confirm Payment"}
                    </DynamicText>
                </TouchableOpacity>
            </View>

            <Animated.View
                style={[
                    styles.toastContainer, {
                        opacity: fadeAnim,
                        transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }]
                    }
                ]}
                pointerEvents="none"
            >
                <View style={styles.toastBox}>
                    <Ionicons name="checkmark-circle" size={20} color="#4ADE80" />
                    <DynamicText style={styles.toastText} fontWeight="semibold">Account Number Copied!</DynamicText>
                </View>
            </Animated.View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
        justifyContent: "center"
    },
    loadingBox: {
        width: 280,
        backgroundColor: COLORS.white,
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    loadingTitle: {
        fontSize: 18,
        color: COLORS.textDark,
        marginTop: 16,
        marginBottom: 8
    },
    loadingDesc: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: "center"
    },

    centeredContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultContent: {
        width: '85%',
        alignItems: 'center'
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 10
    },
    resultTitle: {
        fontSize: 24,
        color: COLORS.textDark,
        marginBottom: 10,
        textAlign: 'center'
    },
    resultDesc: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22
    },

    primaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
        width: "100%",
        alignItems: 'center'
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: COLORS.white
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        fontSize: 18,
        color: COLORS.textDark
    },
    content: {
        padding: 20,
        paddingBottom: 100
    },

    summaryCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        alignItems: "center"
    },
    iconContainer: {
        marginBottom: 10
    },
    statusText: {
        fontSize: 18,
        color: COLORS.primary,
        marginBottom: 5
    },
    descText: {
        fontSize: 13,
        color: COLORS.textGray
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        color: COLORS.textGray
    },
    valueLarge: {
        fontSize: 20,
        color: COLORS.textDark
    },
    methodBadge: {
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },
    methodText: {
        color: COLORS.primary,
        fontSize: 14
    },

    reminderBox: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        overflow: 'hidden'
    },
    reminderTitle: {
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 5,
        textAlign: 'center'
    },
    reminderText: {
        fontSize: 12,
        color: COLORS.textDark,
        lineHeight: 18,
        textAlign: 'center',
        flexWrap: 'wrap'
    },

    accountCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 2
    },
    scanHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 15,
        gap: 10
    },
    sectionTitle: {
        fontSize: 16,
        color: COLORS.textDark,
    },

    qrContainer: {
        width: '100%',
        height: 350,
        backgroundColor: COLORS.background,
        borderRadius: 15,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    qrImage: {
        width: '100%',
        height: '100%',
    },

    uploadSection: {
        marginBottom: 20
    },
    uploadBox: {
        height: 180,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: "dashed",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
        overflow: 'hidden'
    },
    uploadIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    uploadText: {
        color: COLORS.textGray,
        fontSize: 14
    },
    previewImage: {
        width: "100%",
        height: "100%"
    },

    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 20,
        borderTopColor: "#F1F5F9",
        backgroundColor: COLORS.white
    },
    confirmBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        elevation: 4
    },
    disabledBtn: {
        backgroundColor: COLORS.disabled,
        elevation: 0
    },
    btnText: {
        color: COLORS.white,
        fontSize: 16
    },

    toastContainer: {
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    toastBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.toastBg,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    toastText: {
        color: COLORS.white,
        fontSize: 14,
    }
});