import { cartKey, type CartState, type Product } from "@/types";

export const STORAGE_KEY = "ecom-experts-cart";

export function buildDefaultCart(products: Product[]): CartState {
  const cart: CartState = { quantities: {}, activeVariant: {} };

  for (const product of products) {
    if (product.variants?.length) {
      cart.activeVariant[product.id] =
        product.defaultVariantId ?? product.variants[0].id;
    }

    if (product.defaultQuantity) {
      const variantId = product.variants?.length
        ? (product.defaultVariantId ?? product.variants[0].id)
        : undefined;
        
      cart.quantities[cartKey(product.id, variantId)] = product.defaultQuantity;
    }
  }
  return cart;
}
