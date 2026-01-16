import { TransactionData } from '@/components/transaction/TransactionItem';
import { create } from 'zustand';

type Country = "MM" | "TH";

interface WalletState {
  mmBalance: number;
  thBalance: number;
  selectedCountry: Country;
  transactions: TransactionData[];

  setCountry: (country: Country) => void;
  buyPackage: (price: number, country: Country, title: string) => boolean;
  requestTopUp: (amount: number, methodName: string) => void;
}



export const useWalletStore = create<WalletState>((set, get) => ({
  mmBalance: 1000, 
  thBalance: 10,   
  selectedCountry: "MM",
  transactions: [],

  setCountry: (country) => set({ selectedCountry: country }),

  buyPackage: (price, country, title) => {
    const { mmBalance, thBalance } = get();

    if (country === "MM" && mmBalance < price) return false;
    if (country === "TH" && thBalance < price) return false;

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'purchase',
        title: title,
        date: new Date().toLocaleString(),
        amount: price,
        currency: country === "MM" ? "Ks" : "THB", 
        status: 'success'
    };

    set((state) => {
        if (country === "MM") {
            return { 
                mmBalance: state.mmBalance - price, 
                transactions: [newTransaction, ...state.transactions] 
            };
        } else {
            return { 
                thBalance: state.thBalance - price, 
                transactions: [newTransaction, ...state.transactions] 
            };
        }
    });

    return true;
  },

  // 🔥 ဒီကောင်ကို ပြင်လိုက်ပါ (Payment Method ပေါ်မူတည်ပြီး Currency ခွဲမယ်)
  requestTopUp: (amount, methodName) => {
    const { selectedCountry } = get();

    // မူလသတ်မှတ်ချက် (Country အလိုက်)
    let currency = selectedCountry === "MM" ? "Ks" : "THB";

    // 🚨 Logic Fix: Payment Name ပေါ်မူတည်ပြီး အသေပြန်သတ်မှတ်မယ်
    if (methodName.includes("KBZ") || methodName.includes("Wave")) {
        currency = "Ks"; // KBZ, Wave ဆိုရင် Ks ပဲ ဖြစ်ရမယ်
    } else if (methodName.includes("K-Bank") || methodName.includes("True")) {
        currency = "THB"; // K-Bank, TrueMoney ဆိုရင် THB ပဲ ဖြစ်ရမယ်
    }

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'deposit',
        title: `${methodName} Topup`, 
        date: new Date().toLocaleString(),
        amount: amount,
        currency: currency, // 🔥 ပြင်ထားတဲ့ Currency ထည့်လိုက်ပြီ
        status: 'pending' 
    };

    set((state) => ({
        transactions: [newTransaction, ...state.transactions]
    }));
  }
}));