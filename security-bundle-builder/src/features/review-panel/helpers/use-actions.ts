import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { submitCheckout } from "../api/checkout";
import type { ReviewGroup, ReviewLineItem, ReviewTotals } from "../types";
import type { Product, ProductCategory } from "@/types";

const CATEGORY_ORDER: ProductCategory[] = [
  "camera",
  "sensor",
  "accessory",
  "plan",
];

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  camera: "Cameras",
  sensor: "Sensors",
  accessory: "accessories",
  plan: "plan",
};

export function useReviewPanelActions(products: Product[]) {
  const cart = useCart();

  const lineItems = useMemo<ReviewLineItem[]>(() => {
    const items: ReviewLineItem[] = [];

    for (const product of products) {
      const variants = product.variants?.length
        ? product.variants
        : [undefined];
      for (const variant of variants) {
        const quantity = cart.quantityFor(product.id, variant?.id);
        if (quantity <= 0) continue;

        const min = product.required ? 1 : 0;
        const max = product.maxQuantity;

        items.push({
          key: `${product.id}:${variant?.id ?? "default"}`,
          product,
          variant,
          quantity,
          lineTotal: product.price * quantity,
          lineCompareTotal: product.comparePrice * quantity,
          hasAddControl: product.category === "camera",
          onIncrement: () => cart.increment(product.id, variant?.id, min, max),
          onDecrement: () => cart.decrement(product.id, variant?.id, min, max),
        });
      }
    }

    return items;
  }, [products, cart]);

  const groups = useMemo<ReviewGroup[]>(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        label: CATEGORY_LABELS[category],
        items: lineItems.filter((item) => item.product.category === category),
      })).filter((group) => group.items.length > 0),
    [lineItems],
  );

  const totals = useMemo<ReviewTotals>(() => {
    const compareTotal = lineItems.reduce(
      (sum, item) => sum + item.lineCompareTotal,
      0,
    );
    const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    return { compareTotal, total, savings: compareTotal - total };
  }, [lineItems]);

  const saveForLater = useCallback(() => {
    cart.save();
    toast.success("Your system has been saved for later.");
  }, [cart]);

  const checkout = useCallback(async () => {
    const result = await submitCheckout();
    if (result.success) {
      toast.success(
        "This is a prototype — checkout isn't wired up, but your order is all set!",
      );
    }
  }, []);

  return {
    groups,
    totals,
    saveForLater,
    checkout,
    hasSavedSystem: cart.hasSavedSystem,
  };
}
