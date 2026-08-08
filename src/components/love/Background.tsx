import { useMemo, useState, useEffect, type CSSProperties } from "react";
import { HeartIcon } from "./ui";

function rand(seed: number) {
  const x = Math.sin(seed * 9973.13) * 10000;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

export function CursorTrail() {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 40) { // Throttle
        setTrails(prev => {
          const next = [...prev, { id: now, x: e.clientX, y: e.clientY }];
          if (next.length > 15) return next.slice(next.length - 15);
          return next;
        });
        lastTime = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden sm:block">
      {trails.map(t => (
        <HeartIcon
          key={t.id}
          className="absolute text-[#FF8FB7] animate-fade-out"
          style={{
            left: t.x,
            top: t.y,
            width: 14,
            height: 14,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

export function LoveBackground({ intense = false }: { intense?: boolean }) {
  const [secretFound, setSecretFound] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${rand(i + 1) * 96}%`,
        size: 10 + rand(i + 21) * 30, // more size variation
        duration: 12 + rand(i + 41) * 20, // different speeds
        delay: -rand(i + 61) * 26,
        opacity: 0.1 + rand(i + 81) * 0.4,
        dx: `${(rand(i + 101) - 0.5) * 120}px`, // different directions
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        left: `${rand(i + 201) * 98}%`,
        top: `${rand(i + 301) * 98}%`,
        size: 2 + rand(i + 401) * 3,
        duration: 2 + rand(i + 501) * 4,
        delay: -rand(i + 601) * 6,
      })),
    [],
  );

  return (
    <>
      <CursorTrail />
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="love-bg absolute inset-0" />
        <div
          className="absolute -top-40 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-1000"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 350 / 38%), transparent 65%)",
            opacity: intense ? 1 : 0.6,
          }}
        />
        
        {/* Subtle Pink Bokeh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,182,208,0.15)_0%,transparent_50%),radial-gradient(circle_at_top_right,rgba(255,135,180,0.15)_0%,transparent_50%)]" />

        {sparkles.map((s, i) => (
          <span
            key={`s${i}`}
            className="absolute rounded-full bg-white animate-pulse"
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
                filter: i % 3 === 0 ? "blur(2px)" : "none", // some blurred
                animation: `float-up ${intense ? h.duration * 0.55 : h.duration}s linear ${h.delay}s infinite`,
              } as CSSProperties
            }
          />
        ))}

        {/* Hidden Secret Heart Interaction */}
        <div 
          className="absolute text-primary-glow cursor-pointer pointer-events-auto transition-transform hover:scale-125 z-50"
          style={{
            left: "12%",
            top: "15%",
            width: "16px",
            height: "16px",
            opacity: 0.15,
            animation: "soft-float 3s ease-in-out infinite"
          }}
          onClick={() => setSecretFound(true)}
        >
          <HeartIcon className="w-full h-full" />
        </div>

        {secretFound && (
          <div className="absolute top-[18%] left-[12%] z-50 w-[200px] bg-white/90 backdrop-blur-sm border border-pink-200 rounded-xl p-3 text-sm text-[#FF4F98] shadow-lg animate-step-in font-medium pointer-events-auto">
            Hehe... you found my little secret. 💗
            <button onClick={() => setSecretFound(false)} className="absolute top-1 right-2 text-xs opacity-50 hover:opacity-100">✕</button>
          </div>
        )}
      </div>
    </>
  );
}