import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/cart-context";
import type { BundleData } from "@/types";
import { BundleBuilder } from "./features/bundle-builder";
import { ReviewPanel } from "./features/review-panel";
import { getBundleData } from "./features/bundle-builder/api/get-bundle-data";

function App() {
  const [bundle, setBundle] = useState<BundleData | null>(null);

  const saveBundleData = async () => {
    const res = await getBundleData();

    setBundle(res);
  };

  useEffect(() => {
    saveBundleData();
  }, []);

  if (!bundle) return null;

  return (
    <CartProvider products={bundle.products}>
      <h1 className="md:hidden text-4xl font-bold text-center mt-[31px] mb-5 font-gilroy-bold">
        Let’s get started!
      </h1>
      <main className="flex flex-col lg:flex-row items-start gap-8 lg:px-[122px] lg:py-[49px]">
        <BundleBuilder
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
