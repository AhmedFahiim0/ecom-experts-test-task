import type { BundleData } from "@/types";

export async function getBundleData(): Promise<BundleData> {
  const response = await fetch("/data/bundle.json");
  return (await response.json()) as BundleData;
}
