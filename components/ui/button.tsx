import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variantClasses = {
      primary: "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg hover:shadow-xl focus:ring-primary",
      secondary:
        "bg-foreground text-background hover:opacity-90 focus:ring-foreground",
      ghost:
        "bg-transparent text-foreground hover:bg-muted focus:ring-muted-text",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-muted focus:ring-muted-text",
    };
    const sizeClasses = {
      sm: "h-9 px-4 text-xs rounded-xl",
      md: "h-11 px-5 py-2.5 text-sm rounded-xl",
      lg: "h-13 px-7 py-3 text-base rounded-xl",
    };
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
