import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import type { BundleData } from "@/types";
import type { ReviewTotals } from "../types";
import { Badge } from "@/components/ui/badge";

export interface ReviewSummaryProps {
  bundle: BundleData;
  totals: ReviewTotals;
  onCheckout: () => void;
  onSaveForLater: () => void;
}

export function ReviewSummary({
  bundle,
  totals,
  onCheckout,
  onSaveForLater,
}: ReviewSummaryProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-border-divider pt-4">
      {/* <div className="flex items-center justify-between text-base text-text">
        <span>{bundle.shipping.label}</span>
        <span className="font-semibold text-success">FREE</span>
      </div> */}

      <div className="flex items-center justify-between">
        <img
          src="/products/satisfaction-badge.png"
          alt=""
          aria-hidden
          className="size-[78px] shrink-0"
        />
        <div className="text-end">
          <Badge variant={"normalRounded"} className="px-2 py-[5px]">
            {bundle.financingLabel}
          </Badge>

          <div className="flex items-baseline justify-between mt-2">
            <span className="text-lg text-text-strike line-through">
              {formatCurrency(totals.compareTotal)}
            </span>
            <span className="text-2xl font-bold text-brand  ms-2">
              {formatCurrency(totals.total)}
            </span>
          </div>
        </div>
      </div>

      {totals.savings > 0 ? (
        <p className="text-center text-sm font-semibold text-success">
          Congrats! You&rsquo;re saving {formatCurrency(totals.savings)} on your
          security bundle!
        </p>
      ) : null}

      <Button variant="filled" radius="md" fullWidth onClick={onCheckout}>
        Checkout
      </Button>

      <Button variant="underline" onClick={onSaveForLater} className="mx-auto">
        Save my system for later
      </Button>
    </div>
  );
}
