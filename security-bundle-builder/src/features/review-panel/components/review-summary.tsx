import { formatCurrency } from "@/utils/format-currency";
import type { BundleData } from "@/types";
import { Badge } from "@/components/ui/badge";
import type { ReviewTotals } from "../types";
import ReviewPanelFooter from "./review-footer";

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
          <Badge variant={"normalRounded"} className="px-2 py-[5px]">
            {bundle.financingLabel}
          </Badge>

          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg text-text-strike line-through">
              {formatCurrency(totals.compareTotal)}
            </span>
            <span className="text-2xl font-bold text-brand ms-2">
              {formatCurrency(totals.total)}
            </span>
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
