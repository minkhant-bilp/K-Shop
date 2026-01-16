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
  mmBalance: 50000, 
  thBalance: 500,   
  selectedCountry: "MM",
  transactions: [],

  setCountry: (country) => set({ selectedCountry: country }),

  buyPackage: (price, country, title) => {
    const { mmBalance, thBalance, transactions } = get();

    if (country === "MM" && mmBalance < price) return false;
    if (country === "TH" && thBalance < price) return false;

    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'purchase',
        title: title,
        date: new Date().toLocaleString(),
        amount: price,
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

  requestTopUp: (amount, methodName) => {
    const newTransaction: TransactionData = {
        id: Date.now().toString(),
        type: 'deposit',
        title: `${methodName} Topup`, 
        date: new Date().toLocaleString(),
        amount: amount,
        status: 'pending' 
    };

    set((state) => ({
        transactions: [newTransaction, ...state.transactions]
    }));
  }
}));