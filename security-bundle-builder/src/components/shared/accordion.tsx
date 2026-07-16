import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/icons";
import { ProductCard } from "@/components/shared/product-card";
import type { Product, StepId } from "@/types";

export interface AccordionStepProduct {
  product: Product;
  quantity: number;
  activeVariantId?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onSelectVariant?: (variantId: string) => void;
}

export interface AccordionStepData {
  id: StepId;
  title: string;
  icon: string;
  nextLabel?: string;
  selectedCount: number;
  products: AccordionStepProduct[];
}

export interface AccordionProps {
  steps: AccordionStepData[];
  openStepId: StepId | null;
  onToggleStep: (stepId: StepId) => void;
  onNext: (nextStepId: StepId) => void;
  className?: string;
}

export function Accordion({
  steps,
  openStepId,
  onToggleStep,
  onNext,
  className,
}: AccordionProps) {
  return (
    <div className={cn("flex flex-col rounded-lg", className)}>
      {steps.map((step, index) => {
        const isOpen = step.id === openStepId;
        const nextStep = steps[index + 1];

        return (
          <div
            key={step.id}
            className={cn("border-b border-border-divider", {
              "bg-page rounded-lg": isOpen,
            })}
          >
            <button
              type="button"
              className="w-full text-start"
              aria-expanded={isOpen}
              onClick={() => onToggleStep(step.id)}
            >
              <span className="block text-sm uppercase tracking-label text-text-muted border-b-[0.5px] pb-[5px] px-[15px] pt-[15px] ">
                Step {index + 1} of {steps.length}
              </span>

              <div className="flex items-center justify-between px-[15px] py-[20px]">
                <div className="flex items-center gap-2">
                  <img
                    src={step.icon}
                    alt=""
                    aria-hidden
                    className="h-[26px] w-[26px]"
                  />
                  <span className="text-xl font-semibold  text-text">
                    {step.title}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-text-muted">
                  {isOpen ? (
                    <>
                      <span className="text-base font-medium text-brand">
                        {step.selectedCount} selected
                      </span>
                      <ChevronUpIcon className="h-3 w-3 text-brand" />
                    </>
                  ) : (
                    <ChevronDownIcon className="h-3 w-3" />
                  )}
                </div>
              </div>
            </button>

            {isOpen ? (
              <div className="flex flex-col gap-4 px-[15px] pb-5">
                <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-[15px]">
                  {step.products.map((entry) => (
                    <ProductCard
                      key={entry.product.id}
                      product={entry.product}
                      quantity={entry.quantity}
                      activeVariantId={entry.activeVariantId}
                      onIncrement={entry.onIncrement}
                      onDecrement={entry.onDecrement}
                      onSelectVariant={entry.onSelectVariant}
                    />
                  ))}
                </div>

                {nextStep && step.nextLabel ? (
                  <Button
                    type="button"
                    variant="outline"
                    radius="btn"
                    onClick={() => onNext(nextStep.id)}
                    className="w-fit mx-auto "
                  >
                    {step.nextLabel}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
