import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format-currency";

const priceVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm md:text-base",
      base: "text-md",
    },
    color: {
      base: "text-price",
      brand: "text-brand",
      sale: "text-sale",
    },
    strikethrough: {
      true: "line-through",
    },
    fontWeight: {
      base: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "base",
    color: "base",
    strikethrough: false,
    fontWeight: "base",
  },
});

export interface PriceProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof priceVariants> {
  value: number;
}

export function Price({
  value,
  size,
  color,
  fontWeight,
  strikethrough,
  className,
  ...props
}: PriceProps) {
  return (
    <span
      className={cn(
        priceVariants({ size, color, fontWeight, strikethrough }),
        className,
      )}
      {...props}
    >
      {value === 0 ? "FREE" : formatCurrency(value)}
    </span>
  );
}
