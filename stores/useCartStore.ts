import { MarketKey } from "@/config/markets";
import { CartItem } from "@/features/cart/types";
import { IProductVariant } from "@/features/products/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItemInput = {
  id?: number;
  userId?: number;
  productId: number;
  countryName?: string;
  countryCode?: MarketKey;
  variantDetails: IProductVariant;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: number) => void;
  removeVariant: (variantId: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsByCountry: (countryCode: string) => CartItem[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (itemInput: CartItemInput) => {
        const now = new Date().toISOString();
        const currentItems = get().items;

        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.variantDetails.id === itemInput.variantDetails.id &&
            item.productId === itemInput.productId &&
            (!itemInput.countryCode ||
              item.countryCode === itemInput.countryCode),
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + (itemInput.quantity || 1);

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            updatedAt: now,
          };

          set({ items: updatedItems });
        } else {
          const newItem: CartItem = {
            id: itemInput.id ?? Date.now(),
            userId: itemInput.userId ?? 0,
            productId: itemInput.productId,
            countryName: itemInput.countryName ?? "",
            countryCode: itemInput.countryCode ?? "eg",
            variantDetails: itemInput.variantDetails,
            quantity: itemInput.quantity || 1,
            createdAt: itemInput.createdAt ?? now,
            updatedAt: itemInput.updatedAt ?? now,
          };

          set({ items: [...currentItems, newItem] });
        }
      },

      removeItem: (id: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      removeVariant: (variantId: number) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.variantDetails.id !== variantId,
          ),
        }));
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        }));
      },

      increaseQuantity: (id: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (id: number) => {
        const item = get().items.find((i) => i.id === id);
        if (item && item.quantity <= 1) {
          get().removeItem(id);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    updatedAt: new Date().toISOString(),
                  }
                : item,
            ),
          }));
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.variantDetails.newPrice * item.quantity,
          0,
        );
      },

      getItemsByCountry: (countryCode: string) => {
        return get().items.filter((item) => item.countryCode === countryCode);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
