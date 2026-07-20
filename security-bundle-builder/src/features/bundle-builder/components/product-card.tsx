import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";
import { CountControl } from "@/components/shared/count-control";
import type { Product } from "@/types";
import { VariantSelector } from "./variant-selector";
import { Price } from "@/components/shared/price";

const cardVariants = cva(
  "flex items-center gap-[19px] rounded-lg bg-surface p-[11px] transition-[border-color]",
  {
    variants: {
      selected: {
        true: "border-2 border-brand-border",
        false: "border-2 border-transparent",
      },
      structure: {
        versionOne: "flex-row",
        versionTwo: "flex-col",
      },
    },
    defaultVariants: {
      selected: false,
      structure: "versionOne",
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
  structure?: VariantProps<typeof cardVariants>["structure"];
}

export function ProductCard({
  product,
  quantity,
  activeVariantId,
  onIncrement,
  onDecrement,
  onSelectVariant,
  className,
  structure,
}: ProductCardProps) {
  const selected = quantity > 0;
  const min = product.required ? 1 : 0;
  return (
    <div
      className={cn(
        "relative md:basis-[361.5px]",
        cardVariants({ selected, structure }),
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
          <h3 className="tracking-wide text-text leading-[100%] font-gilroy-semibold">
            {product.name}
          </h3>
          <p className="text-sm leading-[1.3] text-text-secondary mt-2 mb-[10px] line-clamp-3 font-gilroy-medium">
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
            location="product"
          />
          <div className="flex flex-col">
            {product.comparePrice !== product.price ? (
              <Price
                value={product.comparePrice}
                color="sale"
                strikethrough
                fontWeight={"regular"}
              />
            ) : null}

            <Price
              value={product.price}
              color={"base"}
              fontWeight={"regular"}
            />
          </div>
        </div>
      </div>

      {product.badge ? (
        <Badge
          variant="fullRounded"
          className="absolute inset-s-[11px] top-[11px] z-10 px-[6px] py-0.5 font-gilroy-semibold"
        >
          {product.badge}
        </Badge>
      ) : null}
    </div>
  );
}
