// နိုင်ငံ (၃) ခုတည်းသာ ထားပါသည်
export type CountryCode = "MM" | "PH" | "BR";

export type PackageItem = { 
    id: number; 
    amount: string; 
    price: string; 
    image: any; 
};

// နိုင်ငံအလိုက် ပေါ်မည့် စာသားနှင့် အလံများ (string type အဖြစ် သေချာသတ်မှတ်ထားသည်)
export const COUNTRY_LABELS: Record<CountryCode, string> = {
    MM: "Myanmar 🇲🇲",
    PH: "Philippines 🇵🇭",
    BR: "Brazil 🇧🇷"
};

// Packages Data
export const GAME_PACKAGES: Record<string, Partial<Record<CountryCode, PackageItem[]>>> = {
    "mobile-legends": {
        MM: [
            { id: 1, amount: "10 Diamonds", price: "500 Ks", image: require("@/assets/game_image/diamond.png") },
            { id: 2, amount: "50 Diamonds", price: "2,500 Ks", image: require("@/assets/game_image/diamond.png") },
        ],
        PH: [
            { id: 201, amount: "50 Diamonds", price: "₱25", image: require("@/assets/game_image/diamond.png") },
            { id: 202, amount: "150 Diamonds", price: "₱75", image: require("@/assets/game_image/diamond.png") },
        ],
        BR: [
            { id: 301, amount: "50 Diamonds", price: "R$5", image: require("@/assets/game_image/diamond.png") },
            { id: 302, amount: "150 Diamonds", price: "R$15", image: require("@/assets/game_image/diamond.png") },
        ]
    }
};