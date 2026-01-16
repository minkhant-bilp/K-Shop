import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import DynamicText from '../ui/dynamic-text/dynamic-text';
interface Props {
    title: string;
    subtitle?: string;
    showBack?: boolean;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightPress?: () => void;
}

const HomeHeader = ({
    title,
    subtitle,
    showBack = true,
    rightIcon = "search",
    onRightPress
}: Props) => {
    const router = useRouter();


    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

    return (
        <>

            <LinearGradient
                colors={["#991b1b", "#dc2626", "#ef4444"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >

                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={styles.headerContent}>
                    {showBack ? (
                        <TouchableOpacity activeOpacity={0.8} onPress={handleBack} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color="#dc2626" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 42 }} />
                    )}

                    <View style={styles.titleContainer}>
                        <DynamicText fontWeight="bold" style={styles.headerTitle}>{title}</DynamicText>
                        {subtitle && <DynamicText style={styles.subTitle}>{subtitle}</DynamicText>}
                    </View>

                    <TouchableOpacity style={styles.iconBtn} onPress={onRightPress}>
                        <Ionicons name={rightIcon} size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    header: {
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        zIndex: 10
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    titleContainer: {
        alignItems: 'center',
        flex: 1
    },
    headerTitle: {
        fontSize: 20,
        color: "white",
        letterSpacing: 0.5
    },
    subTitle: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        marginTop: 2
    },
    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    iconBtn: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center"
    }
});