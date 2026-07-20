import { CountControl } from "@/components/shared/count-control";
import ReviewRow from "./review-row";
import type { ReviewLineItem } from "../types";
import { PriceBlock } from "@/components/shared/price-block";

export default function ReviewProduct({ item }: { item: ReviewLineItem }) {
  const {
    product,
    quantity,
    lineTotal,
    lineCompareTotal,
    hasAddControl,
    onIncrement,
    onDecrement,
  } = item;

  const min = product.required ? 1 : 0;

  return (
    <ReviewRow
      image={product.image}
      imageAlt={product.name}
      label={product.name}
    >
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

        <PriceBlock
          className="text-sm md:text-base"
          comparePrice={lineCompareTotal}
          price={lineTotal}
          priceLabel={product.priceLabel}
          suffix={product.stepId === "plan" ? "/mo" : ""}
        />
      </div>
    </ReviewRow>
  );
}
