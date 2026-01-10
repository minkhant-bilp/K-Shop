import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Platform,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import Animated, { Easing, SlideInDown } from "react-native-reanimated";
import DynamicText from "../ui/dynamic-text/dynamic-text";


type PackageItem = {
    id: number;
    amount: string;
    price: string;
    image: any;
};

type PaymentMethod = {
    id: string;
    name: string;
    image: any;
};

type ConfirmationActionSheetProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: (slipImage: string | null) => void;
    item?: PackageItem;
    payment?: PaymentMethod;
    userId: string;
    zoneId: string;
};



export default function ConfirmationActionSheet({
    visible,
    onClose,
    onConfirm,
    item,
    payment,
}: ConfirmationActionSheetProps) {
    const [slipImage, setSlipImage] = useState<string | null>(null);
    const RECEIVER_PHONE = "09759395923";


    useEffect(() => {
        (async () => {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission Required", "Gallery access လိုအပ်ပါတယ်");
            }
        })();
    }, []);


    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setSlipImage(result.assets[0].uri);
            }
        } catch {
            Alert.alert("Error", "ပုံရွေးမရပါ");
        }
    };


    const handleCopy = async () => {
        await Clipboard.setStringAsync(RECEIVER_PHONE);

        // Copy ကူးပြီးကြောင်း အသိပေးမယ်
        if (Platform.OS === 'android') {
            ToastAndroid.show("ဖုန်းနံပါတ် Copy ကူးပြီးပါပြီ", ToastAndroid.SHORT);
        }

    };

    if (!item || !payment) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >

            <TouchableOpacity
                style={styles.modalBackdrop}
                activeOpacity={1}
                onPress={onClose}
            />

            <Animated.View
                entering={SlideInDown.duration(300).easing(Easing.out(Easing.quad))}
                style={styles.sheetContainer}
            >
                <View style={styles.sheetHandle} />
                <DynamicText fontWeight="bold" style={styles.sheetTitle}>
                    Review Order
                </DynamicText>

                <View style={styles.sheetContent}>

                    <View style={styles.summaryCard}>
                        <DynamicText style={styles.label}>Product</DynamicText>
                        <View style={styles.row}>
                            <Image source={item.image} style={styles.smallIcon} />
                            <DynamicText fontWeight="bold">{item.amount}</DynamicText>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <DynamicText style={styles.label}>Payment Method</DynamicText>
                        <View style={styles.row}>
                            <Image source={payment.image} style={styles.smallIcon} />
                            <DynamicText fontWeight="bold">{payment.name}</DynamicText>
                        </View>
                    </View>

                    <View style={styles.summaryCard}>
                        <DynamicText style={styles.label}>Transfer To</DynamicText>

                        <TouchableOpacity
                            style={styles.copyRow}
                            onPress={handleCopy}
                            activeOpacity={0.6}
                        >
                            <Ionicons
                                name="copy-outline"
                                size={16}
                                color="#64748b"
                                style={{ marginRight: 6 }}
                            />
                            <DynamicText fontWeight="bold" style={{ marginRight: 4 }}>
                                {RECEIVER_PHONE}
                            </DynamicText>

                        </TouchableOpacity>
                    </View>

                    {/* Upload */}
                    <TouchableOpacity
                        style={styles.uploadContainer}
                        onPress={pickImage}
                        activeOpacity={0.8}>
                        {slipImage ? (
                            <Image source={{ uri: slipImage }} style={styles.uploadedImage} />
                        ) : (
                            <View style={styles.uploadPlaceholder}>
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={32}
                                    color="#94a3b8"
                                />
                                <DynamicText style={styles.uploadText}>
                                    Upload Payment Slip
                                </DynamicText>
                            </View>
                        )}

                        {slipImage && (
                            <View style={styles.editIconBadge}>
                                <Ionicons name="pencil" size={12} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.divider} />


                    <View style={styles.totalRow}>
                        <DynamicText>Total Amount</DynamicText>
                        <DynamicText fontWeight="bold" style={styles.totalValue}>
                            {item.price}
                        </DynamicText>
                    </View>


                    <TouchableOpacity
                        style={slipImage ? styles.payNowBtn : styles.payNowBtnDisabled}
                        disabled={!slipImage}
                        onPress={() => onConfirm(slipImage)}
                    >
                        <DynamicText fontWeight="bold" style={styles.payNowText}>
                            {slipImage ? "Confirm Payment" : "Please Upload Slip"}
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
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheetContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        paddingBottom: 60
    },
    sheetHandle: {
        width: 40,
        height: 5,
        backgroundColor: "#cbd5e1",
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 10,
    },
    sheetTitle: {
        textAlign: "center",
        fontSize: 18,
        marginBottom: 20,
    },
    sheetContent: {
        width: "100%",
    },
    summaryCard: {
        backgroundColor: "#f8fafc",
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center" // Center alignment
    },
    label: {
        color: "#64748b",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    copyRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },

    smallIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    uploadContainer: {
        height: 120,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#cbd5e1",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        overflow: "hidden",
    },
    uploadPlaceholder: {
        alignItems: "center",
    },
    uploadText: {
        marginTop: 8,
        color: "#64748b",
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
    },
    editIconBadge: {
        position: "absolute",
        right: 8,
        bottom: 8,
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 6,
        borderRadius: 20,
    },
    divider: {
        height: 1,
        backgroundColor: "#e2e8f0",
        marginVertical: 16,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    totalValue: {
        fontSize: 22,
        color: "#e11d48",
    },
    payNowBtn: {
        backgroundColor: "#e11d48",
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    payNowBtnDisabled: {
        backgroundColor: "#cbd5e1",
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    payNowText: {
        color: "white",
        fontSize: 16,
    },
});