import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-center transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled:
          "bg-brand text-white font-inter font-bold text-[17px] px-4 py-[13px] hover:bg-brand/90 h-12",
        outline:
          "border border-brand text-brand bg-transparent font-semibold text-lg leading-6 px-6 py-[5px] hover:bg-brand/5",
        underline:
          "bg-transparent p-0 text-text-muted text-base underline italic font-normal hover:text-brand",
      },
      radius: {
        none: "rounded-none",
        md: "rounded-md",
        btn: "rounded-btn",
        lg: "rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      radius: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  radius,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, radius, fullWidth }), className)}
      {...props}
    />
  );
}
