import type { BundleData } from "@/types";

export function GuaranteeBanner({
  guarantee,
}: {
  guarantee: BundleData["guarantee"];
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-page p-3">
      <img
        src="/products/satisfaction-badge.png"
        alt=""
        aria-hidden
        className="h-[90px] w-[90px] shrink-0"
      />
      <div>
        <h3 className="font-semibold text-text leading-[100%]">
          {guarantee.heading}
        </h3>
        <p className="text-sm text-text-secondary mt-1">{guarantee.body}</p>
      </div>
    </div>
  );
}
