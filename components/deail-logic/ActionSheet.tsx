import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    SlideInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import DynamicText from "../ui/dynamic-text/dynamic-text";


type PackageItem = { id: number; amount: string; price: string; image: any; };
type PaymentMethod = { id: string; name: string; image: any; };

type PurchaseActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (paymentId: string) => void;
    item: PackageItem | undefined;
    userId: string;
    zoneId: string;
    paymentMethods: PaymentMethod[];
};


const PaymentCard = ({ payment, isSelected, onPress, index }: { payment: PaymentMethod, isSelected: boolean, onPress: () => void, index: number }) => {

    const scale = useSharedValue(1);
    useEffect(() => { scale.value = withSpring(isSelected ? 1.02 : 1); }, [isSelected]);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        borderColor: withTiming(isSelected ? "#e11d48" : "#e2e8f0", { duration: 200 }),
        backgroundColor: withTiming(isSelected ? "#fff1f2" : "#f8fafc", { duration: 200 }),
        borderWidth: 2,
    }));

    return (
        <Animated.View entering={FadeInDown.delay(index * 50).duration(400).easing(Easing.out(Easing.quad))} style={styles.paymentWrapper}>

            <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
                <Animated.View style={[styles.paymentCardInner, animatedStyle]}>
                    <Image source={payment.image} style={styles.paymentImage} resizeMode="contain" />
                    <DynamicText style={isSelected ? styles.paymentTextSelected : styles.paymentTextNormal}>{payment.name}</DynamicText>
                    {isSelected && <Animated.View entering={FadeIn} style={styles.dotSelected} />}
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default function ActionSheet({ visible, onClose, onSubmit, item, userId, zoneId, paymentMethods }: PurchaseActionSheetProps) {
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    useEffect(() => { if (!visible) setSelectedPayment(null); }, [visible]);

    if (!item) return null;

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose} />
            <Animated.View entering={SlideInDown.duration(250).easing(Easing.out(Easing.quad))} style={styles.sheetContainer}>
                <View style={styles.sheetHandle} />
                <View style={styles.sheetContent}>
                    <DynamicText fontWeight="bold" style={styles.sheetTitle}>Select Payment</DynamicText>


                    <View style={styles.idBadgeContainer}>
                        <DynamicText style={styles.idLabel}>ID: </DynamicText>
                        <DynamicText fontWeight="bold" style={styles.idValue}>{userId} ({zoneId})</DynamicText>
                    </View>


                    <View style={styles.itemRow}>
                        <Image source={item.image} style={styles.sheetImage} resizeMode="contain" />
                        <View>
                            <DynamicText fontWeight="bold" style={styles.sheetAmount}>{item.amount}</DynamicText>
                            <DynamicText style={styles.sheetPriceLabel}>Total: <DynamicText fontWeight="bold" style={styles.sheetPriceValue}>{item.price}</DynamicText>
                            </DynamicText>
                        </View>
                    </View>

                    <View style={styles.divider} />
                    <View style={styles.paymentContainer}>
                        {paymentMethods.map((payment, index) => (
                            <PaymentCard
                                key={payment.id} index={index} payment={payment}
                                isSelected={selectedPayment === payment.id}
                                onPress={() => setSelectedPayment(payment.id)}
                            />
                        ))}
                    </View>


                    <TouchableOpacity
                        style={selectedPayment ? styles.sheetConfirmBtn : styles.sheetConfirmBtnDisabled}
                        disabled={!selectedPayment}
                        onPress={() => {
                            if (selectedPayment) {
                                onSubmit(selectedPayment);
                            }
                        }}
                    >
                        <DynamicText fontWeight="bold" style={styles.sheetConfirmText}>
                            {selectedPayment ? "Continue" : "Select Payment First"}
                        </DynamicText>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    sheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 60,
        alignItems: 'center',
        elevation: 50,
        zIndex: 999
    },
    sheetHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#cbd5e1',
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10
    },
    sheetContent: {
        width: '100%'
    },
    sheetTitle: {
        fontSize: 18,
        color: '#334155',
        marginBottom: 10,
        textAlign: "center"
    },
    idBadgeContainer: {
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "#f1f5f9",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e2e8f0"
    },
    idLabel: {
        fontSize: 14,
        color: "#64748b"
    },
    idValue: {
        fontSize: 14,
        color: "#0f172a"
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
    },
    sheetImage: {
        width: 60,
        height: 60,
        marginRight: 16
    },
    sheetAmount: {
        fontSize: 20,
        color: '#0f172a'
    },
    sheetPriceLabel: {
        fontSize: 14,
        color: '#64748b'
    },
    sheetPriceValue: {
        color: "#e11d48"
    },
    divider: {
        height: 1,
        backgroundColor: "#f1f5f9",
        width: "100%",
        marginBottom: 16
    },
    paymentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
        marginBottom: 20
    },
    paymentWrapper: {
        width: '48%'
    },
    paymentCardInner: {
        width: '100%',
        padding: 12,
        borderRadius: 12,
        alignItems: "center"
    },
    paymentImage: {
        width: 30,
        height: 30,
        marginBottom: 8
    },
    paymentTextNormal: {
        fontSize: 12,
        color: "#64748b"
    },
    paymentTextSelected: {
        fontSize: 12,
        color: "#e11d48",
        fontWeight: "bold"
    },
    dotSelected: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#e11d48"
    },
    sheetConfirmBtn: {
        width: '100%',
        backgroundColor: '#e11d48',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center'
    },
    sheetConfirmBtnDisabled: {
        width: '100%',
        backgroundColor: '#cbd5e1',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center'
    },
    sheetConfirmText: {
        color: 'white',
        fontSize: 16
    },
});