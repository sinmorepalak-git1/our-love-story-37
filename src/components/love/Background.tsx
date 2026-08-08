import { useMemo } from "react";
import { HeartIcon } from "./ui";

function rand(seed: number) {
  const x = Math.sin(seed * 9973.13) * 10000;
  return x - Math.floor(x);
}

export function LoveBackground({ intense = false }: { intense?: boolean }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${rand(i + 1) * 96}%`,
        size: 10 + rand(i + 21) * 26,
        duration: 16 + rand(i + 41) * 16,
        delay: -rand(i + 61) * 26,
        opacity: 0.12 + rand(i + 81) * 0.3,
        dx: `${(rand(i + 101) - 0.5) * 90}px`,
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: `${rand(i + 201) * 98}%`,
        top: `${rand(i + 301) * 98}%`,
        size: 2 + rand(i + 401) * 2.5,
        duration: 2.5 + rand(i + 501) * 4,
        delay: -rand(i + 601) * 6,
      })),
    [],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="love-bg absolute inset-0" />
      <div
        className="absolute -top-40 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.19 350 / 38%), transparent 65%)",
          opacity: intense ? 1 : 0.6,
        }}
      />
      {sparkles.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: "0 0 8px oklch(0.9 0.1 350 / 80%)",
          }}
        />
      ))}
      {hearts.map((h, i) => (
        <HeartIcon
          key={`h${i}`}
          className="absolute bottom-0 text-primary-glow"
          style={
            {
              left: h.left,
              width: h.size,
              height: h.size,
              "--s": 1,
              "--o": intense ? h.opacity + 0.25 : h.opacity,
              "--dx": h.dx,
              animation: `float-up ${intense ? h.duration * 0.55 : h.duration}s linear ${h.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}