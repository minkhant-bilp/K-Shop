import EditProfileItem from '@/components/common/profile-logic/EditProfileItem';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Keyboard,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    Text
} from 'react-native';

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const CONTENT_MAX_WIDTH = 600;

const SettingProfile = () => {
    const router = useRouter();

    const [name, setName] = useState("Aung Myo Khant");
    const [email] = useState("aungmyokhant459@gmail.com");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScreenWrapper headerShown={false} isSafeArea={false}>

                <Stack.Screen options={{ headerShown: false }} />

                <LinearGradient
                    colors={["#991b1b", "#dc2626", "#ef4444"]}
                    style={[styles.header, isTablet && { paddingBottom: 50, alignItems: 'center' }]} // Tablet Header Padding & Center
                >
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    <View style={[styles.headerTop, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0, marginTop: 10 }]}>
                        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                        </TouchableOpacity>
                        <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>Edit Profile</Text>
                        <TouchableOpacity style={[styles.saveBtn, isTablet && { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 25 }]}>
                            <Text className='font-bold' style={[styles.saveText, isTablet && { fontSize: 16 }]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.profileSection, isTablet && { marginTop: 30 }]}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("@/assets/game_image/photo1.png")}
                                style={[styles.profileImage, isTablet && { width: 160, height: 160, borderRadius: 80 }]}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.cameraBtn,
                                    isTablet && { width: 46, height: 46, borderRadius: 23, borderWidth: 4 }
                                ]}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="camera" size={isTablet ? 24 : 18} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.userIdText, isTablet && { fontSize: 18, marginTop: 10 }]}>ID: @tgi72505</Text>
                    </View>
                </LinearGradient>

                <View style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: 'center' }}>
                    <ScrollView
                        style={[styles.body, isTablet && { width: CONTENT_MAX_WIDTH, marginTop: -40, paddingHorizontal: 0 }]}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >
                        <View style={isTablet && { gap: 20 }}>
                            <EditProfileItem
                                label="Full Name"
                                value={name}
                                placeholder="Enter your name"
                                icon="person-outline"
                                onChangeText={setName}
                            />

                            <EditProfileItem
                                label="Email Address"
                                value={email}
                                placeholder="Enter email address"
                                icon="mail-outline"
                                isEditable={false}
                            />
                        </View>

                    </ScrollView>
                </View>
            </ScreenWrapper>
        </TouchableWithoutFeedback>
    );
};

export default SettingProfile;

const styles = StyleSheet.create({
    header: {
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 10,
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        width: '100%'
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        width: '100%'
    },
    headerTitle: {
        fontSize: 20,
        color: "white",
        letterSpacing: 0.5
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    saveBtn: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)"
    },
    saveText: {
        color: "white",
        fontSize: 14
    },
    profileSection: {
        alignItems: "center",
        marginTop: 20
    },
    imageContainer: {
        position: "relative",
        marginBottom: 10
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: "rgba(255,255,255,0.3)"
    },
    cameraBtn: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#0f172a",
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#dc2626"
    },
    userIdText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 5
    },
    body: {
        flex: 1,
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
        width: '100%'
    }
});