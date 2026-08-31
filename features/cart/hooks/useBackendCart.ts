"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  addToBackendCart,
  getBackendCart,
} from "@/features/cart/services";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect, useRef } from "react";

export function useBackendCart() {
  const { isAuthenticated, isLoading } = useAuth();
  const setBackendEnabled = useCartStore((state) => state.setBackendEnabled);

  const handledAuth = useRef<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;

    const wasAuthenticated = handledAuth.current;
    const isAuthed = !!isAuthenticated;

    // First run: react to current auth state.
    if (wasAuthenticated === null) {
      handledAuth.current = isAuthed;
      setBackendEnabled(isAuthed);
      if (isAuthed) {
        syncGuestCartAndLoad();
      } else {
        // Guest: keep whatever is in the local/persisted store.
      }
      return;
    }

    // Auth state changed.
    handledAuth.current = isAuthed;
    if (isAuthed) {
      setBackendEnabled(true);
      syncGuestCartAndLoad();
    } else {
      setBackendEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);
}

async function syncGuestCartAndLoad() {
  const store = useCartStore.getState();
  const localItems = store.items;

  try {
    const res = await getBackendCart();
    const backendItems = res?.data ?? [];

    const existingKeys = new Set(
      backendItems.map(
        (item) => `${item.variantDetails.id}_${item.productId}_${item.countryCode}`,
      ),
    );

    // Upload guest items that are not already in the backend cart.
    const uploads = localItems.filter(
      (item) =>
        !existingKeys.has(
          `${item.variantDetails.id}_${item.productId}_${item.countryCode}`,
        ),
    );

    for (const item of uploads) {
      try {
        await addToBackendCart({
          productVariantId: item.variantDetails.id,
          quantity: item.quantity,
        });
      } catch {
        // ignore individual failures
      }
    }

    // Load the merged server cart.
    if (uploads.length > 0) {
      const refreshed = await getBackendCart();
      store.hydrate(refreshed?.data ?? []);
    } else {
      store.hydrate(backendItems);
    }
  } catch {
    // If the backend fetch fails, keep the local cart as-is.
  }
}
