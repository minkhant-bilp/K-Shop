import { create } from 'zustand';

type Country = "MM" | "TH";

interface WalletState {
  mmBalance: number;
  thBalance: number;
  selectedCountry: Country; 

  setCountry: (country: Country) => void;
  addMmBalance: (amount: number) => void;
  addThBalance: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  mmBalance: 1000, 
  thBalance: 50,   
  selectedCountry: "MM",


  setCountry: (country) => set({ selectedCountry: country }),

  addMmBalance: (amount) => set((state) => ({ mmBalance: state.mmBalance + amount })),
  addThBalance: (amount) => set((state) => ({ thBalance: state.thBalance + amount })),
}));