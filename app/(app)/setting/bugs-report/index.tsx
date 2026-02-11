import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import ScreenWrapper from '@/components/ui/layout/screen-wrapper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    Text
} from 'react-native';

// 🔥 Screen Width ယူပြီး Tablet လား စစ်မယ်
const { width } = Dimensions.get("window");
const isTablet = width > 600;

// 🔥 Tablet Max Content Width
const CONTENT_MAX_WIDTH = 600;

export default function Bugs() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!title || !description) {
            Alert.alert("Required", "Please fill in all fields.");
            return;
        }

        Alert.alert("Thank You", "We received your report. We will fix it soon!");
        router.back();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScreenWrapper headerShown={false} isSafeArea={false}>

                <Stack.Screen options={{ headerShown: false }} />

                <LinearGradient
                    colors={["#991b1b", "#dc2626", "#ef4444"]}
                    style={[styles.header, isTablet && { paddingBottom: 60, alignItems: 'center' }]} // Tablet Header Padding & Center
                >
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    <View style={[styles.headerContent, isTablet && { width: CONTENT_MAX_WIDTH, paddingHorizontal: 0, marginTop: 10 }]}>
                        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, isTablet && { width: 50, height: 50, borderRadius: 16 }]}>
                            <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="#dc2626" />
                        </TouchableOpacity>
                        <Text className='font-bold' style={[styles.headerTitle, isTablet && { fontSize: 24 }]}>Report a Bug</Text>
                        <View style={{ width: isTablet ? 50 : 40 }} />
                    </View>

                    <View style={styles.heroSection}>
                        <Text style={[styles.heroText, isTablet && { fontSize: 18, lineHeight: 28 }]}>
                            တွေ့ရှိထားသော အမှားအယွင်းများကို{"\n"}အောက်ပါအတိုင်း ဖြည့်စွက်ပေးပါ
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
                            <Text className='font-bold' style={[styles.label, isTablet && { fontSize: 16, marginBottom: 10 }]}>Issue Title</Text>
                            <View style={[styles.inputBox, isTablet && { height: 65, paddingHorizontal: 20 }]}>
                                <Ionicons name="alert-circle-outline" size={isTablet ? 24 : 20} color="#E11D48" style={{ marginRight: 10 }} />
                                <TextInput
                                    style={[styles.input, isTablet && { fontSize: 18 }]}
                                    placeholder="e.g., Cannot top up diamonds"
                                    placeholderTextColor="#94a3b8"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        <View style={[styles.inputGroup, isTablet && { marginBottom: 25 }]}>
                            <Text className='font-bold' style={[styles.label, isTablet && { fontSize: 16, marginBottom: 10 }]}>Description</Text>
                            <View style={[styles.inputBox, styles.textAreaBox, isTablet && { height: 200 }]}>
                                <TextInput
                                    style={[styles.input, styles.textArea, isTablet && { fontSize: 18 }]}
                                    placeholder="Please describe what happened..."
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
                            style={[styles.submitBtnContainer, isTablet && { marginTop: 20 }]}
                        >
                            <LinearGradient
                                colors={["#E11D48", "#be123c"]}
                                style={[styles.submitBtn, isTablet && { paddingVertical: 18, borderRadius: 20 }]}
                            >
                                <Text className='font-bold' style={[styles.submitText, isTablet && { fontSize: 18 }]}>Submit Report</Text>
                                <Ionicons name="paper-plane-outline" size={isTablet ? 24 : 20} color="white" style={{ marginLeft: 8 }} />
                            </LinearGradient>
                        </TouchableOpacity>

                    </ScrollView>
                </View>

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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
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
        justifyContent: "center",
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
        // backgroundColor: "#F8FAFC", (Moved to parent View)
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
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
        shadowColor: "#E11D48",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    submitBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        borderRadius: 16,
    },
    submitText: {
        color: "white",
        fontSize: 16,
        letterSpacing: 0.5
    }
});