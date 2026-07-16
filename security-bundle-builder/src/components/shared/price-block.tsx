import { cva, type VariantProps } from "class-variance-authority";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/utils/cn";

const priceBlockVariants = cva("flex", {
  variants: {
    structure: {
      versionOne: "flex-col items-end",
      versionTwo: "flex-row items-baseline gap-2",
    },
  },
  defaultVariants: {
    structure: "versionOne",
  },
});

export function PriceBlock({
  comparePrice,
  price,
  priceLabel,
  suffix,
  className,
  structure,
}: {
  comparePrice: number;
  price: number;
  priceLabel?: string;
  suffix?: string;
  className?: string;
  structure?: VariantProps<typeof priceBlockVariants>["structure"];
}) {
  return (
    <div className={cn(priceBlockVariants({ structure }), className)}>
      {comparePrice !== price ? (
        <span className="text-text-strike line-through">
          {formatCurrency(comparePrice)}
          {suffix}
        </span>
      ) : null}
      <span className="font-semibold text-brand">
        {priceLabel ?? formatCurrency(price)}
      </span>
    </div>
  );
}
