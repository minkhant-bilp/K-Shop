import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import mmkvStorage from "./mmkvStorage";

export type RegionCode = "PH" | "BR";

interface RegionStoreState {
  region: RegionCode;
  setRegion: (region: RegionCode) => void;
}

const useRegionStore = create<RegionStoreState>()(
  persist(
    (set) => ({
      region: "PH",
      setRegion: (region) => set({ region }),
    }),
    {
      name: "region-store",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useRegionStore;