import { CountControl } from "@/components/shared/count-control";
import ReviewRow from "./review-row";
import type { ReviewLineItem } from "../types";
import { Price } from "@/components/shared/price";

export default function ReviewProduct({ item }: { item: ReviewLineItem }) {
  const {
    product,
    quantity,

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

        <div className="flex flex-col items-end">
          {product.comparePrice !== product.price ? (
            <Price
              value={product.comparePrice}
              color="base"
              size={"sm"}
              fontWeight={"semibold"}
              strikethrough
            />
          ) : null}

          <Price
            value={product.price}
            color={"brand"}
            size={"sm"}
            fontWeight={"semibold"}
          />
        </div>
      </div>
    </ReviewRow>
  );
}
