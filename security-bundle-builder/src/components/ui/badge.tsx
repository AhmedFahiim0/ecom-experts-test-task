import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva("w-fit bg-brand text-white text-sm font-semibold", {
  variants: {
    variant: {
      fullRounded: "rounded-lg",
      normalRounded: "rounded-[3px]",
    },
  },
  defaultVariants: {
    variant: "fullRounded",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
