import { useState } from "react";
import "./GameIntroOverlay.css";

type Props = {
  onStartGame: () => void;
};

const dialogue = [
  "Hi, I’m Layan. Welcome to my portfolio route.",
  "This is a playable map of my technical journey.",
  "Walk through each signpost to explore my projects, certificates, and experience.",
  "Each milestone shows how I combine DevOps, Networking, and Cybersecurity in practical work.",
  "Press E near any signpost to inspect it. Some milestones can also open the related project.",
];

export default function GameIntroOverlay({ onStartGame }: Props) {
  const [step, setStep] = useState(0);

  const isLastStep = step === dialogue.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onStartGame();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0b0f18]/80 p-4 text-center backdrop-blur-sm">
      <div className="w-full max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff6b8a]">
          Play My Route
        </p>
        <h2 className="mt-3 font-mono text-3xl font-black leading-none text-white sm:text-5xl">
          Start the route
        </h2>
      </div>

      <div className="relative mt-8 flex w-full max-w-xl items-center justify-center">
        <div className="layan-sprite" />

        <div className="dialogue-bubble relative -ml-44 -translate-y-24 w-96 max-w-[calc(100vw-2rem)]">
          <p className="font-mono text-lg font-bold">{dialogue[step]}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-6">
        <button
          type="button"
          onClick={handleNext}
          className="pixel-art-button w-48"
        >
          {isLastStep ? "Start Game" : "Next"}
        </button>
        <p className="font-mono text-sm font-bold text-white/60">
          Move: A/D or Arrows · Jump: W/Space · Inspect: E
        </p>
      </div>
    </div>
  );
}
