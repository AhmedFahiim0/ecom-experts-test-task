import { formatCurrency } from "@/utils/format-currency";
import type { BundleData } from "@/types";

export function ShippingRow({
  shipping,
}: {
  shipping: BundleData["shipping"];
}) {
  return (
    <div className="flex items-center gap-3 border-t border-border-divider pt-[15px] pb-[10px]">
      <div className="h-[41px] w-[41px] bg-surface p-1 rounded-thumb">
        <img
          src={shipping.icon}
          alt=""
          aria-hidden
          className="shrink-0 rounded-thumb object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="md:text-base text-sm font-medium text-text-strong">
          {shipping.label}
        </span>

        <div className="flex flex-col items-end">
          <span className="text-text-strike line-through">
            {formatCurrency(shipping.comparePrice)}
          </span>
          <span className="font-semibold text-brand">FREE</span>
        </div>
      </div>
    </div>
  );
}
