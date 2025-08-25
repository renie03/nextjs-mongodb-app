import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeState = {
  darkMode: boolean;
  setTheme: () => void;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,
      setTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useThemeStore;
