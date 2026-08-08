import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { HeartIcon, LoveButton, Screen } from "./ui";
import { letters, loadingStatuses, noButtonTexts, questions } from "./content";

/* ---------------- STEP 1: Love.exe loading ---------------- */

export function LoadingStep({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const total = 3400;
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / total) * 100));
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(tick);
      else setTimeout(onDone, 1100);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const status =
    loadingStatuses[
      Math.min(loadingStatuses.length - 1, Math.floor(progress / 20))
    ];

  return (
    <Screen>
      <p className="text-sm tracking-[0.35em] text-muted-foreground uppercase">
        Initializing Love.exe...
      </p>
      <div
        className="text-glow mt-6 font-display text-7xl leading-none font-semibold sm:text-8xl"
        aria-live="polite"
      >
        {progress}%
      </div>
      <div className="mt-8 h-2.5 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-[0_0_20px_var(--primary-glow)] transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-6 min-h-6 text-base text-muted-foreground">{status}</p>
    </Screen>
  );
}

/* ---------------- STEP 2: Envelope ---------------- */

export function EnvelopeStep({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 900);
  };

  return (
    <Screen>
      <h1 className="text-glow font-display text-4xl font-semibold sm:text-5xl">
        A letter arrived 💌
      </h1>
      <p className="mt-3 text-base text-muted-foreground">
        Tap the envelope to open it.
      </p>

      <button
        type="button"
        onClick={open}
        aria-label="Open the letter"
        className={`group mt-12 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          opened ? "" : "animate-soft-float"
        }`}
      >
        <div
          className={`relative h-[9.5rem] w-64 transition-all duration-700 sm:h-44 sm:w-80 ${
            opened ? "scale-110 opacity-0" : "group-hover:scale-105 group-active:scale-95"
          }`}
          style={{ filter: "drop-shadow(0 0 40px oklch(0.7 0.18 350 / 55%))" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-cream" />
          <div
            className={`absolute inset-x-0 top-0 origin-top transition-transform duration-700 ${
              opened ? "[transform:rotateX(180deg)]" : ""
            }`}
            style={{
              height: "58%",
              background: "oklch(0.92 0.03 80)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderRadius: "1rem 1rem 0 0",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 rounded-b-2xl"
            style={{
              height: "62%",
              background: "oklch(0.97 0.02 80)",
              clipPath: "polygon(0 100%, 0 0, 50% 42%, 100% 0, 100% 100%)",
            }}
          />
          <span className="absolute top-1/2 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_28px_var(--primary-glow)]">
            <HeartIcon className="h-5 w-5" />
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
      <span className="mb-5 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs tracking-[0.3em] text-muted-foreground">
        {String(i + 1).padStart(2, "0")} / {String(letters.length).padStart(2, "0")}
      </span>
      <div key={i} className="glass-card animate-step-in w-full px-6 py-10 sm:px-9">
        <p className="font-display text-2xl leading-relaxed whitespace-pre-line sm:text-3xl">
          {current.body}
        </p>
      </div>
      <LoveButton
        className="mt-8 w-full sm:w-auto"
        onClick={() => (i < letters.length - 1 ? setI(i + 1) : onDone())}
      >
        {current.cta}
      </LoveButton>
    </Screen>
  );
}

/* ---------------- STEP 4: Questions ---------------- */

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
    }, 1700);
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
      <h2 className="text-glow font-display text-3xl font-semibold sm:text-4xl">
        Okay... ek choti si baat poochu? 🥺
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        Imagine it's just you and me...
      </p>

      <div key={i} className="glass-card animate-step-in mt-10 w-full px-6 py-9">
        {reply ? (
          <p className="animate-step-in font-display text-2xl leading-relaxed">{reply}</p>
        ) : (
          <>
            <p className="font-display text-3xl font-semibold">{questions[i]!.title}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {questions[i]!.options.map((opt) => (
                <LoveButton key={opt} onClick={answer} className="w-full sm:w-auto">
                  {opt}
                </LoveButton>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        {questions.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-7 bg-primary-glow" : "w-3 bg-white/20"
            }`}
          />
        ))}
      </div>
    </Screen>
  );
}

/* ---------------- STEP 5: Proposal ---------------- */

export function ProposalStep({ onYes }: { onYes: () => void }) {
  const [tries, setTries] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isYesNow = tries >= noButtonTexts.length - 1;

  const dodge = () => {
    if (isYesNow) {
      onYes();
      return;
    }
    const next = tries + 1;
    setTries(next);
    const sign = next % 2 === 0 ? 1 : -1;
    setOffset({ x: sign * (14 + next * 6), y: (next % 3) * 10 - 8 });
  };

  return (
    <Screen>
      <div className="relative flex w-full flex-col items-center">
        <HeartIcon className="animate-heart-pulse pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 text-primary/25 blur-[2px] sm:h-96 sm:w-96" />
        <div className="relative">
          <p className="font-display text-2xl text-primary-glow">Okay Jaan... ❤️</p>
          <h2 className="text-glow mt-4 font-display text-4xl leading-tight font-semibold sm:text-5xl">
            Kya Tum Meri Girlfriend Banogi? ❤️
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Think carefully... this question is very important. 🥺
          </p>

          <div className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <LoveButton className="w-full sm:w-auto" onClick={onYes}>
              YES ❤️
            </LoveButton>
            <LoveButton
              variant={isYesNow ? "primary" : "ghost"}
              className="w-full sm:w-auto"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
              onMouseEnter={() => {
                if (!isYesNow) dodge();
              }}
              onClick={dodge}
            >
              {noButtonTexts[Math.min(tries, noButtonTexts.length - 1)]}
            </LoveButton>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ---------------- STEP 6: Celebration ---------------- */

export function SuccessStep({ onContinue }: { onContinue: () => void }) {
  const burst = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = (i / 26) * Math.PI * 2;
        const dist = 120 + (i % 5) * 40;
        return {
          bx: `${Math.cos(angle) * dist}px`,
          by: `${Math.sin(angle) * dist}px`,
          delay: (i % 6) * 0.12,
          size: 12 + (i % 4) * 6,
        };
      }),
    [],
  );

  return (
    <Screen>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
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
                animation: `burst 1.6s ease-out ${b.delay}s 2 forwards`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <h2 className="text-glow font-display text-5xl font-semibold sm:text-6xl">
        Yayyyyyyyyyy 💕
      </h2>
      <HeartIcon className="animate-heart-pulse mt-8 h-24 w-24 text-primary" />
      <p className="mt-8 font-display text-2xl leading-relaxed sm:text-3xl">
        Officially... Ab tum meri favorite notification ho. ❤️
      </p>
      <p className="mt-5 text-lg whitespace-pre-line text-muted-foreground">
        {"I promise...\nHar smile ki wajah banne ki puri koshish karunga. 🥹❤️"}
      </p>
      <LoveButton className="mt-10 w-full sm:w-auto" onClick={onContinue}>
        Welcome to Our Story 💗
      </LoveButton>
    </Screen>
  );
}

/* ---------------- STEP 7: Our story ---------------- */

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

export function StoryStep({ onReplay }: { onReplay: () => void }) {
  const elapsed = useElapsed(togetherSince);

  return (
    <Screen>
      <h2 className="text-glow font-display text-4xl font-semibold sm:text-5xl">
        Welcome to Our Story ❤️
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        And this is just the beginning...
      </p>

      <p className="mt-10 text-sm tracking-[0.35em] text-primary-glow uppercase">
        Together Since
      </p>
      <div className="mt-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(elapsed).map(([label, value]) => (
          <div key={label} className="glass-card px-3 py-5">
            <div className="font-display text-4xl font-semibold tabular-nums">
              {String(value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-9 font-display text-2xl leading-relaxed">
        Every second with you is my favorite second. ❤️
      </p>
      <p className="mt-3 text-lg text-muted-foreground">Here's to us. 🥂💕</p>

      <LoveButton variant="ghost" className="mt-10 w-full sm:w-auto" onClick={onReplay}>
        Replay Our Story ↻
      </LoveButton>
    </Screen>
  );
}