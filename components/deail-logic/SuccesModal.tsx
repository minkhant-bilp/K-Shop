import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View, Dimensions, Text } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

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

                <View style={[styles.contentWrapper, isTablet && styles.tabletWrapper]}>

                    <View style={styles.headerSection}>
                        <Animated.View
                            entering={ZoomIn.springify().damping(12).mass(1)}
                            style={[styles.iconCircle, isTablet && { width: 120, height: 120, borderRadius: 60, marginBottom: 30 }]}
                        >
                            <Ionicons name="checkmark" size={isTablet ? 60 : 45} color="#ea580c" />
                        </Animated.View>

                        <Text className='font-bold' style={[styles.title, isTablet && { fontSize: 32 }]}>Payment Successful</Text>
                        <Text style={[styles.subtitle, isTablet && { fontSize: 18, marginTop: 5 }]}>Thanks for your order, it now confirmed.</Text>
                    </View>

                    <View style={[styles.receiptCard, isTablet && { padding: 40, borderRadius: 30 }]}>
                        <Text className='font-bold' style={[styles.cardTitle, isTablet && { fontSize: 20, marginBottom: 20 }]}>Payment details</Text>

                        <View style={styles.divider} />

                        <View style={[styles.row, isTablet && { marginBottom: 20 }]}>
                            <Text style={[styles.label, isTablet && { fontSize: 16 }]}>Transaction ID</Text>
                            <Text className='font-bold' style={[styles.value, isTablet && { fontSize: 16 }]}>{transactionID}</Text>
                        </View>

                        <View style={[styles.row, isTablet && { marginBottom: 20 }]}>
                            <Text style={[styles.label, isTablet && { fontSize: 16 }]}>Date</Text>
                            <Text className='font-bold' style={[styles.value, isTablet && { fontSize: 16 }]}>{today}</Text>
                        </View>

                        <View style={[styles.row, isTablet && { marginBottom: 20 }]}>
                            <Text style={[styles.label, isTablet && { fontSize: 16 }]}>Payment Method</Text>
                            <View style={styles.methodBadge}>
                                {payment?.image && <Image source={payment.image} style={[styles.miniIcon, isTablet && { width: 30, height: 30 }]} />}
                                <Text className='font-bold' style={[styles.value, isTablet && { fontSize: 16 }]}>{payment?.name || "Wallet"}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={[styles.row, isTablet && { marginBottom: 20 }]}>
                            <Text style={[styles.label, isTablet && { fontSize: 16 }]}>Total</Text>
                            <Text className='font-bold' style={[styles.totalValue, isTablet && { fontSize: 24 }]}>{item?.price}</Text>
                        </View>

                        <View style={[styles.row, isTablet && { marginBottom: 10 }]}>
                            <Text style={[styles.label, isTablet && { fontSize: 16 }]}>Status</Text>
                            <View style={styles.successBadge}>
                                <Ionicons name="checkmark-circle" size={isTablet ? 20 : 16} color="#16a34a" />
                                <Text className='font-bold' style={[styles.successText, isTablet && { fontSize: 16 }]}>Success</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.footer, isTablet && { marginTop: 40 }]}>
                        <TouchableOpacity
                            style={[styles.button, isTablet && { paddingVertical: 20, borderRadius: 25 }]}
                            onPress={onClose}
                            activeOpacity={0.9}
                        >
                            <Text className='font-bold' style={[styles.buttonText, isTablet && { fontSize: 20 }]}>Continue</Text>
                            <Ionicons name="arrow-forward" size={isTablet ? 24 : 20} color="#ea580c" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E11D48",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },


    contentWrapper: {
        width: '100%',
        alignItems: 'center'
    },
    tabletWrapper: {
        width: 600,
    },

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
    title: {
        fontSize: 22,
        color: "white",
        marginBottom: 8
    },
    subtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.9)"
    },

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
    cardTitle: {
        fontSize: 16,
        color: "#334155",
        marginBottom: 12
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        marginVertical: 12
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
    },

    label: {
        color: "#64748b",
        fontSize: 14
    },

    value: {
        color: "#0f172a",
        fontSize: 14
    },

    totalValue: {
        color: "#0f172a",
        fontSize: 18
    },

    methodBadge: {
        flexDirection: "row",
        alignItems: "center"
    },

    miniIcon: {
        width: 20,
        height: 20,
        marginRight: 6
    },

    successBadge: {
        flexDirection: "row",
        alignItems: "center"
    },

    successText: {
        color: "#16a34a",
        marginLeft: 4
    },

    footer: {
        marginTop: 40,
        width: "100%"
    },
    button: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 50,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    buttonText: {
        color: "#ea580c",
        fontSize: 16,
        marginRight: 8
    }
});