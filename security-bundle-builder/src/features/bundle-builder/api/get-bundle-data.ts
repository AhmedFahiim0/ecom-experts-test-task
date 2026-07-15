import bundleData from "@/data/bundle.json";
import type { BundleData } from "@/types";

// Local JSON today; swap the body for a real fetch("/api/bundle") if a backend lands later.
export async function getBundleData(): Promise<BundleData> {
  return bundleData as BundleData;
}
