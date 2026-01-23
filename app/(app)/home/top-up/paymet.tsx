import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { useWalletStore } from "@/store/useWalletStore";

const { width } = Dimensions.get('window');

const BANK_DATA = {
    MM: {
        name: "KPay",
        accountName: "Daw Mya Mya",
        accountNumber: "09123456789",
    },
    TH: {
        name: "True Money",
        accountName: "Mr. Somchai",
        accountNumber: "081-234-5678",
    }
};

const EXCHANGE_RATE = 115;

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#10b981', backgroundColor: '#1e293b', borderLeftWidth: 5, borderRadius: 12, width: width - 40, height: 70 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
            text2Style={{ fontSize: 12, color: '#cbd5e1' }}
            renderLeadingIcon={() => (
                <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                    <Ionicons name="checkmark-circle" size={28} color="#10b981" />
                </View>
            )}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#ef4444', backgroundColor: '#1e293b', borderLeftWidth: 5, borderRadius: 12, width: width - 40, height: 70 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
            text2Style={{ fontSize: 12, color: '#cbd5e1' }}
            renderLeadingIcon={() => (
                <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                    <Ionicons name="alert-circle" size={28} color="#ef4444" />
                </View>
            )}
        />
    )
};

export default function PhoneBillDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { title, price, phoneNumber, image }: any = params;
    const packageImage = image ? Number(image) : null;

    const buyPhoneBill = useWalletStore((state) => state.buyPhoneBill);

    const [paymentMethod, setPaymentMethod] = useState<"MM" | "TH">("MM");
    const activeBank = BANK_DATA[paymentMethod];

    const [slipImage, setSlipImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const displayPrice = useMemo(() => {
        const numericValue = parseInt(price.replace(/,/g, '').replace(/\D/g, '')) || 0;
        if (paymentMethod === "MM") {
            if (price.includes("Baht")) {
                const kyatAmount = numericValue * EXCHANGE_RATE;
                return `${kyatAmount.toLocaleString()} Ks`;
            }
            return price;
        } else {
            if (price.includes("Ks")) {
                const bahtAmount = numericValue / EXCHANGE_RATE;
                return `${bahtAmount.toFixed(0)} Baht`;
            }
            return price;
        }
    }, [paymentMethod, price]);

    const handleHelpPress = () => {
        Alert.alert(
            "Instructions",
            "1. Please verify the phone number carefully.\n2. Transfer the exact amount shown.\n3. Upload a clear screenshot of the transaction.\n4. Processing time is usually 5-10 minutes.",
            [{ text: "Got it" }]
        );
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(activeBank.accountNumber);
        Toast.show({
            type: 'success',
            text1: 'Copied!',
            text2: `${activeBank.name} number copied to clipboard.`,
            position: 'bottom',
            topOffset: 60,
            visibilityTime: 1500,
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
        });
        if (!result.canceled) {
            setSlipImage(result.assets[0].uri);
        }
    };

    const handleFinalConfirm = () => {
        if (!slipImage) {
            Toast.show({
                type: 'error',
                text1: 'Receipt Required',
                text2: 'Please upload the payment slip.',
                position: 'top',
                topOffset: 60,
                visibilityTime: 2000,
            });
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const numericPrice = parseInt(displayPrice.replace(/,/g, '').replace(/\D/g, '')) || 0;

            buyPhoneBill(
                numericPrice,
                paymentMethod,
                phoneNumber,
                title,
                packageImage || require('@/assets/game_image/photo1.png')
            );

            setLoading(false);

            Toast.show({
                type: 'success',
                text1: 'Order Successful!',
                text2: 'Check your order history.',
                position: 'top',
                topOffset: 60,
                visibilityTime: 1500,
                onHide: () => router.dismissAll()
            });
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#1e293b" />
                </TouchableOpacity>
                <DynamicText fontWeight="bold" fontSize="lg" style={{ color: "#1e293b" }}>Checkout</DynamicText>

                <TouchableOpacity onPress={handleHelpPress} style={styles.backBtn}>
                    <Ionicons name="help-circle-outline" size={24} color="#1e293b" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 150 }}>

                <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
                    <View style={styles.miniOrderCard}>
                        {packageImage && <Image source={packageImage} style={styles.pkgImage} resizeMode="contain" />}
                        <View style={{ marginLeft: 15, flex: 1 }}>
                            <DynamicText style={{ color: "#64748b", fontSize: 12 }}>Top-up to</DynamicText>
                            <DynamicText fontWeight="bold" fontSize="lg" style={{ color: "#1e293b" }}>{phoneNumber}</DynamicText>
                        </View>
                        <View style={styles.badge}>
                            <DynamicText style={{ color: "#1e293b", fontSize: 12, fontWeight: "600" }}>{title}</DynamicText>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(150).springify()} style={{ marginBottom: 20 }}>
                    <View style={styles.selectorContainer}>
                        <TouchableOpacity
                            style={[styles.selectorBtn, paymentMethod === "TH" && styles.activeSelector]}
                            onPress={() => setPaymentMethod("TH")}
                        >
                            <DynamicText style={{ fontSize: 13, fontWeight: "600", color: paymentMethod === "TH" ? "#E11D48" : "#64748b" }}>
                                🇹🇭 Thai Payment
                            </DynamicText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.selectorBtn, paymentMethod === "MM" && styles.activeSelector]}
                            onPress={() => setPaymentMethod("MM")}
                        >
                            <DynamicText style={{ fontSize: 13, fontWeight: "600", color: paymentMethod === "MM" ? "#E11D48" : "#64748b" }}>
                                🇲🇲 MM Payment
                            </DynamicText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.section}>
                    <DynamicText fontWeight="bold" style={styles.sectionTitle}>Transfer Details</DynamicText>

                    <View style={styles.paymentCard}>
                        <View style={styles.amountSection}>
                            <DynamicText style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>Transfer Amount</DynamicText>
                            <DynamicText fontWeight="bold" fontSize="3xl" style={{ color: "#E11D48" }}>{displayPrice}</DynamicText>
                        </View>

                        <View style={styles.dashedDivider}>
                            <View style={[styles.halfCircle, { left: -10 }]} />
                            <View style={[styles.halfCircle, { right: -10 }]} />
                        </View>

                        <View style={styles.accountSection}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                <DynamicText style={{ color: "#64748b", fontSize: 13 }}>To Account</DynamicText>
                                <DynamicText style={{ color: "#64748b", fontSize: 13 }}>{activeBank.name}</DynamicText>
                            </View>

                            <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.7} style={styles.copyRow}>
                                <DynamicText fontWeight="bold" fontSize="2xl" style={{ color: "#1e293b", letterSpacing: 1 }}>
                                    {activeBank.accountNumber}
                                </DynamicText>
                                <View style={styles.copyIconBtn}>
                                    <Ionicons name="copy" size={18} color="#E11D48" />
                                </View>
                            </TouchableOpacity>

                            <DynamicText style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>
                                Name: <DynamicText style={{ color: "#64748b", fontWeight: "600" }}>{activeBank.accountName}</DynamicText>
                            </DynamicText>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.section}>
                    <DynamicText fontWeight="bold" style={styles.sectionTitle}>Payment Slip</DynamicText>

                    <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.uploadArea}>
                        {slipImage ? (
                            <Image source={{ uri: slipImage }} style={styles.uploadedImage} resizeMode="contain" />
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <View style={styles.plusIcon}>
                                    <Ionicons name="cloud-upload-outline" size={28} color="#64748b" />
                                </View>
                                <DynamicText style={{ color: "#64748b", marginTop: 8, fontWeight: "500" }}>Tap to upload receipt</DynamicText>
                            </View>
                        )}
                    </TouchableOpacity>

                    {slipImage && (
                        <TouchableOpacity onPress={pickImage} style={{ alignSelf: "center", marginTop: 12 }}>
                            <DynamicText style={{ color: "#E11D48", fontWeight: "600" }}>Change Photo</DynamicText>
                        </TouchableOpacity>
                    )}
                </Animated.View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleFinalConfirm} disabled={loading} style={styles.shadowWrapper}>
                    <LinearGradient
                        colors={['#ef4444', '#dc2626']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.confirmBtn}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <DynamicText fontWeight="bold" style={{ color: "white", fontSize: 17 }}>Confirm Payment</DynamicText>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Toast config={toastConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 50,
        paddingBottom: 15,
        backgroundColor: "white",
    },
    backBtn: {
        padding: 8
    },

    section: {
        marginBottom: 25
    },
    sectionTitle: {
        fontSize: 16,
        color: "#1e293b",
        marginBottom: 12
    },

    miniOrderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9"
    },
    pkgImage: {
        width: 40,
        height: 40,
        borderRadius: 10
    },
    badge: {
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8
    },

    selectorContainer: {
        flexDirection: 'row',
        backgroundColor: "#f8fafc",
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: "#f1f5f9"
    },
    selectorBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    activeSelector: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1
    },

    paymentCard: {
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden'
    },
    amountSection: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#fff1f2",
    },
    dashedDivider: {
        height: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderStyle: 'dashed',
        position: 'relative',
        backgroundColor: "white",
        zIndex: 1
    },
    halfCircle: {
        position: 'absolute',
        top: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ffffff"
    },
    accountSection: {
        padding: 20,
        backgroundColor: "white"
    },
    copyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingVertical: 5
    },
    copyIconBtn: {
        padding: 8,
        backgroundColor: "#fff1f2",
        borderRadius: 10
    },

    uploadArea: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: "#f8fafc",
        borderWidth: 1.5,
        borderColor: "#e2e8f0",
        borderStyle: "dashed"
    },
    uploadPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.05,
        elevation: 2
    },
    uploadedImage: {
        width: '100%',
        height: '100%'
    },

    footer: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },
    shadowWrapper: {
        shadowColor: "#ef4444",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
        borderRadius: 16,
    },
    confirmBtn: {
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    }
});