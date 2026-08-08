import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { LoveBackground } from "@/components/love/Background";
import {
  EnvelopeStep,
  LetterStep,
  LoadingStep,
  ProposalStep,
  QuestionsStep,
  StoryStep,
  SuccessStep,
} from "@/components/love/Steps";

const title = "Our Little Love Story";
const description =
  "A secret romantic digital letter — open the envelope, answer a few cute questions, and see how our story begins.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Step =
  | "loading"
  | "envelope"
  | "letter"
  | "questions"
  | "proposal"
  | "success"
  | "story";

function Index() {
  const [step, setStep] = useState<Step>("loading");
  const [runId, setRunId] = useState(0);

  const replay = useCallback(() => {
    setRunId((n) => n + 1);
    setStep("loading");
  }, []);

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-14">
      <LoveBackground intense={step === "success" || step === "story"} />
      <h1 className="sr-only">Our Little Love Story</h1>
      <div key={`${runId}-${step}`} className="relative z-10 w-full">
        {step === "loading" && <LoadingStep onDone={() => setStep("envelope")} />}
        {step === "envelope" && <EnvelopeStep onOpen={() => setStep("letter")} />}
        {step === "letter" && <LetterStep onDone={() => setStep("questions")} />}
        {step === "questions" && <QuestionsStep onDone={() => setStep("proposal")} />}
        {step === "proposal" && <ProposalStep onYes={() => setStep("success")} />}
        {step === "success" && <SuccessStep onContinue={() => setStep("story")} />}
        {step === "story" && <StoryStep onReplay={replay} />}
      </div>
    </main>
  );
}
