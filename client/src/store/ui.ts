import { create } from "zustand";

interface UIStore {
  isMobileMenuOpen: boolean;
  isFiltersOpen: boolean;
  isDarkMode: boolean;
  searchQuery: string;
  
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleFilters: () => void;
  closeFilters: () => void;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isFiltersOpen: false,
  isDarkMode: false,
  searchQuery: "",
  
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  toggleFilters: () => set((state) => ({ isFiltersOpen: !state.isFiltersOpen })),
  closeFilters: () => set({ isFiltersOpen: false }),
  
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", newMode.toString());
    return { isDarkMode: newMode };
  }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
