import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// 🔥 Screen Width ယူပြီး Tablet လား စစ်မယ်
const { width } = Dimensions.get("window");
const isTablet = width > 600;

type ListHeaderProps = {
    userId: string;
    setUserId: (text: string) => void;
    zoneId: string;
    setZoneId: (text: string) => void;
};

export default function ListHeader({ userId, setUserId, zoneId, setZoneId }: ListHeaderProps) {
    return (
        <View>
            <Animated.View
                entering={FadeInDown.delay(100).duration(500)}
                style={[styles.stepContainer, isTablet && styles.stepContainerTablet]}
            >
                <View style={styles.stepTitleRow}>
                    <View style={[styles.stepBadge, isTablet && styles.stepBadgeTablet]}>
                        <Text className="font-old" style={[styles.stepBadgeText, isTablet && styles.stepBadgeTextTablet]}>1</Text>
                    </View>
                    <Text className="font-bold" style={[styles.stepTitleText, isTablet && styles.stepTitleTextTablet]}>Enter User ID</Text>
                </View>

                <View style={[styles.inputRow, isTablet && { gap: 20 }]}>
                    <TextInput
                        placeholder="User ID"
                        placeholderTextColor="gray"
                        style={[styles.inputFlex, isTablet && styles.inputTablet]} // Tablet Style
                        value={userId}
                        keyboardType="numeric"
                        onChangeText={(text) => setUserId(text.replace(/[^0-9]/g, ''))}
                    />
                    <TextInput
                        placeholder="Zone ID"
                        placeholderTextColor="gray"
                        style={[styles.inputFixed, isTablet && styles.inputFixedTablet]} // Tablet Style
                        value={zoneId}
                        keyboardType="numeric"
                        onChangeText={(text) => setZoneId(text.replace(/[^0-9]/g, ''))}
                    />
                </View>
            </Animated.View>

            <View style={styles.stepTitleRowMargin}>
                <View style={[styles.stepBadge, isTablet && styles.stepBadgeTablet]}>
                    <Text className="font-bold" style={[styles.stepBadgeText, isTablet && styles.stepBadgeTextTablet]}>2</Text>
                </View>
                <Text className="font-bold" style={[styles.stepTitleText, isTablet && styles.stepTitleTextTablet]}>Select Recharge</Text>
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
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    // 🔥 Tablet Padding
    stepContainerTablet: {
        padding: 24,
        marginBottom: 24,
        borderRadius: 20,
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

    // Badge Styles
    stepBadge: {
        width: 24,
        height: 24,
        backgroundColor: "#e11d48",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8
    },
    // 🔥 Tablet Badge Size
    stepBadgeTablet: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12
    },

    stepBadgeText: {
        color: "white",
        fontSize: 12
    },
    // 🔥 Tablet Badge Font
    stepBadgeTextTablet: {
        fontSize: 16,
    },

    stepTitleText: {
        fontSize: 16,
        color: "#334155"
    },
    // 🔥 Tablet Title Font
    stepTitleTextTablet: {
        fontSize: 22,
    },

    inputRow: {
        flexDirection: "row",
        gap: 10
    },

    // Input Styles
    inputFlex: {
        flex: 1,
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        color: "black",
        fontSize: 14,
    },
    inputFixed: {
        width: 100,
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        padding: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        color: "black",
        fontSize: 14,
    },

    // 🔥 Tablet Input Styles (Bigger & Taller)
    inputTablet: {
        padding: 18,
        fontSize: 18,
        borderRadius: 14,
    },
    inputFixedTablet: {
        width: 160, // Zone ID box wide ပိုကျယ်မယ်
        padding: 18,
        fontSize: 18,
        borderRadius: 14,
    }
});