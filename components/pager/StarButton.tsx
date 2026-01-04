import { Star } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, ToastAndroid } from "react-native";

// --- ကြယ်ခလုတ် Component ---
type StarProps = {
    isActive: boolean;        // ကြယ်လင်းနေလား (True/False)
    onToggle: () => void;     // နှိပ်လိုက်ရင် ဘာလုပ်မလဲ
};

const StarButton = ({ isActive, onToggle }: StarProps) => {

    const handlePress = () => {
        // ၁။ အကယ်၍ အခုမှ စနှိပ်တာဆိုရင် (Active ဖြစ်လာရင်)
        if (!isActive) {
            if (Platform.OS === 'android') {
                ToastAndroid.show("Added to Favorites! 🌟", ToastAndroid.SHORT);
            }
        }

        // ၂။ ကြယ်ရဲ့ အခြေအနေကို ပြောင်းလိုက်မယ် (အဖွင့်/အပိတ်)
        onToggle();
    };

    return (
        <Pressable
            onPress={handlePress}
            // absolute: ပုံပေါ်မှာ ထပ်မယ်
            // top-2 right-2: အပေါ်ညာဘက်ထောင့်မှာ ကပ်မယ်
            // bg-white/90: အဖြူရောင်နောက်ခံ ပါးပါးလေး (ပုံမည်းနေလည်း ကြယ်ကို မြင်ရအောင်)
            className="absolute top-2 right-2 z-10 bg-white/80 p-1.5 rounded-full shadow-sm"
        >
            <Star
                size={20}
                // Active ဖြစ်ရင် "အဝါရောင်"၊ မဖြစ်ရင် "မီးခိုးရောင်"
                color={isActive ? "#fbbf24" : "#94a3b8"}
                // Active ဖြစ်ရင် အတွင်းသားကိုပါ ဖြည့်မယ် (Fill)
                fill={isActive ? "#fbbf24" : "transparent"}
            />
        </Pressable>
    );
};
export default StarButton