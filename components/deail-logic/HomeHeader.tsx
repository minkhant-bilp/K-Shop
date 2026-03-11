import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

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
                style={[
                    styles.header,
                    isTablet && { paddingBottom: 30 }
                ]}
            >

                <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                <View style={[
                    styles.headerContent,
                    isTablet && { paddingHorizontal: 32, paddingTop: 15 }
                ]}>

                    {showBack ? (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleBack}
                            style={[styles.backBtn, isTablet && styles.tabletBackBtn]}
                        >
                            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: isTablet ? 50 : 42 }} />
                    )}

                    <View style={styles.titleContainer}>
                        <Text
                            className='font-bold'
                            style={[styles.headerTitle, isTablet && styles.tabletHeaderTitle]}
                        >
                            {title}
                        </Text>

                        {subtitle && (
                            <Text style={[styles.subTitle, isTablet && styles.tabletSubTitle]}>
                                {subtitle}
                            </Text>
                        )}
                    </View>

                </View>
            </LinearGradient>
        </>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    header: {
        paddingBottom: 20,
        borderBottomLeftRadius: isTablet ? 30 : 24,
        borderBottomRightRadius: isTablet ? 30 : 24,
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
        flex: 1,
        right: isTablet ? 20 : 15
    },
    headerTitle: {
        fontSize: 20,
        color: "white",
        letterSpacing: 0.5
    },
    // 🔥 Tablet Font Sizes
    tabletHeaderTitle: {
        fontSize: 28,
        letterSpacing: 0.8
    },
    subTitle: {
        fontSize: 12,
        color: "rgba(255,255,255,0.8)",
        marginTop: 2
    },
    tabletSubTitle: {
        fontSize: 16,
        marginTop: 4
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

    tabletBackBtn: {
        width: 50,
        height: 50,
        borderRadius: 18,
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