import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "@/structure/api/apiResModel";
import mmkvStorage from "./mmkvStorage";

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  isLoggedIn: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
      isLoggedIn: () => !!get().token,
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useAuthStore;
