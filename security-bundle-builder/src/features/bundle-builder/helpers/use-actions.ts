import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product, StepId, StepInfo } from "@/types";
import type { AccordionStepData } from "../components/products-list";

const steps: StepInfo[] = [
  {
    id: "cameras",
    title: "Choose your cameras",
    icon: "/icons/icon-camera.svg",
    nextLabel: "Next: Choose your plan",
  },
  {
    id: "plan",
    title: "Choose your plan",
    icon: "/icons/icon-plan.svg",
    nextLabel: "Next: Choose your sensors",
  },
  {
    id: "sensors",
    title: "Choose your sensors",
    icon: "/icons/icon-sensor.svg",
    nextLabel: "Next: Add extra protection",
  },
  {
    id: "protection",
    title: "Add extra protection",
    icon: "/icons/icon-shield.svg",
  },
];

export function useBundleBuilderActions(products: Product[]) {
  const cart = useCart();

  const [openStepId, setOpenStepId] = useState<StepId | null>(
    steps[0]?.id ?? null,
  );

  const toggleStep = useCallback((stepId: StepId) => {
    setOpenStepId((current) => (current === stepId ? null : stepId));
  }, []);

  const goNext = useCallback((stepId: StepId) => {
    setOpenStepId(stepId);
  }, []);

  const accordionSteps = useMemo<AccordionStepData[]>(
    () =>
      steps.map((step) => {
        const stepProducts = products.filter(
          (product) => product.stepId === step.id,
        );

        const selectedCount = stepProducts.filter((product) =>
          isProductSelected(product, cart.quantityFor),
        ).length;

        return {
          id: step.id,
          title: step.title,
          icon: step.icon,
          nextLabel: step.nextLabel,
          selectedCount,
          products: stepProducts.map((product) => {
            const activeVariantId = product.variants?.length
              ? cart.activeVariantFor(product.id)
              : undefined;
            const min = product.required ? 1 : 0;
            const max = product.maxQuantity;
            return {
              product,
              quantity: cart.quantityFor(product.id, activeVariantId),
              activeVariantId,
              onIncrement: () =>
                cart.increment(product.id, activeVariantId, min, max),
              onDecrement: () =>
                cart.decrement(product.id, activeVariantId, min, max),
              onSelectVariant: product.variants?.length
                ? (variantId: string) =>
                    cart.selectVariant(product.id, variantId)
                : undefined,
            };
          }),
        };
      }),
    [steps, products, cart],
  );

  return { openStepId, toggleStep, goNext, accordionSteps };
}

function isProductSelected(
  product: Product,
  quantityFor: (productId: string, variantId?: string) => number,
) {
  if (product.variants?.length) {
    return product.variants.some(
      (variant) => quantityFor(product.id, variant.id) > 0,
    );
  }
  return quantityFor(product.id) > 0;
}
