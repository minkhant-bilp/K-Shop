import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import DynamicText from "../ui/dynamic-text/dynamic-text";

type ListHeaderProps = {
    userId: string;
    setUserId: (text: string) => void;
    zoneId: string;
    setZoneId: (text: string) => void;
};

export default function ListHeader({ userId, setUserId, zoneId, setZoneId }: ListHeaderProps) {
    return (
        <View>
            <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.stepContainer}>
                <View style={styles.stepTitleRow}>
                    <View style={styles.stepBadge}>
                        <DynamicText fontWeight="bold" style={styles.stepBadgeText}>1</DynamicText>
                    </View>
                    <DynamicText fontWeight="bold" style={styles.stepTitleText}>Enter User ID</DynamicText>
                </View>

                <View style={styles.inputRow}>

                    <TextInput
                        placeholder="User ID"
                        placeholderTextColor="gray"
                        style={styles.inputFlex}
                        value={userId}
                        keyboardType="numeric"
                        onChangeText={(text) => setUserId(text.replace(/[^0-9]/g, ''))}
                    />
                    <TextInput
                        placeholder="Zone ID"
                        placeholderTextColor="gray"
                        style={styles.inputFixed}
                        value={zoneId}
                        keyboardType="numeric"
                        onChangeText={(text) => setZoneId(text.replace(/[^0-9]/g, ''))}
                    />
                </View>
            </Animated.View>

            <View style={styles.stepTitleRowMargin}>
                <View style={styles.stepBadge}>
                    <DynamicText fontWeight="bold" style={styles.stepBadgeText}>2</DynamicText>
                </View>
                <DynamicText fontWeight="bold" style={styles.stepTitleText}>Select Recharge</DynamicText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 1
    },
    stepTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12
    },
    stepTitleRowMargin: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        paddingHorizontal: 4
    },
    stepBadge: {
        width: 24,
        height: 24,
        backgroundColor: "#e11d48",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8
    },
    stepBadgeText: {
        color: "white",
        fontSize: 12
    },
    stepTitleText: {
        fontSize: 16,
        color: "#334155"
    },
    inputRow: {
        flexDirection: "row",
        gap: 10
    },
    inputFlex: {
        flex: 1,
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        color: "black"
    },
    inputFixed: {
        width: 100,
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        color: "black"
    },
});