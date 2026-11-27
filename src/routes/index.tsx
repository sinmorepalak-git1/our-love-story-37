import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { LoveBackground } from "@/components/love/Background";
import {
  CountdownStep,
  EnvelopeStep,
  LetterStep,
  LoadingStep,
  ProposalStep,
  QuestionsStep,
  StoryStep,
  SuccessStep,
  FinalStep,
  useRecipientName,
} from "@/components/love/Steps";

const title = "Our Little Love Story";
const description =
  "A secret romantic digital letter — open the envelope, answer a few cute questions, and see how our story begins.";

type IndexSearchParams = {
  name?: string;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearchParams => ({
    name: typeof search.name === "string" ? search.name : undefined,
  }),
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
  | "countdown"
  | "loading"
  | "envelope"
  | "letter"
  | "questions"
  | "proposal"
  | "success"
  | "story"
  | "final";

function Index() {
  const [step, setStep] = useState<Step>("countdown");
  const [runId, setRunId] = useState(0);
  const search = Route.useSearch();
  const recipientName = useRecipientName(search?.name);

  const replay = useCallback(() => {
    setRunId((n) => n + 1);
    setStep("countdown");
  }, []);

  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-14">
      {step !== "final" && <LoveBackground intense={step === "success" || step === "story"} />}
      <h1 className="sr-only">Our Little Love Story</h1>
      <div key={`${runId}-${step}`} className="relative z-10 w-full">
        {step === "countdown" && <CountdownStep onDone={() => setStep("loading")} />}
        {step === "loading" && <LoadingStep onDone={() => setStep("envelope")} />}
        {step === "envelope" && <EnvelopeStep name={recipientName} onOpen={() => setStep("letter")} />}
        {step === "letter" && <LetterStep name={recipientName} onDone={() => setStep("questions")} />}
        {step === "questions" && <QuestionsStep onDone={() => setStep("proposal")} />}
        {step === "proposal" && <ProposalStep onYes={() => setStep("success")} />}
        {step === "success" && <SuccessStep onContinue={() => setStep("story")} />}
        {step === "story" && <StoryStep onContinue={() => setStep("final")} />}
        {step === "final" && <FinalStep onReplay={replay} />}
      </div>
    </main>
  );
}

