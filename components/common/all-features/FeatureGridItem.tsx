import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 4;

export interface FeatureData {
    id: string;
    title: string;
    icon: LucideIcon | any;
    route: string;
    color?: string;
}

interface FeatureItemProps {
    item: FeatureData;
    onPress: () => void;
}

const FeatureGridItem = ({ item, onPress }: FeatureItemProps) => {
    const IconComponent = item.icon;

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.7}
                onPress={onPress}
            >
                <View style={[styles.iconBox, { backgroundColor: item.color ? `${item.color}15` : "#fff1f2" }]}>
                    <IconComponent
                        size={24}
                        color={item.color || "#E11D48"}
                        strokeWidth={2}
                    />
                </View>

                <DynamicText
                    style={styles.title}
                    numberOfLines={1}
                    fontWeight="medium"
                >
                    {item.title}
                </DynamicText>
            </TouchableOpacity>
        </View>
    );
};

export default FeatureGridItem;

const styles = StyleSheet.create({
    wrapper: {
        width: ITEM_WIDTH,
        alignItems: "center",
        marginBottom: 20
    },
    container: {
        alignItems: "center",
        gap: 8,
        width: "100%"
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.03)"
    },
    title: {
        fontSize: 12,
        color: "#475569",
        textAlign: "center"
    }
});