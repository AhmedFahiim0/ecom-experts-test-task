import { cn } from "@/utils/cn";
import { ReviewLineItemRow } from "./review-line-item";
import { ReviewSummary } from "./review-summary";
import { ShippingRow } from "./shipping-row";
import type { ReviewPanelProps } from "../types";
import { useReviewPanelActions } from "../helpers/use-actions";

export function ReviewPanel({ bundle, className }: ReviewPanelProps) {
  const { groups, totals, saveForLater, checkout } = useReviewPanelActions(
    bundle.products,
  );

  return (
    <section className={cn("rounded-lg bg-page", className)}>
      <span className="block p-[15px] md:text-sm text-xs uppercase tracking-label text-text-muted">
        Review
      </span>
      <div className="px-5 pb-5">
        <div className="flex flex-col gap-1 mb-2.5">
          <h2 className="text-xl font-semibold text-text leading-[100%]">
            Your security system
          </h2>
          <p className="text-sm text-text-secondary">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
        </div>

        <div>
          {groups.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-3 border-t border-border-divider pt-[15px] pb-[10px]"
            >
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

        <ShippingRow shipping={bundle.shipping} />

        <ReviewSummary
          bundle={bundle}
          totals={totals}
          onCheckout={checkout}
          onSaveForLater={saveForLater}
        />
      </div>
    </section>
  );
}
