import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type LoveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export const LoveButton = forwardRef<HTMLButtonElement, LoveButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={cn(
        "inline-flex min-h-[3.25rem] items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold tracking-wide",
        "transition-all duration-300 outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-95",
        variant === "primary"
          ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_0_34px_-8px_var(--primary-glow)] hover:shadow-[0_0_56px_-6px_var(--primary-glow)] hover:brightness-110"
          : "border border-border bg-white/5 text-foreground backdrop-blur-md hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  ),
);
LoveButton.displayName = "LoveButton";

export function HeartIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 32 29" aria-hidden="true" className={className} style={style}>
      <path
        fill="currentColor"
        d="M16 28.5S0 19.2 0 9.6A8.6 8.6 0 0 1 8.7 1c3.1 0 5.8 1.7 7.3 4.2C17.5 2.7 20.2 1 23.3 1A8.6 8.6 0 0 1 32 9.6c0 9.6-16 18.9-16 18.9Z"
      />
    </svg>
  );
}

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-step-in mx-auto flex w-full max-w-lg flex-col items-center px-5 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}