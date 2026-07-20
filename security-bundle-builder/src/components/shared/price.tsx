import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format-currency";

const priceVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm md:text-base",
      base: "text-md",
      lg: "text-lg",
      xxl: "text-2xl",
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
      regular: "font-gilroy-regular",
      medium: "font-gilroy-medium",
      semibold: "font-gilroy-semibold",
      bold: "font-gilroy-bold",
    },
  },
  defaultVariants: {
    size: "base",
    color: "base",
    strikethrough: false,
    fontWeight: "regular",
  },
});

export interface PriceProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof priceVariants> {
  value: number;
  suffix?: string;
}

export function Price({
  value,
  size,
  color,
  fontWeight,
  strikethrough,
  className,
  suffix,
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
      {suffix ? suffix : null}
    </span>
  );
}
