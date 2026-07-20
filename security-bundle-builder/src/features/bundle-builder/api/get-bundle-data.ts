import bundleData from "@/data/bundle.json";
import type { BundleData } from "@/types";

export async function getBundleData(): Promise<BundleData> {
  return bundleData as BundleData;
}
