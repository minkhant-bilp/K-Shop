import { create } from 'zustand';

export interface TransactionData {
  id: string; // Internal Unique ID
  transactionId: string; // 🔥 External Display ID (9231...)
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
  rejectTransaction: (id: string) => void;
  clearTransactions: () => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  mmBalance: 1000,
  thBalance: 100,
  selectedCountry: "MM",
  transactions: [],

  setCountry: (country) => set({ selectedCountry: country }),

  clearTransactions: () => set({ transactions: [] }),

  buyPackage: (price, country, gameName, packageName, image) => {
    const { mmBalance, thBalance } = get();
    
    if (country === "MM" && mmBalance < price) return false;
    if (country === "TH" && thBalance < price) return false;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // 🔥 Generate Transaction ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const transactionId = `9231 5213 ${randomNum}`;

    const newTransaction: TransactionData = {
        id: `ORDER-${Date.now()}`,
        transactionId: transactionId, // 🔥 Save Transaction ID
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

  buyPhoneBill: (price, country, phoneNumber, packageName, image) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newTransaction: TransactionData = {
        id: `BILL-${Date.now()}`,
        transactionId: `BILL-${Math.floor(100000 + Math.random() * 900000)}`, // 🔥 Fake ID for bill
        type: 'purchase',
        title: 'Phone Bill',
        subTitle: `${phoneNumber} • ${packageName}`,
        date: `${dateStr} • ${timeStr}`,
        amount: price,
        currency: country === "MM" ? "Ks" : "Baht",
        status: 'failed',
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
        id: `TOPUP-${Date.now()}`,
        transactionId: `TOPUP-${Math.floor(100000 + Math.random() * 900000)}`, // 🔥 Fake ID
        type: 'deposit',
        title: methodName,
        subTitle: "Wallet Topup",
        date: dateStr,
        amount: amount,
        currency: currency,
        status: 'failed', 
        image: require('@/assets/game_image/wave.png')
    };

    set((state) => ({
        transactions: [newTransaction, ...state.transactions]
    }));
  },

  rejectTransaction: (id: string) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, status: 'failed' } : t
      )
    }));
  }
}));