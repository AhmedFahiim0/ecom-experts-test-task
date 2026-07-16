import { cn } from "@/utils/cn";
import { ReviewLineItemRow } from "../../../components/shared/review-line-item";
import { ReviewSummary } from "./review-summary";
import { ShippingRow } from "../../../components/shared/shipping-row";
import type { ReviewPanelProps } from "../types";
import { useReviewPanelActions } from "../helpers/use-actions";
import ReviewPanelHeader from "@/components/shared/review-panel-header";

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
        <ReviewPanelHeader />

        <div>
          {groups.map((group) => (
            <div
              key={group.category}
              className="flex flex-col gap-2 border-t border-border-divider pt-[15px] pb-[10px]"
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
