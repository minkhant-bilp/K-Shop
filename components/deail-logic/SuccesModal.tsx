import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated"; // 🔥 Animation တစ်ခုတည်းယူမယ်
import DynamicText from "../ui/dynamic-text/dynamic-text";

type PackageItem = { id: number; amount: string; price: string; image: any; };
type PaymentMethod = { id: string; name: string; image: any; };

type SuccessModalProps = {
    visible: boolean;
    onClose: () => void;
    item?: PackageItem;
    payment?: PaymentMethod;
};

export default function SuccessModal({ visible, onClose, item, payment }: SuccessModalProps) {
    const today = new Date().toLocaleDateString();
    const transactionID = "9231 5213 " + Math.floor(1000 + Math.random() * 9000);

    return (
        <Modal visible={visible} animationType="fade" transparent={false}>
            <View style={styles.container}>


                <View style={styles.headerSection}>

                    <Animated.View
                        entering={ZoomIn.springify().damping(12).mass(1)}
                        style={styles.iconCircle}
                    >
                        <Ionicons name="checkmark" size={45} color="#ea580c" />
                    </Animated.View>

                    <DynamicText fontWeight="bold" style={styles.title}>Payment Successful</DynamicText>
                    <DynamicText style={styles.subtitle}>Thanks for your order, it now confirmed.</DynamicText>
                </View>

                {/* Receipt Card (အသေ - Animation မပါ) */}
                <View style={styles.receiptCard}>
                    <DynamicText fontWeight="bold" style={styles.cardTitle}>Payment details</DynamicText>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Transaction ID</DynamicText>
                        <DynamicText fontWeight="bold" style={styles.value}>{transactionID}</DynamicText>
                    </View>

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Date</DynamicText>
                        <DynamicText fontWeight="bold" style={styles.value}>{today}</DynamicText>
                    </View>

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Payment Method</DynamicText>
                        <View style={styles.methodBadge}>
                            {payment?.image && <Image source={payment.image} style={styles.miniIcon} />}
                            <DynamicText fontWeight="bold" style={styles.value}>{payment?.name || "Wallet"}</DynamicText>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Total</DynamicText>
                        <DynamicText fontWeight="bold" style={styles.totalValue}>{item?.price}</DynamicText>
                    </View>

                    <View style={styles.row}>
                        <DynamicText style={styles.label}>Status</DynamicText>
                        <View style={styles.successBadge}>
                            <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
                            <DynamicText fontWeight="bold" style={styles.successText}>Success</DynamicText>
                        </View>
                    </View>
                </View>{/* Continue Button (အသေ) */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.9}>
                        <DynamicText fontWeight="bold" style={styles.buttonText}>Continue</DynamicText>
                        <Ionicons name="arrow-forward" size={20} color="#ea580c" />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "red", padding: 20, justifyContent: "center", alignItems: "center" },

    // Header
    headerSection: { alignItems: "center", marginBottom: 30 },
    iconCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6
    },
    title: { fontSize: 22, color: "white", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "rgba(255,255,255,0.9)" },

    // Receipt Card
    receiptCard: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 24,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
    cardTitle: { fontSize: 16, color: "#334155", marginBottom: 12 },
    divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 12 },

    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },

    label: { color: "#64748b", fontSize: 14 },

    value: { color: "#0f172a", fontSize: 14 },

    totalValue: { color: "#0f172a", fontSize: 18 },


    methodBadge: { flexDirection: "row", alignItems: "center" },

    miniIcon: { width: 20, height: 20, marginRight: 6 },


    successBadge: { flexDirection: "row", alignItems: "center" },

    successText: { color: "#16a34a", marginLeft: 4 },


    footer: { position: "absolute", bottom: 40, width: "100%" },
    button: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 50,
        width: "100%"
    },
    buttonText: { color: "#ea580c", fontSize: 16, marginRight: 8 }
});