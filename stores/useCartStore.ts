import { MarketKey } from "@/config/markets";
import {
  addToBackendCart,
  clearBackendCart,
  getBackendCart,
  removeBackendCartItem,
  updateBackendCartItem,
} from "@/features/cart/services";
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
  isBackendEnabled: boolean;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: number) => void;
  removeVariant: (variantId: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  hydrate: (items: CartItem[]) => void;
  setBackendEnabled: (enabled: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemsByCountry: (countryCode: string) => CartItem[];
}

function dedupeCartItems(items: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of items) {
    const key = `${item.variantDetails.id}_${item.productId}_${item.countryCode}`;
    const existing = map.get(key);
    if (existing) {
      map.set(key, {
        ...existing,
        quantity: existing.quantity + item.quantity,
        updatedAt: item.updatedAt || existing.updatedAt,
      });
    } else {
      map.set(key, item);
    }
  }
  return Array.from(map.values());
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => {
      const syncAdd = (itemInput: CartItemInput) => {
        const variantId = itemInput.variantDetails?.id;
        if (!variantId) return;
        const quantity = itemInput.quantity || 1;
        addToBackendCart({ productVariantId: variantId, quantity })
          .then((res) => {
            const created = res?.data as CartItem | undefined;
            if (created?.id) {
              // Replace the optimistic local item with the server item (real id).
              set((state) => ({
                items: state.items.map((it) =>
                  it.id === itemInput.id &&
                  it.variantDetails.id === variantId &&
                  it.productId === itemInput.productId
                    ? { ...it, id: created.id }
                    : it,
                ),
              }));
            }
          })
          .catch(() => {
            // Keep local. Server cart will reconcile on next fetch.
          });
      };

      const syncUpdate = (id: number, quantity: number) => {
        const item = get().items.find((it) => it.id === id);
        if (!item) return;
        updateBackendCartItem(id, {
          productVariantId: item.variantDetails.id,
          quantity,
        }).catch(() => {});
      };

      const syncRemove = (id: number) => {
        removeBackendCartItem(id).catch(() => {});
      };

      return {
        items: [],
        isOpen: false,
        isBackendEnabled: false,

        addItem: (itemInput: CartItemInput) => {
          const now = new Date().toISOString();
          const currentItems = get().items;
          const backendEnabled = get().isBackendEnabled;

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
            const newQuantity =
              existingItem.quantity + (itemInput.quantity || 1);

            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: newQuantity,
              updatedAt: now,
            };

            set({ items: updatedItems });

            if (backendEnabled) {
              syncUpdate(existingItem.id, newQuantity);
            }
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

            if (backendEnabled) {
              syncAdd({ ...itemInput, id: newItem.id });
            }
          }
        },

        removeItem: (id: number) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }));
          if (get().isBackendEnabled) {
            syncRemove(id);
          }
        },

        removeVariant: (variantId: number) => {
          const itemsToRemove = get().items.filter(
            (item) => item.variantDetails.id === variantId,
          );
          set((state) => ({
            items: state.items.filter(
              (item) => item.variantDetails.id !== variantId,
            ),
          }));
          if (get().isBackendEnabled) {
            itemsToRemove.forEach((item) => syncRemove(item.id));
          }
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

          if (get().isBackendEnabled) {
            syncUpdate(id, quantity);
          }
        },

        increaseQuantity: (id: number) => {
          const item = get().items.find((i) => i.id === id);
          if (!item) return;
          get().updateQuantity(id, item.quantity + 1);
        },

        decreaseQuantity: (id: number) => {
          const item = get().items.find((i) => i.id === id);
          if (!item) return;
          if (item.quantity <= 1) {
            get().removeItem(id);
          } else {
            get().updateQuantity(id, item.quantity - 1);
          }
        },

        clearCart: () => {
          set({ items: [] });
          if (get().isBackendEnabled) {
            clearBackendCart().catch(() => {});
          }
        },

        hydrate: (items: CartItem[]) => {
          set({ items: dedupeCartItems(items) });
        },

        setBackendEnabled: (enabled: boolean) => {
          set({ isBackendEnabled: enabled });
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
            (total, item) =>
              total + item.variantDetails.newPrice * item.quantity,
            0,
          );
        },

        getItemsByCountry: (countryCode: string) => {
          return get().items.filter((item) => item.countryCode === countryCode);
        },
      };
    },
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { items?: CartItem[] };
        return {
          ...currentState,
          ...persisted,
          items: persisted?.items
            ? dedupeCartItems(persisted.items)
            : currentState.items,
        };
      },
    },
  ),
);

export async function loadBackendCartIntoStore() {
  const res = await getBackendCart();
  const items = res?.data ?? [];
  useCartStore.getState().hydrate(items);
}
