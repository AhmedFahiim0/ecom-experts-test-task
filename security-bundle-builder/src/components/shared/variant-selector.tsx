import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import type { ProductVariant } from "@/types";

const chipVariants = cva(
  "flex h-[26px] w-[65px] items-center justify-center gap-1 rounded-xs border-[0.5px] border-border-subtle px-1 transition-colors font-medium",
  {
    variants: {
      chosen: {
        true: "bg-success/5 border border-success",
        false: "",
      },
    },
    defaultVariants: {
      chosen: false,
    },
  },
);

export interface VariantSelectorProps {
  variants: ProductVariant[];
  activeVariantId?: string;
  onSelect: (variantId: string) => void;
  className?: string;
}

export function VariantSelector({
  variants,
  activeVariantId,
  onSelect,
  className,
}: VariantSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="radiogroup">
      {variants.map((variant) => {
        const chosen = variant.id === activeVariantId;
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={chosen}
            className={chipVariants({ chosen })}
            onClick={() => onSelect(variant.id)}
          >
            <img
              src={variant.image}
              alt=""
              aria-hidden
              className="h-3.5 w-3.5 shrink-0 rounded-xs border border-border-subtle object-cover"
            />
            <span className="text-xs tracking-[0.6px] leading-[100%]">
              {" "}
              {variant.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
