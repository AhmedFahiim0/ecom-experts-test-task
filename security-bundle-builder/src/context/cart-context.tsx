import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { cartReducer } from "./cart-reducer";
import { cartKey, type CartState, type Product } from "@/types";
import { readStorage, writeStorage } from "@/utils/storage";

const STORAGE_KEY = "security-bundle-builder:cart";

function buildDefaultState(products: Product[]): CartState {
  const state: CartState = { quantities: {}, activeVariant: {}, savedAt: null };
  for (const product of products) {
    if (product.variants?.length) {
      state.activeVariant[product.id] = product.defaultVariantId ?? product.variants[0].id;
    }
    if (product.defaultQuantity) {
      const variantId = product.variants?.length
        ? (product.defaultVariantId ?? product.variants[0].id)
        : undefined;
      state.quantities[cartKey(product.id, variantId)] = product.defaultQuantity;
    }
  }
  return state;
}

interface CartContextValue {
  state: CartState;
  increment: (productId: string, variantId?: string, min?: number, max?: number) => void;
  decrement: (productId: string, variantId?: string, min?: number, max?: number) => void;
  setQuantity: (productId: string, variantId: string | undefined, quantity: number, min?: number, max?: number) => void;
  selectVariant: (productId: string, variantId: string) => void;
  save: () => void;
  quantityFor: (productId: string, variantId?: string) => number;
  activeVariantFor: (productId: string) => string | undefined;
  hasSavedSystem: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  products,
  children,
}: {
  products: Product[];
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    const saved = readStorage<CartState>(STORAGE_KEY);
    return saved ?? buildDefaultState(products);
  });

  // Persistence is tied to the explicit "Save my system for later" action,
  // not written on every quantity change, per the take-home spec.
  useEffect(() => {
    if (state.savedAt) {
      writeStorage(STORAGE_KEY, state);
    }
  }, [state]);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      increment: (productId, variantId, min, max) =>
        dispatch({ type: "INCREMENT", productId, variantId, min, max }),
      decrement: (productId, variantId, min, max) =>
        dispatch({ type: "DECREMENT", productId, variantId, min, max }),
      setQuantity: (productId, variantId, quantity, min, max) =>
        dispatch({ type: "SET_QUANTITY", productId, variantId, quantity, min, max }),
      selectVariant: (productId, variantId) =>
        dispatch({ type: "SELECT_VARIANT", productId, variantId }),
      save: () => dispatch({ type: "SAVE" }),
      quantityFor: (productId, variantId) => state.quantities[cartKey(productId, variantId)] ?? 0,
      activeVariantFor: (productId) => state.activeVariant[productId],
      hasSavedSystem: state.savedAt !== null,
    }),
    [state],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
