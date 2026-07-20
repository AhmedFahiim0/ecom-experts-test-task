import { useBundleBuilderActions } from "./helpers/use-actions";
import type { BundleBuilderProps } from "./types";
import { ProductCard } from "./components/product-card";
import ProductsList from "./components/products-list";

export function BundleBuilder({
  products,
  className,
}: BundleBuilderProps) {
  const { openStepId, toggleStep, goNext, accordionSteps } =
    useBundleBuilderActions(products);

  return (
    <ProductsList
      steps={accordionSteps}
      openStepId={openStepId}
      onToggleStep={toggleStep}
      onNext={goNext}
      className={className}
      ProductCard={ProductCard}
    />
  );
}
