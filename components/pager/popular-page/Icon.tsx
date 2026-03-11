import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import {
    FileText,
    Monitor,
    MoreHorizontal,
    Percent,
    Smartphone,
    Ticket
} from "lucide-react-native";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";

import useTranslation from "@/structure/hooks/useTranslation";

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

export default function CategoryList() {
    const router = useRouter();

    const { t } = useTranslation();

    const categories = [
        { id: 2, title: t.topupMenu || "Top up", icon: Smartphone, route: "/home/top-up" },
        { id: 3, title: t.pcGame || "PC Game", icon: Monitor, route: "/home/pc-game" },
        { id: 4, title: t.voucher || "Voucher", icon: Ticket, route: "/home/voucher" },
        { id: 5, title: t.promo || "Promo", icon: Percent, route: "/home/promo" },
        { id: 6, title: t.transaction || "Transaction", icon: FileText, route: "/home/transaction" },
        { id: 7, title: t.admin || "Admin", icon: AdminSupportIcon, route: "/home/service" },
        { id: 8, title: t.allFeatures || "All features", icon: MoreHorizontal, route: "/home/all-features" },
    ];

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