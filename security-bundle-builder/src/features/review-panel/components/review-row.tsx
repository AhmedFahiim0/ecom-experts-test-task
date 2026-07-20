import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export default function ReviewRow({
  image,
  imageAlt,
  label,
  className,
  children,
}: {
  image: string;
  imageAlt?: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="size-[41px] bg-surface p-1 rounded-thumb">
        <img
          src={image}
          alt={imageAlt ?? ""}
          aria-hidden={!imageAlt}
          className="shrink-0 rounded-thumb object-cover"
        />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <span className="md:text-base text-sm text-text-strong font-gilroy-medium">
          {label}
        </span>

        {children}
      </div>
    </div>
  );
}
