import { formatCurrency } from "@/utils/format-currency";
import { CountControl } from "@/components/shared/count-control";
import type { ReviewLineItem } from "../types";

export function ReviewLineItemRow({ item }: { item: ReviewLineItem }) {
  const { product, variant, quantity, hasAddControl, onIncrement, onDecrement } = item;
  const min = product.required ? 1 : 0;

  return (
    <div className="flex items-center gap-3">
      <img
        src={product.image}
        alt={product.name}
        className="h-[41px] w-[41px] shrink-0 rounded-thumb object-cover"
      />

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-md font-medium text-text-strong">
            {product.name}
            {variant ? <span className="text-text-secondary"> — {variant.label}</span> : null}
          </span>
          {hasAddControl ? (
            <CountControl
              value={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              min={min}
              max={product.maxQuantity}
              aria-label={product.name}
            />
          ) : (
            <span className="text-sm text-text-secondary">Qty {quantity}</span>
          )}
        </div>

        <div className="flex flex-col items-end">
          {product.comparePrice !== product.price ? (
            <span className="text-base text-text-strike line-through">
              {formatCurrency(product.comparePrice * quantity)}
            </span>
          ) : null}
          <span className="text-base font-semibold text-brand">
            {product.priceLabel ?? formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
