import { useState } from "react";
import { motion } from "framer-motion";
import layanPhoto from "../assets/layan-photo.jpg";

const commands = [
  "scan --identity layan",
  "deploy --secure --fast",
  "audit --network --baseline",
  "open --projects",
];

const panels = [
  ["Security", "Threat modeling, IAM, secrets, and practical controls."],
  ["DevOps", "CI/CD, Linux, Docker, automation, and reliable delivery."],
  [
    "Network",
    "Routing, switching, troubleshooting, and resilient connectivity.",
  ],
];

export default function Hero() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [mood, setMood] = useState("calm");
  const command = commands[commandIndex];

  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden bg-[#0b0f17] px-4 pb-8 pt-24 text-[var(--paper-soft)] sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[#0b0f17]" />
      <div className="absolute inset-x-6 top-24 -z-10 h-px bg-white/10" />
      <div className="absolute bottom-10 right-10 -z-10 hidden h-64 w-64 rounded-[3rem] border border-white/8 bg-[#101827] lg:block" />

      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1500px] items-center gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-7"
        >
          <div className="mb-7 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--red)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--gold)]" />
              <span className="h-3 w-3 rounded-full bg-[var(--blue)]" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              layan.exe
            </p>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--red)]">
            DevOps / Security / Network
          </p>
          <h1 className="mt-4 text-5xl font-black leading-[0.9] tracking-normal text-[#fff8ee] sm:text-7xl lg:text-[6.5rem]">
            Layan builds systems that hold under pressure.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/66">
            She designs secure systems, streamlines delivery, and brings clarity
            to the details that matter most.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#070a10]/70 p-4 font-mono">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/36">
                command palette
              </span>
              <button
                type="button"
                onClick={() =>
                  setCommandIndex((index) => (index + 1) % commands.length)
                }
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
              >
                reroll
              </button>
            </div>
            <motion.p
              key={command}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-[#fff8ee]"
            >
              <span className="text-[var(--blue)]">~/portfolio</span> ${" "}
              {command}
            </motion.p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {panels.map(([title, text]) => (
              <a
                key={title}
                href={
                  title === "Security"
                    ? "#about"
                    : title === "DevOps"
                      ? "#skills"
                      : "#route-game"
                }
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <p className="text-lg font-black">{title}</p>
                <p className="mt-2 text-xs leading-5 text-white/52">{text}</p>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.08, ease: "easeOut" }}
          className="grid gap-5"
        >
          <div className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_34px_110px_rgba(0,0,0,0.36)] backdrop-blur">
            <div className="relative aspect-[0.96/1] overflow-hidden rounded-[1.5rem]">
              <img
                src={layanPhoto}
                alt="Portrait of Layan"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#0b0f17]/18" />

              <motion.div
                animate={{ y: ["-8%", "108%"] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-20 bg-white/10"
              />

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.26em] text-white/54">
                      operator
                    </p>
                    <h2 className="mt-1 text-4xl font-black text-[#fff8ee]">
                      Layan
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setMood((value) => (value === "calm" ? "deploy" : "calm"))
                    }
                    className="rounded-2xl border border-white/12 bg-[#0b0f17]/70 px-4 py-3 text-right backdrop-blur transition hover:bg-[#0b0f17]"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
                      mode
                    </p>
                    <p className="text-sm font-black text-[#fff8ee]">{mood}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
