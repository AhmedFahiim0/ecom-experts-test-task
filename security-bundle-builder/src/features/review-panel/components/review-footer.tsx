import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";

interface Props {
  savings: number;
  onCheckout: () => void;
  onSaveForLater: () => void;
}

export default function ReviewPanelFooter({
  savings,
  onCheckout,
  onSaveForLater,
}: Props) {
  return (
    <>
      {savings > 0 ? (
        <p className="text-center text-sm font-semibold text-success mt-[14px] mb-1">
          Congrats! You&rsquo;re saving {formatCurrency(savings)} on your
          security bundle!
        </p>
      ) : null}

      <Button variant="filled" radius="md" fullWidth onClick={onCheckout}>
        Checkout
      </Button>

      <Button
        variant="underline"
        onClick={onSaveForLater}
        className="w-full text-center mt-2 leading-[120%]"
      >
        Save my system for later
      </Button>
    </>
  );
}
