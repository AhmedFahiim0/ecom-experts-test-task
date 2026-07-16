import { Accordion } from "@/components/shared/accordion";
import { ProductCard } from "@/components/shared/product-card";
import { useBundleBuilderActions } from "../helpers/use-actions";
import type { BundleBuilderProps } from "../types";

export function BundleBuilder({
  steps,
  products,
  className,
}: BundleBuilderProps) {
  const { openStepId, toggleStep, goNext, accordionSteps } =
    useBundleBuilderActions(products, steps);

  return (
    <Accordion
      steps={accordionSteps}
      openStepId={openStepId}
      onToggleStep={toggleStep}
      onNext={goNext}
      className={className}
      ProductCard={ProductCard}
    />
  );
}
