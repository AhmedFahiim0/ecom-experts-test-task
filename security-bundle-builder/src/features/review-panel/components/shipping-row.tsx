import type { BundleData } from "@/types";
import ReviewRow from "./review-row";
import { Price } from "@/components/shared/price";

export default function ShippingRow({
  shipping,
}: {
  shipping: BundleData["shipping"];
}) {
  return (
    <ReviewRow
      image={shipping.icon}
      label={shipping.label}
      className="border-t border-border-divider pt-[15px] pb-[10px]"
    >
      <div className="flex flex-col items-end">
        {shipping.comparePrice !== shipping.price ? (
          <Price
            value={shipping.comparePrice}
            color="base"
            size={"sm"}
            strikethrough
            fontWeight={"semibold"}
          />
        ) : null}

        <Price
          value={shipping.price}
          color={"brand"}
          size={"sm"}
          fontWeight={"semibold"}
        />
      </div>
    </ReviewRow>
  );
}
