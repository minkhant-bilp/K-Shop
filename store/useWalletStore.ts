import { create } from 'zustand';

export interface TransactionData {
  id: string;
  type: 'purchase' | 'deposit';
  title: string;
  subTitle: string;
  date: string;
  amount: number;
  currency: string;
  status: 'success' | 'pending' | 'failed';
  image: any;
}

type Country = "MM" | "TH";

interface WalletState {
  mmBalance: number;
  thBalance: number;
  selectedCountry: Country;
  transactions: TransactionData[];

  setCountry: (country: Country) => void;
  buyPackage: (price: number, country: Country, gameName: string, packageName: string, image: any) => boolean;
  buyPhoneBill: (price: number, country: Country, phoneNumber: string, packageName: string, image: any) => boolean;
  requestTopUp: (amount: number, methodName: string) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  mmBalance: 500000,
  thBalance: 5000,   
  selectedCountry: "MM",
  transactions: [],

  setCountry: (country) => set({ selectedCountry: country }),

  // Game Package Purchase
  buyPackage: (price, country, gameName, packageName, image) => {
    const { mmBalance, thBalance } = get();

    if (country === "MM" && mmBalance < price) return false;
    if (country === "TH" && thBalance < price) return false;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'purchase',
        title: gameName,
        subTitle: packageName,
        date: `${dateStr} • ${timeStr}`,
        amount: price,
        currency: country === "MM" ? "Ks" : "THB", 
        status: 'success',
        image: image
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

  // Phone Bill Purchase
  buyPhoneBill: (price, country, phoneNumber, packageName, image) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'purchase',
        title: 'Phone Bill',
        subTitle: `${phoneNumber} • ${packageName}`,
        date: `${dateStr} • ${timeStr}`,
        amount: price,
        currency: country === "MM" ? "Ks" : "Baht", 
        status: 'pending',
        image: image
    };

    set((state) => ({
        transactions: [newTransaction, ...state.transactions]
    }));

    return true;
  },

  requestTopUp: (amount, methodName) => {
    const { selectedCountry } = get();
    let currency = selectedCountry === "MM" ? "Ks" : "THB";
    if (methodName.includes("KBZ") || methodName.includes("Wave")) currency = "Ks"; 
    else if (methodName.includes("K-Bank") || methodName.includes("True")) currency = "THB"; 

    const now = new Date();
    const dateStr = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'deposit',
        title: `${methodName}`, 
        subTitle: "Wallet Topup",
        date: dateStr,
        amount: amount,
        currency: currency, 
        status: 'pending',
        image: require('@/assets/game_image/wave.png')
    };

    set((state) => ({
        transactions: [newTransaction, ...state.transactions]
    }));
  }
}));