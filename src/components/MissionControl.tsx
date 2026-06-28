import { useState } from "react";
import { motion } from "framer-motion";

const modes = [
  {
    id: "security",
    label: "Security",
    title: "Security comes first.",
    body: "Every system starts with the question: what can break, leak, or drift, and how do we contain it early?",
    metric: "controls mapped",
    signal: 84,
    accent: "#b5474d",
    packet: "least privilege",
    logs: [
      "identity boundaries reviewed",
      "secrets handled safely",
      "risk paths documented",
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    title: "Cloud systems should stay legible.",
    body: "Infrastructure should be easy to read, maintain, and recover, even when the workload scales quickly.",
    metric: "drift tracked",
    signal: 72,
    accent: "#315f9b",
    packet: "repeatable paths",
    logs: [
      "runtime mapped",
      "cost signals visible",
      "rollback route documented",
    ],
  },
  {
    id: "automation",
    label: "Automation",
    title: "Manual work gets replaced.",
    body: "If a step is repetitive or fragile, it deserves a workflow, a check, and a clear path to repeatability.",
    metric: "toil reduced",
    signal: 91,
    accent: "#a97a2e",
    packet: "quality gates",
    logs: ["pipeline tightened", "cache cleaned", "release notes attached"],
  },
  {
    id: "play",
    label: "Play",
    title: "A sharp system with a human voice.",
    body: "Personality is intentional: enough to be memorable, never enough to distract from the work.",
    metric: "human signal",
    signal: 66,
    accent: "#8d4a85",
    packet: "thoughtful detail",
    logs: ["copy refined", "motion softened", "cringe filter active"],
  },
];

const nodes = [
  { label: "IAM", x: 16, y: 32 },
  { label: "CI", x: 38, y: 18 },
  { label: "OBS", x: 66, y: 28 },
  { label: "APP", x: 78, y: 60 },
  { label: "LOG", x: 48, y: 78 },
  { label: "OPS", x: 22, y: 68 },
];

export default function MissionControl() {
  const [activeId, setActiveId] = useState(modes[0].id);
  const active = modes.find((mode) => mode.id === activeId) ?? modes[0];
  const activeNode = modes.findIndex((mode) => mode.id === active.id) + 1;

  return (
    <section
      id="mission"
      className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#cfc5b7_0%,#b7aa98_42%,#182133_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-[linear-gradient(180deg,rgba(255,250,240,0.28),transparent)]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-12%", "12%", "-12%"], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-24 -z-10 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-[var(--blue)] blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--red)]">
              Mission Control
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-[var(--navy)] sm:text-6xl">
              Shift the operating mode.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
            Four modes, one approach: security discipline, cloud clarity,
            automation habits, and a measured sense of personality.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2.2rem] border border-white/15 bg-[#111827] shadow-[0_34px_100px_rgba(9,14,24,0.32)] lg:grid-cols-[250px_1fr]">
          <div className="border-b border-white/10 bg-[#0d1424] p-4 lg:border-b-0 lg:border-r">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#dfd4c4]/45">
                deck
              </span>
              <span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_18px_var(--gold)]" />
            </div>
            <div className="grid gap-2">
              {modes.map((mode, index) => {
                const selected = active.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveId(mode.id)}
                    className="group relative overflow-hidden rounded-2xl px-4 py-4 text-left text-[#eee5d6] transition hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    {selected ? (
                      <motion.span
                        layoutId="mode-highlight"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          backgroundColor: `${mode.accent}26`,
                          border: `1px solid ${mode.accent}80`,
                        }}
                      />
                    ) : null}
                    <span className="relative flex items-center justify-between gap-3">
                      <span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-45">
                          0{index + 1}
                        </span>
                        <span className="mt-1 block text-xl font-black">
                          {mode.label}
                        </span>
                      </span>
                      <span
                        className="h-2.5 w-2.5 rounded-full opacity-70 transition group-hover:scale-125"
                        style={{ backgroundColor: mode.accent }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid min-h-[590px] gap-5 p-5 md:p-8 xl:grid-cols-[1.05fr_0.95fr]">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#182132] p-6 text-[#eee5d6]"
            >
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
              <motion.div
                aria-hidden="true"
                animate={{ y: ["-15%", "115%"] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/12 to-transparent"
              />

              <div className="relative">
                <p
                  className="font-mono text-xs uppercase tracking-[0.24em]"
                  style={{ color: active.accent }}
                >
                  active mode
                </p>
                <h3 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                  {active.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-[#dfd4c4]/72">
                  {active.body}
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/18 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/40">
                      output
                    </p>
                    <p className="mt-2 text-2xl font-black">{active.metric}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/18 p-4 sm:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/40">
                        signal
                      </p>
                      <p className="font-mono text-xs font-black">
                        {active.signal}%
                      </p>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/35">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: active.accent }}
                        animate={{ width: `${active.signal}%` }}
                        transition={{ duration: 0.45 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/18 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/40">
                    packet
                  </p>
                  <motion.p
                    key={active.packet}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-2 text-xl font-black"
                    style={{ color: active.accent }}
                  >
                    {active.packet}
                  </motion.p>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-5">
              <div className="relative min-h-80 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0d1424] p-5">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="16,32 38,18 66,28 78,60 48,78 22,68 16,32"
                    fill="none"
                    stroke="rgba(223,212,196,0.16)"
                    strokeWidth="0.6"
                  />
                  <motion.polyline
                    key={active.id}
                    points="16,32 38,18 66,28 78,60 48,78 22,68 16,32"
                    fill="none"
                    stroke={active.accent}
                    strokeWidth="0.9"
                    strokeDasharray="12 8"
                    animate={{ strokeDashoffset: [24, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>

                <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-[#dfd4c4] text-center shadow-[0_0_60px_rgba(223,212,196,0.16)]">
                  <motion.span
                    key={active.label}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-mono text-xs font-black uppercase tracking-[0.18em] text-[var(--navy)]"
                  >
                    {active.label}
                  </motion.span>
                </div>

                {nodes.map((node, index) => {
                  const selected = index === activeNode;
                  return (
                    <motion.div
                      key={node.label}
                      animate={{ scale: selected ? [1, 1.14, 1] : 1 }}
                      transition={{
                        duration: 1.7,
                        repeat: selected ? Infinity : 0,
                      }}
                      className="absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border bg-[#182132] font-mono text-xs font-black text-[#eee5d6]"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        borderColor: selected
                          ? active.accent
                          : "rgba(255,255,255,0.12)",
                        boxShadow: selected
                          ? `0 0 34px ${active.accent}66`
                          : "none",
                      }}
                    >
                      {node.label}
                    </motion.div>
                  );
                })}
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-[#0d1424] p-5 font-mono text-xs leading-7">
                <p className="mb-3 uppercase tracking-[0.22em] text-[#dfd4c4]/42">
                  live trace
                </p>
                {active.logs.map((log, index) => (
                  <motion.p
                    key={`${active.id}-${log}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-[#dfd4c4]/72"
                  >
                    <span style={{ color: active.accent }}>0{index + 1}</span> /{" "}
                    {log}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
