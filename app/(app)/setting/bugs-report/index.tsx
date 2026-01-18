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
    View
} from 'react-native';

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
                    style={styles.header}
                >
                    <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color="#dc2626" />
                        </TouchableOpacity>
                        <DynamicText fontWeight="bold" style={styles.headerTitle}>Report a Bug</DynamicText>
                        <View style={{ width: 40 }} />
                    </View>

                    <View style={styles.heroSection}>
                        <DynamicText style={styles.heroText}>
                            တွေ့ရှိထားသော အမှားအယွင်းများကို{"\n"}အောက်ပါအတိုင်း ဖြည့်စွက်ပေးပါ
                        </DynamicText>
                    </View>
                </LinearGradient>

                <ScrollView
                    style={styles.body}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    <View style={styles.inputGroup}>
                        <DynamicText fontWeight="semibold" style={styles.label}>Issue Title</DynamicText>
                        <View style={styles.inputBox}>
                            <Ionicons name="alert-circle-outline" size={20} color="#E11D48" style={{ marginRight: 10 }} />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Cannot top up diamonds"
                                placeholderTextColor="#94a3b8"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <DynamicText fontWeight="semibold" style={styles.label}>Description</DynamicText>
                        <View style={[styles.inputBox, styles.textAreaBox]}>
                            <TextInput
                                style={[styles.input, styles.textArea]}
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
                        style={styles.submitBtnContainer}
                    >
                        <LinearGradient
                            colors={["#E11D48", "#be123c"]}
                            style={styles.submitBtn}
                        >
                            <DynamicText fontWeight="bold" style={styles.submitText}>Submit Report</DynamicText>
                            <Ionicons name="paper-plane-outline" size={20} color="white" style={{ marginLeft: 8 }} />
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>

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
    },
    headerContent: {
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
        backgroundColor: "#F8FAFC",
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
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