import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";

const stepperButtonVariants = cva(
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors font-gilroy-medium cursor-pointer",
  {
    variants: {
      state: {
        product_enabled: "bg-bg-muted text-text-strong hover:border-brand/40",
        product_disabled:
          "border-2 border-border-stepper border border-border-divider text-text-strike pointer-events-none",
        review_enabled: "bg-surface",
        review_disabled:
          "bg-bg-disabled border border-border-divider pointer-events-none",
      },
    },
    defaultVariants: {
      state: "product_enabled",
    },
  },
);

export interface CountControlProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  className?: string;
  location: "product" | "review";
  "aria-label"?: string;
}

export function CountControl({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max,
  className,
  location,
  "aria-label": ariaLabel,
}: CountControlProps) {
  const decrementDisabled = value <= min;

  const incrementDisabled = max !== undefined && value >= max;

  const stateMap = {
    enabled: location === "product" ? "product_enabled" : "review_enabled",
    disabled: location === "product" ? "product_disabled" : "review_disabled",
  } as const;

  return (
    <div
      className={cn("flex w-[72px] items-center justify-between", className)}
    >
      <button
        type="button"
        aria-label={
          ariaLabel ? `Decrease ${ariaLabel} quantity` : "Decrease quantity"
        }
        className={stepperButtonVariants({
          state: decrementDisabled ? stateMap.disabled : stateMap.enabled,
        })}
        onClick={onDecrement}
        disabled={decrementDisabled}
      >
        <MinusIcon className="h-2 w-2" />
      </button>

      <span className="min-w-4 text-center text-md font-gilroy-medium text-text-strong">
        {value}
      </span>

      <button
        type="button"
        aria-label={
          ariaLabel ? `Increase ${ariaLabel} quantity` : "Increase quantity"
        }
        className={stepperButtonVariants({
          state: incrementDisabled ? stateMap.disabled : stateMap.enabled,
        })}
        onClick={onIncrement}
        disabled={incrementDisabled}
      >
        <PlusIcon className="h-2 w-2" />
      </button>
    </div>
  );
}
