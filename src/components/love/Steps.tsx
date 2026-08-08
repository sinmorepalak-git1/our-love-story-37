import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { HeartIcon, LoveButton, Screen } from "./ui";
import {
  loadingStatuses,
  questions,
  noButtonTexts,
  letters,
  rememberWhen,
} from "./content";
import { CursorTrail } from "./Background";

/* ---------------- STEP 0: Countdown ---------------- */
export function CountdownStep({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'sprinkle' | '3' | '2' | '1' | 'burst'>('sprinkle');
  const [bursts, setBursts] = useState<{ id: number; bx: number; by: number; scale: number; type: string }[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('3'), 800);
    const t2 = setTimeout(() => setPhase('2'), 1800);
    const t3 = setTimeout(() => setPhase('1'), 2800);
    const t4 = setTimeout(() => {
      setPhase('burst');
      // Generate cinematic heart burst
      const newBursts = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        bx: (Math.random() - 0.5) * 800,
        by: (Math.random() - 0.5) * 800,
        scale: 0.5 + Math.random(),
        type: Math.random() > 0.6 ? 'sparkle' : (Math.random() > 0.5 ? 'heart' : 'outline')
      }));
      setBursts(newBursts);
    }, 3800);
    const t5 = setTimeout(() => onDone(), 4200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); }
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#6A1A3B] via-[#3B0E23] to-[#1C0612] animate-step-in">
      {/* Gentle Pink Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,150,0.15)_0%,transparent_60%)]" />

      {/* Heart Sprinkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={`sprinkle-${i}`} className="absolute text-[#FF9BC4] animate-float-up"
               style={{ left: `${Math.random() * 100}%`, fontSize: `${8 + Math.random() * 12}px`, opacity: 0.2 + Math.random() * 0.3, animationDuration: `${4 + Math.random() * 6}s`, animationDelay: `${Math.random() * 2}s` }}>
            {["♡", "♥", "💗", "💕"][i % 4]}
          </div>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={`sparkle-${i}`} className="absolute text-white animate-pulse"
               style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${6 + Math.random() * 8}px`, opacity: 0.3 + Math.random() * 0.4, animationDuration: `${1 + Math.random() * 2}s`, animationDelay: `${Math.random() * 1}s` }}>
            ✦
          </div>
        ))}
      </div>

      {/* Countdown Numbers */}
      {['3', '2', '1'].map((num) => (
        phase === num && (
          <div
            key={num}
            className="absolute animate-countdown font-serif text-[12rem] sm:text-[18rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0F5] to-[#FF9BC4]"
            style={{ 
              filter: num === '1' ? "drop-shadow(0 0 40px rgba(255,155,196,0.8))" : "drop-shadow(0 0 25px rgba(255,155,196,0.5))",
            }}
          >
            {num}
            {/* Orbiting hearts */}
            <div className="absolute inset-0 animate-[spin_4s_linear_infinite] pointer-events-none">
              <span className="absolute -top-4 left-1/2 text-2xl text-[#FF9BC4] opacity-70">♡</span>
              <span className="absolute -bottom-4 left-1/2 text-xl text-[#FF4F98] opacity-70">💗</span>
            </div>
          </div>
        )
      ))}

      {/* Cinematic Heart Burst */}
      {phase === 'burst' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#FF9BC4]/10 animate-fade-out" />
          {bursts.map(b => b.type === 'sparkle' ? (
             <div key={b.id} className="absolute text-white" style={{ fontSize: 10 + b.scale * 15, "--bx": `${b.bx}px`, "--by": `${b.by}px`, animation: `burst 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards` } as CSSProperties}>✦</div>
          ) : (
            <div key={b.id} className={`absolute ${b.type === 'outline' ? 'text-[#FFD1E2]' : 'text-[#FF4F98]'}`} style={{ fontSize: 15 + b.scale * 20, filter: 'drop-shadow(0 0 10px rgba(255,79,152,0.5))', "--bx": `${b.bx}px`, "--by": `${b.by}px`, animation: `burst 0.8s ease-out forwards` } as CSSProperties}>
              {b.type === 'outline' ? '♡' : '💗'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- STEP 1: Love.exe loading -> Searching for the prettiest smile ---------------- */
export function LoadingStep({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'searching' | 'found'>('searching');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('found'), 2000);
    const t2 = setTimeout(() => onDone(), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#6A1A3B] via-[#3B0E23] to-[#1C0612] animate-step-in transition-opacity duration-700" style={{ opacity: phase === 'found' ? 0.9 : 1 }}>
      {/* Background Glow */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${phase === 'found' ? 'bg-[radial-gradient(circle_at_center,rgba(255,100,150,0.3)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(255,100,150,0.1)_0%,transparent_50%)]'}`} />

      {/* Floating Transition Hearts */}
      {phase === 'found' && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute text-[#FF9BC4] animate-float-up" style={{ left: `${20 + Math.random() * 60}%`, fontSize: `${20 + Math.random() * 20}px`, bottom: '-10%', animationDuration: `${2 + Math.random() * 2}s`, filter: 'blur(1px)' }}>
              💗
            </div>
          ))}
        </div>
      )}

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center animate-soft-float">
        {phase === 'searching' ? (
          <>
            <p className="text-xl sm:text-2xl font-serif text-[#FFD1E2] animate-step-in text-center px-4" style={{ filter: "drop-shadow(0 0 10px rgba(255,209,226,0.5))" }}>
              Searching for the prettiest smile... <span className="inline-block animate-pulse">💗</span>
            </p>
            <div className="mt-8 flex gap-3 text-2xl text-[#FF9BC4]">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>♡</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>♡</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>♡</span>
            </div>
            <div className="mt-6 text-[#FF4F98] text-3xl animate-[spin_3s_linear_infinite] drop-shadow-[0_0_15px_rgba(255,79,152,0.6)]">
              ↻
            </div>
          </>
        ) : (
          <div className="animate-step-in flex flex-col items-center">
            <p className="text-3xl sm:text-4xl font-serif text-[#FFF0F5] font-bold" style={{ filter: "drop-shadow(0 0 20px rgba(255,240,245,0.8))" }}>
              Found her.
            </p>
            <HeartIcon className="mt-6 w-20 h-20 text-[#FF4F98] animate-heartbeat-soft drop-shadow-[0_0_30px_rgba(255,79,152,0.9)]" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STEP 2: Envelope ---------------- */
export function EnvelopeStep({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setBurst(true);
    setTimeout(onOpen, 1500); // give time for animation
  };

  const hearts = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    angle: (i / 15) * Math.PI * 2,
    dist: 80 + Math.random() * 80,
    size: 16 + Math.random() * 14,
    delay: Math.random() * 0.3
  })), []);

  return (
    <Screen>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40 flex items-center justify-center">
        {burst && hearts.map((h, i) => (
           <HeartIcon
             key={i}
             className="absolute text-primary-glow"
             style={{
               width: h.size, height: h.size,
               "--bx": `${Math.cos(h.angle) * h.dist}px`,
               "--by": `${Math.sin(h.angle) * h.dist}px`,
               animation: `burst 1.2s ease-out ${h.delay}s forwards`,
             } as CSSProperties}
           />
        ))}
      </div>
      
      <h1 className="text-glow font-display text-4xl font-semibold sm:text-5xl">
        A letter arrived 💌
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Tap the heart seal to open it.
      </p>

      <button
        type="button"
        onClick={open}
        aria-label="Open the letter"
        className={`group mt-12 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring z-20 ${
          opened ? "" : "animate-soft-float"
        }`}
      >
        <div
          className={`relative h-[9.5rem] w-64 transition-all duration-1000 sm:h-44 sm:w-80 ${
            opened ? "scale-110 opacity-0" : "group-hover:scale-105 group-active:scale-95"
          }`}
          style={{ filter: "drop-shadow(0 0 60px rgba(255, 79, 154, 0.5))" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-[#FFF0F5] shadow-inner" />
          <div
            className={`absolute inset-x-0 top-0 origin-top transition-transform duration-1000 z-20 ${
              opened ? "[transform:rotateX(180deg)]" : ""
            }`}
            style={{
              height: "58%",
              background: "#FFD6E8",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderRadius: "1rem 1rem 0 0",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 rounded-b-2xl z-10"
            style={{
              height: "62%",
              background: "#FFF0F5",
              clipPath: "polygon(0 100%, 0 0, 50% 42%, 100% 0, 100% 100%)",
            }}
          />
          {/* Heart Seal */}
          <span 
            className={`absolute top-1/2 left-1/2 z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_30px_var(--primary-glow)] transition-all duration-700 ${opened ? "scale-150 opacity-0" : "animate-heart-pulse"}`}
          >
            <HeartIcon className="h-6 w-6 text-[#120711]" />
          </span>
        </div>
      </button>
    </Screen>
  );
}

/* ---------------- STEP 3: Letter ---------------- */
export function LetterStep({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const current = letters[i]!;

  return (
    <Screen>
      <span className="mb-5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs tracking-[0.3em] text-primary-glow">
        {String(i + 1).padStart(2, "0")} / {String(letters.length).padStart(2, "0")}
      </span>
      <div key={i} className="glass-card animate-step-in w-full px-6 py-10 sm:px-9 border-primary/20 bg-black/20">
        <p className="font-display text-2xl leading-relaxed whitespace-pre-line sm:text-3xl text-center text-primary-glow drop-shadow-sm">
          {current.body}
        </p>
      </div>
      <LoveButton
        className="mt-10 w-full sm:w-auto"
        onClick={() => (i < letters.length - 1 ? setI(i + 1) : onDone())}
      >
        {current.cta}
      </LoveButton>
    </Screen>
  );
}



/* ---------------- STEP 6: Remember When (Storytime) ---------------- */
export function RememberStep({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const newBursts = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: cx + (Math.random() - 0.5) * 40,
      y: cy + (Math.random() - 0.5) * 40,
    }));
    setBursts(newBursts);

    setTimeout(() => {
      if (i < rememberWhen.length - 1) {
        setI(i + 1);
        setBursts([]);
      } else {
        onDone();
      }
    }, 400);
  };

  return (
    <Screen>
      {/* 1. Light Pink Dreamy Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8FB] via-[#FFEAF3] to-[#FFD5E5] pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,183,208,0.4)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* 10. Bottom Cloud Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/60 to-transparent pointer-events-none -z-10 blur-xl" />
      
      {/* 2 & 11. Floating Hearts & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {Array.from({ length: 25 }).map((_, idx) => {
          const size = 12 + Math.random() * 20;
          const symbols = ["♡", "♥", "💗", "💖", "💕"];
          const symbol = symbols[idx % symbols.length];
          return (
            <div
              key={idx}
              className="absolute animate-float-up text-[#FF8FB5]"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${size}px`,
                opacity: 0.3 + Math.random() * 0.5,
                filter: Math.random() > 0.5 ? 'blur(2px)' : 'none',
                animationDuration: `${6 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            >
              {symbol}
            </div>
          );
        })}
        {/* Sparkles */}
        {Array.from({ length: 15 }).map((_, idx) => (
          <div
            key={`sparkle-${idx}`}
            className="absolute text-white/80 animate-pulse text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {["✦", "✧", "⋆", "•"][idx % 4]}
          </div>
        ))}
        {/* 9. Heart Trails */}
        <div className="absolute top-1/4 left-10 text-[#FF8FB5] opacity-20 text-sm transform -rotate-12 whitespace-nowrap hidden sm:block">
          💗 · · · · · 💕
        </div>
        <div className="absolute bottom-1/3 right-10 text-[#FF8FB5] opacity-20 text-sm transform rotate-12 whitespace-nowrap hidden sm:block">
          💕 · · · · · 💗
        </div>
      </div>

      {/* Burst overlay */}
      {bursts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {bursts.map(b => (
            <HeartIcon
              key={b.id}
              className="absolute text-[#FF8FB5]"
              style={{
                width: 15 + Math.random() * 15, 
                height: 15 + Math.random() * 15,
                left: b.x, top: b.y,
                "--bx": `${(Math.random()-0.5)*200}px`,
                "--by": `${-100 - Math.random()*200}px`,
                animation: `burst 1s ease-out forwards`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex w-full flex-col items-center max-w-2xl px-4 animate-step-in">
        {/* 3. Top Heart Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6 text-[#FFB7D0] font-light">
          ♡ <span className="text-xl">───</span> <span className="text-3xl text-[#FF8FB5] animate-pulse drop-shadow-[0_0_10px_rgba(255,143,181,0.6)]">💗</span> <span className="text-xl">───</span> ♡
        </div>

        {/* 4. Storytime Heading */}
        <h2 className="font-serif text-[2.5rem] sm:text-5xl font-bold text-[#FF4F98] mb-10 text-center drop-shadow-[0_2px_10px_rgba(255,79,152,0.2)] flex items-center justify-center gap-4">
          <span className="text-2xl text-[#FFB7D0] font-light">♡</span>
          Storytime... <span className="animate-pulse inline-block">💗 ✨</span>
          <span className="text-2xl text-[#FFB7D0] font-light">♡</span>
        </h2>

        {/* 5. Story Card */}
        <div 
          key={i} 
          className="relative w-[95%] sm:w-full flex flex-col items-center rounded-[2.5rem] bg-white/70 backdrop-blur-2xl border border-white/80 p-8 sm:p-12 shadow-[0_15px_40px_-10px_rgba(255,143,181,0.2)] animate-step-in animate-soft-float"
          style={{ boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.9), 0 15px 40px -10px rgba(255, 143, 181, 0.2)" }}
        >
          {/* Card Top Ornament */}
          <div className="absolute -top-6 flex flex-col items-center text-[#FFB7D0]">
            <span className="text-2xl animate-pulse text-[#FF8FB5] drop-shadow-[0_0_8px_rgba(255,143,181,0.6)]">💗</span>
            <span className="text-sm tracking-[0.2em] -mt-1 font-light">───♡───</span>
          </div>

          {/* 7. Decorative Heart Details Inside Card */}
          <div className="absolute top-6 left-6 text-[#FFB7D0] opacity-40 text-lg">♡</div>
          <div className="absolute top-6 right-6 text-[#FFB7D0] opacity-40 text-lg">♡</div>
          <div className="absolute bottom-6 left-6 text-[#FFB7D0] opacity-40 text-lg">♡</div>
          <div className="absolute bottom-6 right-6 text-[#FFB7D0] opacity-40 text-lg">♡</div>
          <div className="absolute top-1/2 left-4 text-[#FF8FB5] opacity-20 text-xs">✦</div>
          <div className="absolute top-1/2 right-4 text-[#FF8FB5] opacity-20 text-xs">✦</div>

          {/* 6. Story Text */}
          <div className="flex items-center justify-center gap-4 w-full">
            <span className="text-[#FF8FB5] opacity-70 text-xl font-light hidden sm:block">♡</span>
            <p className="font-serif text-[1.4rem] leading-[1.8] sm:text-3xl text-center text-[#C0396B] font-medium max-w-lg px-2 drop-shadow-sm">
              {rememberWhen[i]}
            </p>
            <span className="text-[#FF8FB5] opacity-70 text-xl font-light hidden sm:block">♡</span>
          </div>
          
          <div className="flex justify-center gap-8 mt-6 sm:hidden text-[#FF8FB5] opacity-70 text-xl font-light">
             <span>♡</span><span>♡</span>
          </div>
        </div>

        {/* 8. Next Button */}
        <button
          className="group relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF8FB5] to-[#FF4F98] px-10 py-4 mt-12 text-xl font-bold text-white shadow-[0_8px_25px_rgba(255,143,181,0.5)] transition-all hover:scale-105 active:scale-95 overflow-hidden z-20"
          onClick={handleNext}
        >
          <div className="absolute inset-0 bg-white/25 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          <span className="relative z-10 drop-shadow-sm flex items-center gap-2">Next <span className="text-base group-hover:animate-pulse">💗</span></span>
          <span className="absolute -top-1 -left-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">💕</span>
          <span className="absolute -bottom-1 -right-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs">♡</span>
        </button>
      </div>
    </Screen>
  );
}

/* ---------------- STEP 7: Questions ---------------- */
export function QuestionsStep({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [reply, setReply] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const answer = () => {
    setReply(questions[i]!.reply);
    setTimeout(() => {
      setReply(null);
      if (i < questions.length - 1) setI(i + 1);
      else setFinished(true);
    }, 1800);
  };

  if (finished) {
    return (
      <Screen>
        <h2 className="text-glow font-display text-4xl font-semibold sm:text-5xl">
          Okay... one last question.
        </h2>
        <LoveButton className="mt-10 w-full sm:w-auto" onClick={onDone}>
          Ask me 💗
        </LoveButton>
      </Screen>
    );
  }

  return (
    <Screen>
      <h2 className="text-glow font-display text-3xl font-semibold sm:text-4xl text-primary-glow">
        Okay... ek choti si baat poochu? 🥺
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        Imagine it's just you and me...
      </p>

      <div key={i} className="glass-card animate-step-in mt-10 w-full px-6 py-10">
        {reply ? (
          <p className="animate-step-in font-display text-3xl leading-relaxed text-center">{reply}</p>
        ) : (
          <>
            <p className="font-display text-4xl font-semibold text-center mb-8">{questions[i]!.title}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              {questions[i]!.options.map((opt) => (
                <LoveButton key={opt} onClick={answer} className="w-full sm:w-auto text-lg py-6">
                  {opt}
                </LoveButton>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-8 flex gap-2">
        {questions.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-primary-glow drop-shadow-[0_0_8px_var(--primary-glow)]" : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
    </Screen>
  );
}

/* ---------------- STEP 9: Proposal ---------------- */
export function ProposalStep({ onYes }: { onYes: () => void }) {
  const [tries, setTries] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; isSparkle?: boolean }[]>([]);
  const isYesNow = tries >= noButtonTexts.length - 1;

  const dodge = () => {
    if (isYesNow) return;
    const next = tries + 1;
    setTries(next);
    const sign = next % 2 === 0 ? 1 : -1;
    // Keep evasion bounded for mobile
    setOffset({ x: sign * (10 + next * 4), y: (next % 3) * 12 - 10 });
  };

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Generate beautiful heart explosion with sparkles
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    const newBursts = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: cx + (Math.random() - 0.5) * 60,
      y: cy + (Math.random() - 0.5) * 60,
      isSparkle: Math.random() > 0.65
    }));
    
    setBursts(newBursts);
    
    // Wait for burst animation then trigger onYes
    setTimeout(() => {
      onYes();
    }, 1200);
  };

  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center flex-col px-4 py-12 text-center overflow-hidden animate-step-in relative">
      <CursorTrail />
      {/* 1. Dark Rose Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B071F] via-[#7A1245] to-[#D83F82] pointer-events-none -z-20 animate-step-in" />
      
      {/* 12. Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,63,130,0.4)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Floating Hearts, Petals & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Layer 1: Very Faint Hearts */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`tiny-${i}`} className="absolute text-white animate-float-up"
               style={{ left: `${Math.random() * 100}%`, fontSize: `${8 + Math.random() * 6}px`, opacity: 0.1 + Math.random() * 0.15, animationDuration: `${6 + Math.random() * 8}s`, animationDelay: `${Math.random() * 5}s` }}>♡</div>
        ))}
        {/* Layer 2: Medium Translucent Hearts & Petals */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`med-${i}`} className="absolute text-[#FF9BC4] animate-float-up"
               style={{ left: `${Math.random() * 100}%`, fontSize: `${14 + Math.random() * 14}px`, opacity: 0.15 + Math.random() * 0.2, animationDuration: `${8 + Math.random() * 12}s`, animationDelay: `${Math.random() * 5}s` }}>
            {i % 4 === 0 ? "🌸" : "💗"}
          </div>
        ))}
        {/* Layer 3: Foreground Glowing Hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`lrg-${i}`} className="absolute text-[#FF4F98] animate-float-up"
               style={{ left: `${Math.random() * 100}%`, fontSize: `${25 + Math.random() * 15}px`, opacity: 0.25 + Math.random() * 0.2, filter: 'drop-shadow(0 0 8px rgba(255,79,152,0.6))', animationDuration: `${12 + Math.random() * 15}s`, animationDelay: `${Math.random() * 5}s` }}>💕</div>
        ))}
        {/* Sparkles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={`sparkle-${i}`} className="absolute text-[#FFD1E2] animate-pulse"
               style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${8 + Math.random() * 8}px`, opacity: 0.3 + Math.random() * 0.4, animationDuration: `${3 + Math.random() * 4}s`, animationDelay: `${Math.random() * 3}s` }}>
            {["✦", "✧", "⋆", "•"][i % 4]}
          </div>
        ))}
      </div>

      {/* YES Heart Burst */}
      {bursts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-[#FF4F98]/20 animate-fade-out" />
          {bursts.map(b => b.isSparkle ? (
            <div
              key={b.id}
              className="absolute text-white animate-pulse"
              style={{
                fontSize: 10 + Math.random() * 20,
                left: b.x, top: b.y,
                "--bx": `${(Math.random()-0.5)*600}px`,
                "--by": `${-200 - Math.random()*500}px`,
                animation: `burst 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                transform: `rotate(${(Math.random() - 0.5) * 180}deg)`,
              } as CSSProperties}
            >✦</div>
          ) : (
            <HeartIcon
              key={b.id}
              className="absolute text-[#FF9BC4]"
              style={{
                width: 15 + Math.random() * 25, 
                height: 15 + Math.random() * 25,
                left: b.x, top: b.y,
                color: Math.random() > 0.6 ? '#FF4F98' : (Math.random() > 0.5 ? '#FF9BC4' : '#FFD1E2'),
                "--bx": `${(Math.random()-0.5)*500}px`,
                "--by": `${-150 - Math.random()*400}px`,
                animation: `burst 1.5s ease-out forwards`,
                transform: `rotate(${(Math.random() - 0.5) * 60}deg)`,
              } as CSSProperties}
            />
          ))}
        </div>
      )}

      {/* 3. Glowing Rose Glass Proposal Card */}
      <div 
        className="relative z-10 flex w-[94%] sm:w-full max-w-[700px] flex-col items-center rounded-[36px] p-8 sm:px-14 sm:py-16 animate-step-in animate-soft-float animate-card-glow"
        style={{ 
          background: "rgba(92, 15, 55, 0.60)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 160, 200, 0.35)",
        }}
      >
        {/* Bow/Heart Corner Decorations */}
        <div className="absolute top-4 left-4 text-[#FF9BC4] opacity-40 text-lg">❦</div>
        <div className="absolute top-4 right-4 text-[#FF9BC4] opacity-40 text-lg scale-x-[-1]">❦</div>
        <div className="absolute bottom-4 left-4 text-[#FF9BC4] opacity-40 text-lg scale-y-[-1]">❦</div>
        <div className="absolute bottom-4 right-4 text-[#FF9BC4] opacity-40 text-lg scale-y-[-1] scale-x-[-1]">❦</div>

        {/* Top Heart / Wax Seal Ornament */}
        <div className="absolute -top-14 flex flex-col items-center justify-center animate-step-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative flex items-center text-2xl text-[#FFD1E2] font-light opacity-80">
            ♡ 
            <div className="relative mx-4 flex items-center justify-center">
              {/* Wax seal background circle */}
              <div className="absolute w-14 h-14 bg-gradient-to-br from-[#FF4F98] to-[#920F37] rounded-full opacity-30 blur-[2px]" />
              <span className="text-[3rem] text-[#FF4F98] animate-heartbeat-soft drop-shadow-[0_0_20px_rgba(255,79,152,0.8)] relative z-10">💗</span> 
            </div>
            ♡
          </div>
        </div>

        {/* Card Internal Decoration */}
        <div className="absolute top-8 left-10 text-[#FF9BC4] opacity-30 text-xl animate-soft-float">♡</div>
        <div className="absolute bottom-16 left-12 text-[#FF9BC4] opacity-20 text-2xl animate-soft-float" style={{ animationDelay: '1s' }}>💕</div>
        <div className="absolute top-12 right-12 text-[#FF9BC4] opacity-30 text-xl animate-soft-float" style={{ animationDelay: '0.5s' }}>♡</div>
        <div className="absolute bottom-20 right-10 text-[#FF9BC4] opacity-20 text-xl animate-soft-float" style={{ animationDelay: '1.5s' }}>✦</div>

        {/* 5. Header */}
        <p className="font-display text-xl sm:text-2xl text-[#FFD1E2] mt-2 flex items-center gap-3 animate-step-in drop-shadow-[0_0_10px_rgba(255,209,226,0.3)]" style={{ animationDelay: '0.4s' }}>
          <span className="font-light opacity-60">♡ ───</span> Okay Jaan... ❤️ <span className="font-light opacity-60">─── ♡</span>
        </p>

        {/* 6. Main Question */}
        <h2 
          className="relative mt-8 mb-6 font-display text-[2.2rem] sm:text-[3.5rem] leading-[1.2] font-bold text-[#FFD1E2] text-center animate-step-in" 
          style={{ animationDelay: '0.6s', textShadow: "0 0 15px rgba(255,209,226,0.4)" }}
        >
          {/* Decorative Hearts Around Heading */}
          <span className="absolute -top-6 left-0 text-[#FF9BC4] opacity-30 text-lg animate-soft-float">♡</span>
          <span className="absolute -top-2 right-4 text-[#FF4F98] opacity-30 text-2xl animate-soft-float" style={{ animationDelay: '1.2s' }}>💗</span>
          <span className="absolute top-1/2 -left-6 text-[#FF9BC4] opacity-40 text-xl animate-soft-float" style={{ animationDelay: '0.8s' }}>💕</span>
          <span className="absolute bottom-0 -right-8 text-[#FFD1E2] opacity-30 text-lg animate-soft-float" style={{ animationDelay: '1.5s' }}>♡</span>

          Kya Tum Meri<br/>Girlfriend<br/>Banogi? <span className="inline-block animate-heartbeat-soft text-[#FF4F98] ml-1 drop-shadow-[0_0_20px_rgba(255,79,152,0.7)]">❤️</span>
        </h2>

        {/* 8. Message Box */}
        <div 
          className="mt-6 flex items-center gap-3 rounded-full px-6 py-3 shadow-[0_4px_15px_rgba(255,70,150,0.15)] animate-step-in"
          style={{ 
            animationDelay: '0.8s',
            background: "rgba(255, 130, 175, 0.12)",
            border: "1px solid rgba(255, 170, 205, 0.30)",
          }}
        >
          <span className="text-[#FF9BC4] text-sm opacity-80">♡</span>
          <p className="text-sm sm:text-base font-medium text-[#FFE1EC] text-center tracking-wide">
            Think carefully... this question is very important. 🥺
          </p>
          <span className="text-[#FF9BC4] text-sm opacity-80">♡</span>
        </div>

        {/* Buttons */}
        <div 
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center w-full relative z-20 animate-step-in"
          style={{ animationDelay: '1s' }}
        >
          {/* YES Button */}
          <button 
            className="group relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4F98] via-[#FF72AE] to-[#FF9BC4] px-14 py-4 sm:py-5 text-xl sm:text-2xl font-bold text-white shadow-[0_10px_35px_rgba(255,79,152,0.6)] transition-all hover:scale-[1.04] hover:shadow-[0_15px_45px_rgba(255,79,152,0.8)] active:scale-95 overflow-hidden w-full sm:w-auto z-10"
            onClick={handleYes}
            style={{ animation: 'heartbeat-soft 2.5s ease-in-out infinite' }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            <div className="absolute inset-0 w-1/2 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-sweep opacity-70 rounded-full" />
            
            <span className="relative z-10 drop-shadow-md">YES ❤️</span>
            
            {/* Tiny hover hearts that gather around the button */}
            <span className="absolute -top-4 -left-2 text-[#FF9BC4] opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 text-base drop-shadow-sm">💕</span>
            <span className="absolute -bottom-3 -right-2 text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-500 text-sm drop-shadow-sm">💖</span>
            <span className="absolute top-2 -right-6 text-[#FFD1E2] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-lg drop-shadow-sm">♡</span>
            <span className="absolute -bottom-4 left-4 text-[#FF9BC4] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-500 text-sm drop-shadow-sm">💗</span>
            <span className="absolute top-0 -left-5 text-white opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-500 text-xs drop-shadow-sm">♡</span>
          </button>
          
          {/* Negative Button */}
          <button
            className="relative flex items-center justify-center rounded-full bg-[rgba(92,15,55,0.4)] backdrop-blur-sm border border-[#FF4F98] px-10 py-4 sm:py-5 text-lg font-bold text-[#FFD1E2] shadow-[0_4px_15px_rgba(255,79,152,0.2)] transition-all hover:bg-[rgba(255,79,152,0.2)] hover:border-[#FF9BC4] hover:text-white w-full sm:w-auto z-10"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              ...(isYesNow ? {} : { transitionDuration: '250ms' })
            }}
            onMouseEnter={() => {
              if (!isYesNow && window.matchMedia("(hover: hover)").matches) dodge();
            }}
            onClick={(e) => {
              if (isYesNow) {
                handleYes(e);
              } else {
                dodge();
              }
            }}
          >
            {isYesNow ? "YES ❤️" : noButtonTexts[Math.min(tries, noButtonTexts.length - 1)]}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- STEP 10: Celebration ---------------- */
export function SuccessStep({ onContinue }: { onContinue: () => void }) {
  const burst = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const dist = 140 + (i % 6) * 50;
        return {
          bx: `${Math.cos(angle) * dist}px`,
          by: `${Math.sin(angle) * dist}px`,
          delay: (i % 8) * 0.1,
          size: 16 + (i % 4) * 8,
        };
      }),
    [],
  );

  return (
    <Screen>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-10">
        {burst.map((b, i) => (
          <HeartIcon
            key={i}
            className="absolute text-primary-glow"
            style={
              {
                width: b.size,
                height: b.size,
                "--bx": b.bx,
                "--by": b.by,
                animation: `burst 2s ease-out ${b.delay}s 2 forwards`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      
      {/* Confetti falling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
         {Array.from({length: 50}).map((_, i) => (
            <div 
              key={i} 
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                width: `${5 + Math.random() * 10}px`,
                height: `${10 + Math.random() * 15}px`,
                backgroundColor: ['#E83E7C', '#FF4F9A', '#FF9BCB', '#FFF0F5'][i % 4],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
         ))}
      </div>

      <div className="relative z-30 flex flex-col items-center">
        <h2 className="text-glow font-display text-6xl font-bold sm:text-7xl animate-step-in scale-110">
          SHE SAID YES! 💕
        </h2>
        <HeartIcon className="animate-heart-pulse mt-12 h-32 w-32 text-primary drop-shadow-[0_0_60px_var(--primary)]" />
        
        <div className="glass-card mt-12 p-8 text-center animate-step-in">
          <p className="font-display text-3xl leading-relaxed sm:text-4xl text-primary-glow font-semibold">
            And just like that...
          </p>
          <p className="mt-3 font-display text-3xl leading-relaxed sm:text-4xl text-primary-glow font-semibold">
            our little story officially begins. ❤️
          </p>
        </div>
        
        <LoveButton className="mt-12 w-full sm:w-auto shadow-2xl" onClick={onContinue}>
          Welcome to Our Story 💗
        </LoveButton>
      </div>
    </Screen>
  );
}

/* ---------------- STEP 11: Our story ---------------- */
const togetherSince = new Date("2026-08-08T00:00:00");

function useElapsed(from: Date) {
  const [now, setNow] = useState(() => Date.now());
  const ref = useRef(from.getTime());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, now - ref.current);
  const s = Math.floor(diff / 1000);
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Minutes: Math.floor((s % 3600) / 60),
    Seconds: s % 60,
  };
}

export function StoryStep({ onContinue }: { onContinue: () => void }) {
  const elapsed = useElapsed(togetherSince);

  return (
    <Screen>
      <h2 className="text-glow font-display text-5xl font-semibold sm:text-6xl text-primary-glow">
        Welcome to Our Story ❤️
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Every second with you is my favorite second.
      </p>

      <p className="mt-12 text-sm tracking-[0.35em] text-primary-glow uppercase font-bold drop-shadow-sm">
        Together Since
      </p>
      <div className="mt-6 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {Object.entries(elapsed).map(([label, value]) => (
          <div key={label} className="glass-card px-4 py-6 border-primary/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-primary/5">
            <div className="font-display text-5xl font-bold tabular-nums text-glow text-white">
              {String(value).padStart(2, "0")}
            </div>
            <div className="mt-2 text-xs tracking-[0.2em] text-primary-glow font-semibold uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>

      <LoveButton className="mt-14 w-full sm:w-auto" onClick={onContinue}>
        What's next? ✨
      </LoveButton>
    </Screen>
  );
}

/* ---------------- STEP 12: Final ---------------- */
export function FinalStep({ onReplay }: { onReplay: () => void }) {
  return (
    <Screen>
      <div className="absolute inset-0 bg-[#0a0510] pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none -z-10" />
      
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {Array.from({length: 40}).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white animate-star"
            style={{
              left: `${Math.random()*100}%`, 
              top: `${Math.random()*100}%`,
              width: Math.random()*3 + 1,
              height: Math.random()*3 + 1,
              animationDelay: `${Math.random()*4}s`
            }}
          />
        ))}
      </div>

      <div className="glass-card p-10 max-w-lg w-full border-primary/20 bg-black/40 backdrop-blur-xl">
        <h2 className="text-glow font-display text-4xl leading-tight font-bold sm:text-5xl mb-6 text-primary-glow">
          And this is only the beginning... ❤️
        </h2>
        <p className="text-2xl text-foreground font-display italic mb-12">
          "Here's to all the memories we haven't made yet."
        </p>
        <LoveButton variant="ghost" className="w-full sm:w-auto border border-primary/30 hover:bg-primary/20" onClick={onReplay}>
          Replay Our Story ↻
        </LoveButton>
      </div>
    </Screen>
  );
}