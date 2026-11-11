import { forwardRef, useState, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type LoveButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export const LoveButton = forwardRef<HTMLButtonElement, LoveButtonProps>(
  ({ className, variant = "primary", children, onClick, ...props }, ref) => {
    const [bursts, setBursts] = useState<{id: number, x: number, y: number}[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "primary") {
        const rect = e.currentTarget.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const newBursts = Array.from({ length: 12 }).map((_, i) => ({
          id: Date.now() + i,
          x: cx + (Math.random() - 0.5) * 40,
          y: cy + (Math.random() - 0.5) * 40,
        }));
        setBursts(newBursts);
        setTimeout(() => setBursts([]), 1000);
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        {...props}
        className={cn(
          "relative overflow-hidden inline-flex min-h-[3.25rem] items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold tracking-wide",
          "transition-all duration-300 outline-none select-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-95 group",
          variant === "primary"
            ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_0_34px_-8px_var(--primary-glow)] hover:shadow-[0_0_56px_-6px_var(--primary-glow)] hover:brightness-110"
            : "border border-border bg-white/5 text-foreground backdrop-blur-md hover:bg-white/10",
          className,
        )}
      >
        {variant === "primary" && (
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
            <div className="absolute inset-0 w-1/2 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep opacity-70" />
          </div>
        )}
        <span className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
           {children}
        </span>
        {bursts.length > 0 && bursts.map(b => (
          <HeartIcon
             key={b.id}
             className="absolute text-white/90 pointer-events-none z-20"
             style={{
                width: 10 + Math.random() * 8,
                height: 10 + Math.random() * 8,
                left: b.x, top: b.y,
                "--bx": `${(Math.random()-0.5)*120}px`,
                "--by": `${-40 - Math.random()*120}px`,
                animation: `burst 0.8s ease-out forwards`,
             } as CSSProperties}
          />
        ))}
      </button>
    );
  }
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