import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import { GuaranteeBanner } from "@/features/review-panel/components/guarantee-banner";
import type { BundleData } from "@/types";
import { Badge } from "@/components/ui/badge";
import type { ReviewTotals } from "../types";

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
    <div className="flex flex-col gap-3">
      <GuaranteeBanner guarantee={bundle.guarantee} />

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

      {totals.savings > 0 ? (
        <p className="text-center text-sm font-semibold text-success mt-[14px] mb-1">
          Congrats! You&rsquo;re saving {formatCurrency(totals.savings)} on your
          security bundle!
        </p>
      ) : null}

      <Button variant="filled" radius="md" fullWidth onClick={onCheckout}>
        Checkout
      </Button>

      <Button
        variant="underline"
        onClick={onSaveForLater}
        className="mx-auto mt-2 leading-[120%]"
      >
        Save my system for later
      </Button>
    </div>
  );
}
