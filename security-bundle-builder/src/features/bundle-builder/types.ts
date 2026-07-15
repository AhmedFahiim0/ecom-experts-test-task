import type { Product, StepInfo } from "@/types";

export interface BundleBuilderProps {
  steps: StepInfo[];
  products: Product[];
  className?: string;
}
