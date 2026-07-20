import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { cartReducer } from "./cart-reducer";
import { cartKey, type CartState, type Product } from "@/types";
import { getCartFromStorage } from "@/utils/storage";
import { buildDefaultCart, STORAGE_KEY } from "@/utils/build-default-cart";

interface CartContextValue {
  cart: CartState;
  increment: (
    productId: string,
    variantId?: string,
    min?: number,
    max?: number,
  ) => void;
  decrement: (
    productId: string,
    variantId?: string,
    min?: number,
    max?: number,
  ) => void;
  setQuantity: (
    productId: string,
    variantId: string | undefined,
    quantity: number,
    min?: number,
    max?: number,
  ) => void;
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
  const [cart, dispatch] = useReducer(cartReducer, undefined, () => {
    const saved = getCartFromStorage<CartState>(STORAGE_KEY);
    return saved ?? buildDefaultCart(products);
  });

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      increment: (productId, variantId, min, max) =>
        dispatch({ type: "INCREMENT", productId, variantId, min, max }),
      decrement: (productId, variantId, min, max) =>
        dispatch({ type: "DECREMENT", productId, variantId, min, max }),
      setQuantity: (productId, variantId, quantity, min, max) =>
        dispatch({
          type: "SET_QUANTITY",
          productId,
          variantId,
          quantity,
          min,
          max,
        }),
      selectVariant: (productId, variantId) =>
        dispatch({ type: "SELECT_VARIANT", productId, variantId }),
      save: () => dispatch({ type: "SAVE" }),
      quantityFor: (productId, variantId) =>
        cart.quantities[cartKey(productId, variantId)] ?? 0,
      activeVariantFor: (productId) => cart.activeVariant[productId],
      hasSavedSystem: cart.savedAt !== null,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext)
    throw new Error("useCart must be used within a CartProvider");

  return cartContext;
}
