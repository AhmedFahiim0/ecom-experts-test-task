import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/utils/cn";

export function PriceBlock({
  comparePrice,
  price,
  priceLabel,
  suffix,
  className,
}: {
  comparePrice: number;
  price: number;
  priceLabel?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-end", className)}>
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
