import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { FlashList } from "@shopify/flash-list";
import {
    FileText,
    Monitor,
    MoreHorizontal,
    Percent,
    Smartphone,
    Ticket
} from "lucide-react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width > 600;

const SIZES = {
    icon: isTablet ? 26 : 18,
    fontSize: isTablet ? "sm" : "xs",
    padding: isTablet ? "px-6 py-3 mr-4" : "px-4 py-2 mr-3"
};

const AdminSupportIcon = ({ size, color }: { size: number, color: string }) => (
    <MaterialIcons name="support-agent" size={size} color={color} />
);

const categories = [
    { id: 2, title: "Top up", icon: Smartphone, route: "/home/top-up" },
    { id: 3, title: "PC Game", icon: Monitor, route: "/home/pc-game" },
    { id: 4, title: "Voucher", icon: Ticket, route: "/home/voucher" },
    { id: 5, title: "Promo", icon: Percent, route: "/home/promo" },
    { id: 6, title: "Transaction", icon: FileText, route: "/home/transaction" },
    { id: 7, title: "Admin", icon: AdminSupportIcon, route: "/home/service" },
    { id: 8, title: "All features", icon: MoreHorizontal, route: "/home/all-features" },
];

export default function CategoryList() {
    const router = useRouter();

    return (
        <View className="w-full min-h-[60px] py-2">

            <FlashList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                estimatedItemSize={120}

                renderItem={({ item }) => (

                    <TouchableOpacity
                        className={`flex-row items-center bg-white border border-slate-200 rounded-full shadow-sm ${SIZES.padding}`}
                        activeOpacity={0.7}
                        onPress={() => router.push(item.route as any)}
                    >
                        <item.icon size={SIZES.icon} color="red" strokeWidth={2} />

                        <View className="ml-2">
                            <DynamicText
                                fontWeight="bold"
                                fontSize={SIZES.fontSize as any}
                                style={{ color: "#334155" }}
                            >
                                {item.title}
                            </DynamicText>
                        </View>

                    </TouchableOpacity>
                )}
            />
        </View>
    );
}