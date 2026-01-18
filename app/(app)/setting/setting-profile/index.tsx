import EditProfileItem from '@/components/common/profile-logic/EditProfileItem';
import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
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
    View
} from 'react-native';

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
                    style={styles.header}
                >
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    <View style={styles.headerTop}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color="#dc2626" />
                        </TouchableOpacity>
                        <DynamicText fontWeight="bold" style={styles.headerTitle}>Edit Profile</DynamicText>
                        <TouchableOpacity style={styles.saveBtn}>
                            <DynamicText fontWeight="bold" style={styles.saveText}>Save</DynamicText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileSection}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("@/assets/game_image/photo1.png")}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                                <Ionicons name="camera" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                        <DynamicText style={styles.userIdText}>ID: @tgi72505</DynamicText>
                    </View>
                </LinearGradient>

                <ScrollView
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
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

                </ScrollView>
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
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
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
        backgroundColor: "#F8FAFC",
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
    }
});