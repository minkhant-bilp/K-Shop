import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Keyboard,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

import useTranslation from "@/structure/hooks/useTranslation";

const { width } = Dimensions.get("window");
const isTablet = width > 600;
const CONTENT_MAX_WIDTH = 600;

export default function Bugs() {
    const router = useRouter();
    const { t } = useTranslation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = () => {
        if (!title || !description) {
            Alert.alert(t.required || "Required", t.requiredFields || "Please fill in all fields.");
            return;
        }

        setShowSuccess(true);
    };

    const handleClose = () => {
        setShowSuccess(false);
        router.back();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScreenWrapper headerShown={false} isSafeArea={false}>

                <Stack.Screen options={{ headerShown: false }} />

                <LinearGradient
                    colors={["#991b1b", "#dc2626", "#ef4444"]}
                    style={[styles.header, isTablet && { paddingBottom: 60, alignItems: 'center' }]}
                >
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0, marginTop: 10 }]}>
                        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                        </TouchableOpacity>
                        <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>
                            {t.reportBugTitle || "Report a Bug"}
                        </Text>
                        <View style={{ width: isTablet ? 50 : 40 }} />
                    </View>

                    <View style={styles.heroSection}>
                        <Text style={[styles.heroText, isTablet && { fontSize: 18, lineHeight: 28 }]}>
                            {t.bugHeroText || "တွေ့ရှိထားသော အမှားအယွင်းများကို\nအောက်ပါအတိုင်း ဖြည့်စွက်ပေးပါ"}
                        </Text>
                    </View>
                </LinearGradient>

                <View style={{ flex: 1, backgroundColor: "#F8FAFC", alignItems: 'center' }}>
                    <ScrollView
                        style={[styles.body, isTablet && { width: CONTENT_MAX_WIDTH, marginTop: -40, paddingHorizontal: 0 }]}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >
                        <View style={[styles.inputGroup, isTablet && { marginBottom: 25 }]}>
                            <Text className='font-bold' style={[styles.label, isTablet && { fontSize: 16, marginBottom: 10 }]}>
                                {t.issueTitle || "Issue Title"}
                            </Text>
                            <View style={[styles.inputBox, isTablet && { height: 65, paddingHorizontal: 20 }]}>
                                <Ionicons name="alert-circle-outline" size={isTablet ? 24 : 20} color="#E11D48" style={{ marginRight: 10 }} />
                                <TextInput
                                    style={[styles.input, isTablet && { fontSize: 18 }]}
                                    placeholder={t.issuePlaceholder || "e.g., Cannot top up diamonds"}
                                    placeholderTextColor="#94a3b8"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputGroup, isTablet && { marginBottom: 25 }]}>
                            <Text className='font-bold' style={[styles.label, isTablet && { fontSize: 16, marginBottom: 10 }]}>
                                {t.descriptionLabel || "Description"}
                            </Text>
                            <View style={[styles.inputBox, styles.textAreaBox, isTablet && { height: 200 }]}>
                                <TextInput
                                    style={[styles.input, styles.textArea, isTablet && { fontSize: 18 }]}
                                    placeholder={t.descPlaceholder || "Please describe what happened..."}
                                    placeholderTextColor="#94a3b8"
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSubmit}
                            style={styles.submitBtnContainer}
                        >
                            <LinearGradient
                                colors={["#E11D48", "#be123c"]}
                                style={[styles.submitBtn, isTablet && { paddingVertical: 18, borderRadius: 20 }]}
                            >
                                <Text className='font-bold' style={[styles.submitText, isTablet && { fontSize: 18 }]}>
                                    {t.submitReport || "Submit Report"}
                                </Text>
                                <Ionicons name="paper-plane-outline" size={isTablet ? 24 : 20} color="white" style={{ marginLeft: 8 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <Modal visible={showSuccess} transparent animationType="fade">
                    <View style={styles.modalOverlay}>
                        <Animated.View
                            entering={ZoomIn.duration(400).springify()}
                            style={[styles.modalContent, isTablet && { width: 500, padding: 40 }]}
                        >
                            <LinearGradient
                                colors={["#FEF2F2", "#FFF"]}
                                style={styles.modalIconBg}
                            >
                                <Ionicons name="checkmark-done-circle" size={60} color="#E11D48" />
                            </LinearGradient>

                            <Text className='font-bold' style={styles.modalTitle}>
                                {t.reportSent || "Report Sent!"}
                            </Text>
                            <Text style={styles.modalDesc}>
                                {t.reportSuccessDesc || "Thank you for helping us improve. Our team will look into this issue immediately."}
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.modalBtn}
                                onPress={handleClose}
                            >
                                <LinearGradient
                                    colors={["#E11D48", "#be123c"]}
                                    style={styles.modalBtnGradient}
                                >
                                    <Text className='font-bold' style={styles.modalBtnText}>
                                        {t.backToSettings || "Back to Settings"}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>

            </ScreenWrapper>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 10,
        shadowColor: "#dc2626",
        elevation: 10,
        width: '100%'
    },
    headerContent: {
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
        justifyContent: "center"
    },
    heroSection: {
        alignItems: "center",
        marginTop: 15
    },
    heroText: {
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
        lineHeight: 22
    },
    body: {
        flex: 1,
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
        width: '100%'
    },
    inputGroup: {
        marginBottom: 20
    },
    label: {
        color: "#334155",
        marginBottom: 8,
        fontSize: 14
    },
    inputBox: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#f1f5f9",
        elevation: 2
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#0f172a",
        height: "100%"
    },
    textAreaBox: {
        height: 150,
        alignItems: "flex-start",
        paddingTop: 15
    },
    textArea: {
        height: "100%",
        textAlignVertical: 'top'
    },
    submitBtnContainer: {
        marginTop: 10,
        elevation: 5
    },
    submitBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 16
    },
    submitText: {
        color: "white",
        fontSize: 16,
        letterSpacing: 0.5
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    modalContent: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 30,
        alignItems: "center",
        elevation: 20
    },
    modalIconBg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    modalTitle: {
        fontSize: 24,
        color: "#0F172A",
        marginBottom: 12,
        textAlign: "center"
    },
    modalDesc: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 30
    },
    modalBtn: {
        width: "100%",
        elevation: 4
    },
    modalBtnGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    modalBtnText: {
        color: "white",
        fontSize: 16
    }
});