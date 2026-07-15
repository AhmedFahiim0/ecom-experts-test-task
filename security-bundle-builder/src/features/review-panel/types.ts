import type { BundleData, CartLineItem, ProductCategory } from "@/types";

export interface ReviewLineItem extends CartLineItem {
  hasAddControl: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

export interface ReviewGroup {
  category: ProductCategory;
  label: string;
  items: ReviewLineItem[];
}

export interface ReviewTotals {
  compareTotal: number;
  total: number;
  savings: number;
}

export interface ReviewPanelProps {
  bundle: BundleData;
  className?: string;
}
