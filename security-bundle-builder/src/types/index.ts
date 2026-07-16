export type StepId = "cameras" | "plan" | "sensors" | "protection";

export type ProductCategory = "camera" | "sensor" | "accessory" | "plan";

export interface ProductVariant {
  id: string;
  label: string;
  image: string;
}

export interface Product {
  id: string;
  stepId: StepId;
  category: ProductCategory;
  name: string;
  description?: string;
  hasLearnMore?: boolean;
  image: string;
  badge?: string;
  comparePrice: number;
  price: number;
  priceLabel?: string;
  variants?: ProductVariant[];
  required?: boolean;
  maxQuantity?: number;
  defaultQuantity?: number;
  defaultVariantId?: string;
}

export interface StepInfo {
  id: StepId;
  title: string;
  icon: string;
  nextLabel?: string;
}

export interface BundleData {
  steps: StepInfo[];
  financingLabel: string;
  shipping: { label: string; icon: string; comparePrice: number };
  guarantee: { heading: string; body: string };
  products: Product[];
}

export function cartKey(productId: string, variantId?: string) {
  return `${productId}:${variantId ?? "default"}`;
}

export interface CartState {
  quantities: Record<string, number>;
  activeVariant: Record<string, string>;
  savedAt: string | null;
}

export type CartAction =
  | { type: "INCREMENT"; productId: string; variantId?: string; step?: number; min?: number; max?: number }
  | { type: "DECREMENT"; productId: string; variantId?: string; step?: number; min?: number; max?: number }
  | { type: "SET_QUANTITY"; productId: string; variantId: string | undefined; quantity: number; min?: number; max?: number }
  | { type: "SELECT_VARIANT"; productId: string; variantId: string }
  | { type: "SAVE" }
  | { type: "RESTORE"; state: CartState };

export interface CartLineItem {
  key: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  lineTotal: number;
  lineCompareTotal: number;
}
