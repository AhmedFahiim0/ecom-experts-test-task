import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";

const stepperButtonVariants = cva(
  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors font-gilroy-medium cursor-pointer",
  {
    variants: {
      state: {
        cart_enabled: "bg-bg-muted text-text-strong hover:border-brand/40",
        cart_disabled:
          "border-2 border-border-stepper border border-border-divider text-text-strike",
        review_enabled: "bg-bg-muted text-text-strong hover:border-brand/40",
        review_disabled:
          "border-2 border-border-stepper border border-border-divider text-text-strike",
      },
    },
    defaultVariants: {
      state: "cart_enabled",
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
  "aria-label"?: string;
}

export function CountControl({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max,
  className,

  "aria-label": ariaLabel,
}: CountControlProps) {
  const decrementDisabled = value <= min;
  const incrementDisabled = max !== undefined && value >= max;

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
          state: decrementDisabled ? "disabled" : "enabled",
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
          state: incrementDisabled ? "disabled" : "enabled",
        })}
        onClick={onIncrement}
        disabled={incrementDisabled}
      >
        <PlusIcon className="h-2 w-2" />
      </button>
    </div>
  );
}
