import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Alert, Platform, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export interface VoucherData {
    id: string;
    title: string;
    code: string;
    discount: string;
    validUntil: string;
    status: "active" | "used";
}

interface VoucherProps {
    item: VoucherData;
    index: number;
}

const VoucherCard = ({ item, index }: VoucherProps) => {
    const isActive = item.status === "active";

    const handleCopy = async () => {
        await Clipboard.setStringAsync(item.code);
        if (Platform.OS === 'android') {
            ToastAndroid.show("Code Copied!", ToastAndroid.SHORT);
        } else {
            Alert.alert("Copied", "Voucher code copied to clipboard");
        }
    };

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>

            <View style={[styles.wrapper, { opacity: isActive ? 1 : 0.7 }]}>

                <LinearGradient
                    colors={["#991b1b", "#dc2626", "#ef4444"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.container}
                >
                    <View style={styles.leftSection}>
                        <DynamicText fontWeight="bold" style={styles.discountText}>{item.discount}</DynamicText>
                        <DynamicText style={styles.offText}>OFF</DynamicText>
                    </View>

                    <View style={styles.divider}>
                        <View style={[styles.circle, styles.topCircle]} />
                        <View style={styles.dashedLine} />
                        <View style={[styles.circle, styles.bottomCircle]} />
                    </View>

                    <View style={styles.rightSection}>
                        <View>
                            <DynamicText fontWeight="bold" style={styles.title}>{item.title}</DynamicText>
                            <DynamicText style={styles.date}>Valid until {item.validUntil}</DynamicText>
                        </View>

                        <TouchableOpacity
                            style={styles.codeBox}
                            activeOpacity={0.7}
                            onPress={handleCopy}
                            disabled={!isActive}
                        >
                            <DynamicText fontWeight="bold" style={styles.codeText}>{item.code}</DynamicText>
                            <Ionicons name="copy-outline" size={16} color="#dc2626" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

            </View>
        </Animated.View>
    );
};

export default VoucherCard;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        marginHorizontal: 20,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    container: {
        flexDirection: "row",
        height: 110,
        borderRadius: 16,
        overflow: "hidden"
    },
    leftSection: {
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
    },
    discountText: {
        fontSize: 26,
        color: "white",
        fontWeight: "800"
    },
    offText: {
        fontSize: 14,
        color: "rgba(255,255,255,0.9)",
        fontWeight: "600"
    },
    divider: {
        width: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dashedLine: {
        height: "70%",
        width: 1,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.5)",
        borderStyle: "dashed",
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#f8fafc",
        position: "absolute",
        left: -10,
        zIndex: 10
    },
    topCircle: { top: -10 },
    bottomCircle: { bottom: -10 },
    rightSection: {
        flex: 1,
        padding: 16,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 17,
        color: "white",
    },
    date: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        marginTop: 4
    },
    codeBox: {
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 8,
    },
    codeText: {
        color: "#dc2626",
        fontSize: 14,
        letterSpacing: 1
    }
});