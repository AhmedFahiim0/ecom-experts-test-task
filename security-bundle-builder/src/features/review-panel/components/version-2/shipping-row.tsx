import { ProductRow } from "@/components/shared/product-row";
import { PriceBlock } from "@/components/shared/price-block";
import type { BundleData } from "@/types";

export function ShippingRow({
  shipping,
}: {
  shipping: BundleData["shipping"];
}) {
  return (
    <ProductRow
      image={shipping.icon}
      label={shipping.label}
      className="border-t border-border-divider pt-[15px] pb-[10px]"
    >
      <PriceBlock
        comparePrice={shipping.comparePrice}
        price={shipping.price}
        priceLabel={shipping.priceLabel}
        className="text-sm md:text-base"
      />
    </ProductRow>
  );
}
