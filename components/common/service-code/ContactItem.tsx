import DynamicText from '@/components/ui/dynamic-text/dynamic-text';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ContactItemProps {
    title: string;
    subTitle: string;
    icon: LucideIcon;
    color: string;
    actionLabel: string;
    onPress: () => void;
}

const ContactItem = ({ title, subTitle, icon: Icon, color, actionLabel, onPress }: ContactItemProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.contactBtn}
            onPress={onPress}
        >
            <View style={[styles.socialIcon, { backgroundColor: color + "15" }]}>
                <Icon size={24} color={color} />
            </View>

            <View style={{ flex: 1 }}>
                <DynamicText fontWeight="bold" style={styles.btnTitle}>{title}</DynamicText>
                <DynamicText style={styles.btnSub}>{subTitle}</DynamicText>
            </View>

            <View style={styles.arrowBox}>
                <DynamicText style={{ color: color, fontSize: 12, fontWeight: 'bold' }}>
                    {actionLabel}
                </DynamicText>
            </View>
        </TouchableOpacity>
    );
};

export default ContactItem;

const styles = StyleSheet.create({
    contactBtn: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        borderWidth: 1,
        borderColor: "#F1F5F9"
    },
    socialIcon: {
        width: 50,
        height: 50,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15
    },
    btnTitle: {
        fontSize: 16,
        color: "#0F172A",
        marginBottom: 4
    },
    btnSub: {
        fontSize: 12,
        color: "#64748B"
    },
    arrowBox: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0"
    }
});