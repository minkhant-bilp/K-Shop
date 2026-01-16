import DynamicText from "@/components/ui/dynamic-text/dynamic-text";
import { FlashList } from "@shopify/flash-list";
import {
    FileText,
    Gift,
    Monitor,
    MoreHorizontal,
    Percent,
    Smartphone,
    Ticket
} from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const categories = [
    { id: 2, title: "Top up", icon: Smartphone },
    { id: 3, title: "PC Game", icon: Monitor },
    { id: 4, title: "Voucher", icon: Ticket },
    { id: 5, title: "Promo", icon: Percent },
    { id: 6, title: "Transaction", icon: FileText },
    { id: 7, title: "Gift Cards", icon: Gift },
    { id: 8, title: "All features", icon: MoreHorizontal },
];

export default function CategoryList() {
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
                        className="flex-row items-center bg-white border border-slate-200 rounded-full px-4 py-2 mr-3 shadow-sm"
                        activeOpacity={0.7}
                    >
                        <item.icon size={18} color="red" strokeWidth={2} />

                        <View className="ml-2">
                            <DynamicText
                                fontWeight="bold"
                                fontSize="xs"
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