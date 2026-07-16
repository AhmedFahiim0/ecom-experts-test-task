import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format-currency";
import { Badge } from "@/components/ui/badge";
import { CountControl } from "@/components/shared/count-control";
import type { Product } from "@/types";
import { VariantSelector } from "./variant-selector";

const cardVariants = cva(
  "flex h-full flex-col rounded-lg bg-surface p-[15px] transition-[border-color]",
  {
    variants: {
      selected: {
        true: "border-2 border-brand-border",
        false: "border-2 border-transparent",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

export interface ProductCardProps {
  product: Product;
  quantity: number;
  activeVariantId?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onSelectVariant?: (variantId: string) => void;
  className?: string;
}

export function ProductCard({
  product,
  quantity,
  activeVariantId,
  onIncrement,
  onDecrement,
  onSelectVariant,
  className,
}: ProductCardProps) {
  const selected = quantity > 0;
  const min = product.required ? 1 : 0;

  return (
    <div className={cn("relative", cardVariants({ selected }), className)}>
      {product.badge ? (
        <Badge
          variant="fullRounded"
          className="absolute inset-s-[11px] top-[11px] z-10 px-[6px] py-0.5"
        >
          {product.badge}
        </Badge>
      ) : null}

      <img
        src={product.image}
        alt={product.name}
        className="h-[150px] w-full object-contain"
      />

      <div className="flex flex-col gap-2">
        <h3 className="tracking-wide text-text leading-[100%] font-semibold">
          {product.name}
        </h3>
        <p className="text-sm leading-[1.3] text-text-secondary line-clamp-3 font-medium">
          {product.description}

          <span className="ms-1 link-inline cursor-pointer">Learn More</span>
        </p>
        {product.variants?.length ? (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId}
            onSelect={(variantId) => onSelectVariant?.(variantId)}
          />
        ) : null}
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 leading-[100%]">
        <CountControl
          value={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          min={min}
          max={product.maxQuantity}
          aria-label={product.name}
        />
        <div className="flex flex-col text-end">
          {product.comparePrice !== product.price ? (
            <span className="text-sale line-through">
              {formatCurrency(product.comparePrice)}
            </span>
          ) : null}
          <span className="text-text-price">
            {product.priceLabel ?? formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
