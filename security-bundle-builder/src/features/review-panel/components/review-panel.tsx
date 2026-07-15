import { cn } from "@/utils/cn";
import { useReviewPanelActions } from "../helpers/use-actions";
import { ReviewLineItemRow } from "./review-line-item";
import { ReviewSummary } from "./review-summary";
import type { ReviewPanelProps } from "../types";

export function ReviewPanel({ bundle, className }: ReviewPanelProps) {
  const { groups, totals, saveForLater, checkout } = useReviewPanelActions(bundle.products);

  return (
    <div className={cn("flex flex-col gap-4 rounded-lg bg-page p-4", className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-text">Your security system</h2>
        <p className="text-md text-text-secondary">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-3 border-t border-border-divider pt-3 first:border-t-0 first:pt-0">
            <span className="text-sm font-medium uppercase tracking-label text-text-label">
              {group.label}
            </span>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <ReviewLineItemRow key={item.key} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ReviewSummary
        bundle={bundle}
        totals={totals}
        onCheckout={checkout}
        onSaveForLater={saveForLater}
      />
    </div>
  );
}
