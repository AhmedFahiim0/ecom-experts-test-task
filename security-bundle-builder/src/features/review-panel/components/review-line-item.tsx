import { formatCurrency } from "@/utils/format-currency";
import { CountControl } from "@/components/shared/count-control";
import type { ReviewLineItem } from "../types";

export function ReviewLineItemRow({ item }: { item: ReviewLineItem }) {
  const { product, quantity, hasAddControl, onIncrement, onDecrement } = item;
  const min = product.required ? 1 : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="h-[41px] w-[41px] bg-surface p-1 rounded-thumb">
        <img
          src={product.image}
          alt={product.name}
          className="shrink-0 rounded-thumb object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="md:text-base text-sm font-medium text-text-strong">
          {product.name}
        </span>

        <div className="flex items-center gap-4">
          {hasAddControl ? (
            <CountControl
              value={quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              min={min}
              max={product.maxQuantity}
              aria-label={product.name}
            />
          ) : null}

          <div className="flex flex-col items-end text-sm md:text-base">
            {product.comparePrice !== product.price ? (
              <span className="text-text-strike line-through">
                {formatCurrency(product.comparePrice * quantity)}
                {product.stepId === "plan" ? "/mo" : ""}
              </span>
            ) : null}
            <span className="font-semibold text-brand">
              {product.priceLabel ?? formatCurrency(product.price * quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
