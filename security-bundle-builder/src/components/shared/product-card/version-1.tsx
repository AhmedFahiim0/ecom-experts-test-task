import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format-currency";
import { Badge } from "@/components/ui/badge";
import { CountControl } from "@/components/shared/count-control";
import type { Product } from "@/types";
import { VariantSelector } from "./variant-selector";

const cardVariants = cva(
  "flex items-center gap-[19px] rounded-lg bg-surface p-[11px] transition-[border-color]",
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
    <div
      className={cn(
        "relative lg:basis-[361.5px] ",
        cardVariants({ selected }),
        className,
      )}
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-[137px] w-[101px] rounded-thumb object-cover"
      />

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <h3 className="tracking-wide text-text leading-[100%] font-semibold">
            {product.name}
          </h3>
          <p className="text-sm leading-[1.3] text-text-secondary mt-2 mb-[10px] line-clamp-3 font-medium">
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

        <div className="flex items-center justify-between leading-[100%]">
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

      {product.badge ? (
        <Badge
          variant="fullRounded"
          className="absolute inset-s-[11px] top-[11px] z-10 px-[6px] py-0.5"
        >
          {product.badge}
        </Badge>
      ) : null}
    </div>
  );
}
