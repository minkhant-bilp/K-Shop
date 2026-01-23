import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface EditInputItemProps {
    label: string;
    value: string;
    placeholder: string;
    icon: keyof typeof Ionicons.glyphMap;
    isEditable?: boolean;
    onChangeText?: (text: string) => void;
}

const EditInputItem = ({
    label,
    value,
    placeholder,
    icon,
    isEditable = true,
    onChangeText
}: EditInputItemProps) => {
    return (
        <View style={styles.container}>
            <DynamicText style={styles.label}>{label}</DynamicText>

            <View style={[styles.inputBox, !isEditable && styles.disabledBox]}>
                <Ionicons name={icon} size={20} color="#E11D48" style={{ marginRight: 10 }} />

                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                    editable={isEditable}
                    onChangeText={onChangeText}
                />

                {!isEditable && (
                    <Ionicons name="lock-closed" size={16} color="#cbd5e1" />
                )}
            </View>
        </View>
    );
};

export default memo(EditInputItem);

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 8,
        fontWeight: "600"
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#f1f5f9",
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        // Premium Shadow (အရိပ်ပါးပါးလေး)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2
    },
    disabledBox: {
        backgroundColor: "#f8fafc",
        borderColor: "#e2e8f0"
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#0f172a",
        fontWeight: "500"
    }
});