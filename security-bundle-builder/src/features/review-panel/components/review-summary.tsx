import { formatCurrency } from "@/utils/format-currency";
import type { BundleData } from "@/types";
import { Badge } from "@/components/ui/badge";
import type { ReviewTotals } from "../types";
import ReviewPanelFooter from "./review-footer";
import { Price } from "@/components/shared/price";

export interface ReviewSummaryProps {
  bundle: BundleData;
  totals: ReviewTotals;
  onCheckout: () => void;
  onSaveForLater: () => void;
}

export default function ReviewSummary({
  bundle,
  totals,
  onCheckout,
  onSaveForLater,
}: ReviewSummaryProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <img
          src="/products/satisfaction-badge.png"
          alt=""
          aria-hidden
          className="h-[90px] w-[90px] shrink-0"
        />
        <div className="text-end">
          <Badge
            variant={"normalRounded"}
            className="px-2 py-[5px] font-gilroy-medium"
          >
            {bundle.financingLabel}
          </Badge>

          <div className="flex gap-2 items-baseline justify-between mt-2">
            {totals.compareTotal > 0 ? (
              <Price
                value={totals.compareTotal}
                fontWeight="medium"
                size="lg"
                strikethrough
                className="text-strike!"
              />
            ) : null}

            <Price
              value={totals.total}
              fontWeight="bold"
              color="brand"
              size="xxl"
            />
          </div>
        </div>
      </div>

      <ReviewPanelFooter
        savings={totals.savings}
        onCheckout={onCheckout}
        onSaveForLater={onSaveForLater}
      />
    </section>
  );
}
