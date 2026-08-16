import { create } from "zustand";

interface FilterState {
  searchTerm: string;
  categories: number[];
  offers: (string | number)[];
}

interface ProductFilterStore {
  filters: FilterState;
  setSearchTerm: (searchTerm: string) => void;
  toggleCategoryFilter: (category: number) => void;
  toggleOfferFilter: (offer: string | number) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  searchTerm: "",
  categories: [],
  offers: [],
};

const useProductsFilter = create<ProductFilterStore>((set) => ({
  filters: initialState,
  setSearchTerm: (searchTerm) =>
    set((state) => ({
      filters: {
        ...state.filters,
        searchTerm,
      },
    })),
  toggleCategoryFilter: (category: number) =>
    set((state) => {
      const currentCategory = state.filters.categories;
      const findCategory = currentCategory.find((cat) => cat === category);
      if (findCategory) {
        return {
          filters: {
            ...state.filters,
            categories: currentCategory.filter((cat) => cat !== category),
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          categories: [...currentCategory, category],
        },
      };
    }),
  toggleOfferFilter: (offer) =>
    set((state) => {
      const currentOffer = state.filters.offers;
      const findOffer = currentOffer.find((off) => off === offer);
      if (findOffer) {
        return {
          filters: {
            ...state.filters,
            offers: currentOffer.filter((off) => off !== offer),
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          offers: [...currentOffer, offer],
        },
      };
    }),
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),
  resetFilters: () => set({ filters: initialState }),
}));

export { useProductsFilter };
