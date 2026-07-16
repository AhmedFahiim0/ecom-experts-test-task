import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/cart-context";
import {
  BundleBuilderV1,
  BundleBuilderV2,
  getBundleData,
} from "@/features/bundle-builder";
import { ReviewPanelV1, ReviewPanelV2 } from "@/features/review-panel";
import type { BundleData } from "@/types";

function App() {
  const [bundle, setBundle] = useState<BundleData | null>(null);
  const [version, setVersion] = useState<1 | 2>(1);

  useEffect(() => {
    getBundleData().then(setBundle);
  }, []);

  if (!bundle) {
    return null;
  }

  const BundleBuilder = version === 1 ? BundleBuilderV1 : BundleBuilderV2;
  const ReviewPanel = version === 1 ? ReviewPanelV1 : ReviewPanelV2;

  return (
    <CartProvider products={bundle.products}>
      <div className="flex justify-center gap-2 pt-4">
        <button
          type="button"
          onClick={() => setVersion(1)}
          className={
            version === 1
              ? "rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-white"
              : "rounded-md border border-border-divider px-3 py-1.5 text-sm font-medium text-text-muted"
          }
        >
          Version 1
        </button>
        <button
          type="button"
          onClick={() => setVersion(2)}
          className={
            version === 2
              ? "rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-white"
              : "rounded-md border border-border-divider px-3 py-1.5 text-sm font-medium text-text-muted"
          }
        >
          Version 2
        </button>
      </div>
      <h1 className="md:hidden text-4xl font-bold text-center mt-[31px] mb-5">
        Let’s get started!
      </h1>
      <main className="flex flex-col lg:flex-row items-start gap-8 lg:px-[122px] lg:py-[49px]">
        <BundleBuilder
          steps={bundle.steps}
          products={bundle.products}
          className="lg:w-[768px] w-full"
        />
        <ReviewPanel bundle={bundle} className="lg:w-[390px] w-full" />
      </main>
      <Toaster position="bottom-right" richColors />
    </CartProvider>
  );
}

export default App;
