import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";

const COLORS = {
    background: "#ffffff",
    primary: "#e11d48",
    border: "#f1f5f9",
    lightBtn: "#fff1f2"
};

const HomeHeader = () => {
    const router = useRouter();

    const hasUnread = true;

    const rotation = useSharedValue(0);

    useEffect(() => {
        if (hasUnread) {
            rotation.value = withRepeat(
                withSequence(
                    withDelay(
                        5000,
                        withSequence(
                            withTiming(-15, { duration: 100 }),
                            withTiming(15, { duration: 100 }),
                            withTiming(-15, { duration: 100 }),
                            withTiming(15, { duration: 100 }),
                            withTiming(0, { duration: 100 })
                        )
                    )
                ),
                -1,
                false
            );
        } else {
            cancelAnimation(rotation);
            rotation.value = 0;
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    return (
        <View style={styles.headerWrapper}>
            <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

            <View style={styles.container}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.iconBtn}
                    onPress={() => {
                        if (router.canGoBack()) router.back();
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
                </TouchableOpacity>

                <View style={styles.rightContainer}>

                    <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
                        <Animated.View style={animatedStyle}>
                            <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
                        </Animated.View>

                        {hasUnread && <View style={styles.dot} />}
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 100,
        shadowColor: "#e11d48",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: COLORS.lightBtn,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ffe4e6"
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    dot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        borderWidth: 1.5,
        borderColor: COLORS.lightBtn
    }
});

export default HomeHeader;