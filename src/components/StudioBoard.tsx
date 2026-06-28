import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import redbullCan from "../assets/redbull.png";

const skills = [
  { name: "Linux", code: "$_", note: "shell discipline" },
  { name: "Docker", code: "[]", note: "container control" },
  { name: "Python", code: "py", note: "script fluency" },
  { name: "AWS", code: "aw", note: "cloud awareness" },
  { name: "CI/CD", code: ">>", note: "delivery loop" },
  { name: "IAM", code: "id", note: "access control" },
  { name: "Logs", code: "!!", note: "signal visibility" },
  { name: "Auto", code: "fx", note: "less toil" },
];
const vaultItems = [
  "expired token",
  "open bucket",
  "missing logs",
  "manual deploy",
];
const containers = ["base", "api", "worker", "monitor"];
const fortunes = [
  "Ship it, and leave a rollback path.",
  "Least privilege still wins.",
  "Logs first. Panic later.",
  "A strong pipeline deserves clear boundaries.",
];
const upgrades = [
  { name: "+focus", cost: 150 },
  { name: "+debug luck", cost: 250 },
  { name: "+deploy speed", cost: 350 },
  { name: "+no meeting shield", cost: 500 },
];

export default function StudioBoard() {
  const [cans, setCans] = useState(100);
  const [contained, setContained] = useState<string[]>([]);
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const [deploys, setDeploys] = useState(2);
  const [stack, setStack] = useState<string[]>([]);
  const [combo, setCombo] = useState("");
  const [operatorMode, setOperatorMode] = useState(false);
  const [unlockCode, setUnlockCode] = useState("");
  const filled = Math.ceil(cans / 50);
  const complete = cans >= 500;
  const imageBuilt = stack.length === containers.length;

  const machineLine = useMemo(() => {
    if (complete)
      return "The machine is fully fueled and ready for the next build.";
    if (cans >= 350)
      return "Momentum is building. The system is starting to feel reliable.";
    if (cans >= 200)
      return "Good progress. The setup is holding together nicely.";
    return "Feed the machine and let the workflow take shape.";
  }, [cans, complete]);

  const toggleVault = (item: string) => {
    setContained((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  };

  const feed = () => {
    setCans((current) => (current >= 500 ? 50 : current + 50));
    setFortuneIndex((index) => (index + 1) % fortunes.length);
  };

  const addContainer = (container: string) => {
    setStack((current) => {
      if (current.includes(container)) return current;
      return [...current, container];
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const next = `${combo}${event.key.toLowerCase()}`.slice(-5);
      setCombo(next);
      if (next === "layan") setOperatorMode(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [combo]);

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#0b0f17] px-4 py-16 text-[var(--paper-soft)] sm:px-6 lg:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[#0b0f17]" />
      <div className="absolute left-0 top-0 -z-10 h-32 w-full bg-[#101827]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="mb-8 grid gap-4 lg:grid-cols-[0.92fr_0.5fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--red)]">
              Interactive Lab
            </p>
            <h2 className="mt-3 max-w-4xl text-4xl font-black leading-[0.98] text-[#fff8ee] sm:text-6xl">
              Thoughtful systems. Clear personality.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58"></p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-12">
          <motion.article
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#fff8ee] p-5 text-[var(--ink)] shadow-[0_30px_100px_rgba(0,0,0,0.28)] lg:col-span-7"
          >
            <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-[var(--red)]/16 blur-3xl" />
            <div className="relative grid gap-5 md:grid-cols-[0.78fr_1fr] md:items-center">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[var(--red)]">
                  energy loop
                </p>
                <h3 className="mt-3 text-4xl font-black leading-tight">
                  You can pay me with 500 cans.
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {machineLine}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={feed}
                    className="rounded-xl bg-[var(--red)] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#c9373d] focus:outline-none focus:ring-2 focus:ring-[var(--red)]/30"
                  >
                    {complete ? "reset machine" : "insert +50"}
                  </button>
                  <div className="rounded-xl border border-[var(--line)] bg-white/70 px-4 py-3 font-mono text-xs font-black text-[var(--ink)]">
                    {cans}/500
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/72 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                    chamber
                  </span>
                  <span className="text-xs font-black text-[var(--red)]">
                    {filled}/10
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 10 }, (_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        opacity: index < filled ? 1 : 0.15,
                        y: index === filled - 1 ? [0, -6, 0] : 0,
                        rotate: index === filled - 1 ? [0, -2, 2, 0] : 0,
                      }}
                      transition={{ duration: 0.45 }}
                      className="grid h-20 place-items-center rounded-2xl border border-black/10 bg-[#f0e8dc]"
                    >
                      <img
                        src={redbullCan}
                        alt=""
                        className="h-14 w-9 object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  key={fortuneIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-black/10 bg-[#11131a] p-4 text-[#fff8ee]"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/36">
                    receipt
                  </p>
                  <p className="mt-2 text-sm font-bold leading-6 text-white/76">
                    {fortunes[fortuneIndex]}
                  </p>
                </motion.div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {upgrades.map((upgrade) => {
                    const unlocked = cans >= upgrade.cost;
                    return (
                      <motion.div
                        key={upgrade.name}
                        animate={{
                          opacity: unlocked ? 1 : 0.38,
                          scale: unlocked ? 1 : 0.98,
                        }}
                        className={`rounded-xl border px-3 py-2 text-xs font-black ${
                          unlocked
                            ? "border-[var(--red)] bg-[var(--red)] text-white"
                            : "border-black/10 bg-white/60 text-[var(--muted-soft)]"
                        }`}
                      >
                        {upgrade.name}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            id="skills"
            className={`rounded-[2rem] border p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur lg:col-span-5 ${
              operatorMode
                ? "border-[var(--red)]/50 bg-[#fff8ee] text-[var(--ink)]"
                : "border-white/10 bg-white/[0.065]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className={`font-mono text-[10px] font-black uppercase tracking-[0.22em] ${
                    operatorMode ? "text-[var(--red)]" : "text-white/38"
                  }`}
                >
                  {operatorMode ? "operator inventory" : "skill inventory"}
                </p>
                <h3
                  className={`mt-3 text-3xl font-black ${operatorMode ? "text-[var(--ink)]" : "text-[#fff8ee]"}`}
                >
                  {operatorMode
                    ? "Access granted."
                    : "Practical tools, real execution."}
                </h3>
              </div>
              {operatorMode ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-full bg-[var(--red)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white"
                >
                  operator
                </motion.span>
              ) : null}
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -5, rotate: index % 2 ? 1.5 : -1.5 }}
                  animate={operatorMode ? { y: [0, -3, 0] } : { y: 0 }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={
                    operatorMode
                      ? { duration: 1.8, repeat: Infinity, delay: index * 0.08 }
                      : { delay: index * 0.025 }
                  }
                  className={`group rounded-2xl border p-3 text-center ${
                    operatorMode
                      ? "border-[var(--line)] bg-white/70"
                      : "border-white/10 bg-white/[0.07]"
                  }`}
                >
                  <div
                    className={`mx-auto grid h-11 w-11 place-items-center rounded-xl border font-mono text-sm font-black shadow-[inset_0_0_0_2px_rgba(255,255,255,0.03)] ${
                      operatorMode
                        ? "border-[var(--red)]/30 bg-[var(--red)] text-white"
                        : "border-white/10 bg-[#0b0f17] text-[#fff8ee]"
                    }`}
                  >
                    {skill.code}
                  </div>
                  <p
                    className={`mt-2 text-xs font-black ${operatorMode ? "text-[var(--ink)]" : "text-white/78"}`}
                  >
                    {skill.name}
                  </p>
                  <p
                    className={`mt-1 hidden text-[10px] font-bold leading-4 group-hover:block ${
                      operatorMode ? "text-[var(--muted)]" : "text-white/42"
                    }`}
                  >
                    {skill.note}
                  </p>
                </motion.div>
              ))}
            </div>
            {operatorMode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-2xl border border-[var(--line)] bg-white/72 p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-soft)]">
                  operator perks
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    "all tools awake",
                    "debug luck +12",
                    "red bull discount denied",
                  ].map((perk) => (
                    <span
                      key={perk}
                      className="rounded-xl bg-[#11131a] px-3 py-2 text-xs font-black text-[#fff8ee]"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : null}
            <div
              className={`mt-4 rounded-2xl border p-3 ${
                operatorMode
                  ? "border-[var(--line)] bg-white/60"
                  : "border-white/10 bg-[#0b0f17]/68"
              }`}
            >
              <label
                htmlFor="operator-code"
                className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                  operatorMode ? "text-[var(--muted-soft)]" : "text-white/38"
                }`}
              >
                unlock operator mode
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="operator-code"
                  value={unlockCode}
                  onChange={(event) => {
                    const value = event.target.value;
                    setUnlockCode(value);
                    if (value.trim().toLowerCase() === "layan")
                      setOperatorMode(true);
                  }}
                  placeholder="type layan"
                  className={`min-w-0 flex-1 rounded-xl border px-3 py-2 text-sm font-bold outline-none focus:border-[var(--red)] ${
                    operatorMode
                      ? "border-[var(--line)] bg-white text-[var(--ink)] placeholder:text-[var(--muted-soft)]"
                      : "border-white/10 bg-white/[0.06] text-white placeholder:text-white/28"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setUnlockCode("");
                    setOperatorMode(false);
                  }}
                  className={`rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${
                    operatorMode
                      ? "border-[var(--line)] text-[var(--muted)] hover:bg-white"
                      : "border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  reset
                </button>
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            className="rounded-[2rem] border border-white/10 bg-[#dfe8f2] p-5 text-[var(--ink)] shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:col-span-4"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[var(--muted-soft)]">
              bug vault
            </p>
            <h3 className="mt-3 text-3xl font-black">Tap to contain.</h3>
            <div className="mt-5 grid gap-2">
              {vaultItems.map((item) => {
                const locked = contained.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleVault(item)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${
                      locked
                        ? "border-[var(--blue)] bg-[var(--blue)] text-white line-through"
                        : "border-black/10 bg-white/58 text-[var(--ink)] hover:bg-white"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            id="projects"
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.065] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur lg:col-span-4"
          >
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-white/38">
              deploy button
            </p>
            <h3 className="mt-3 text-3xl font-black text-[#fff8ee]">
              {deploys} clean deploys queued.
            </h3>
            <button
              type="button"
              onClick={() => setDeploys((count) => count + 1)}
              className="mt-6 w-full rounded-2xl border border-white/10 bg-[#fff8ee] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              queue another
            </button>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {Array.from({ length: Math.min(deploys, 10) }, (_, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-3 rounded-full bg-[var(--blue)]"
                />
              ))}
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -4 }}
            className="rounded-[2rem] border border-white/10 bg-[#fff8ee] p-5 text-[var(--ink)] shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:col-span-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[var(--muted-soft)]">
                  docker mini-stack
                </p>
                <h3 className="mt-3 text-3xl font-black">Build the image.</h3>
              </div>
              <button
                type="button"
                onClick={() => setStack([])}
                className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--muted)] hover:bg-white"
              >
                reset
              </button>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {containers.map((container) => (
                <button
                  key={container}
                  type="button"
                  onClick={() => addContainer(container)}
                  className="rounded-xl border border-black/10 bg-white/62 px-2 py-3 font-mono text-[11px] font-black text-[var(--ink)] transition hover:-translate-y-1 hover:bg-white"
                >
                  {container}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-black/10 bg-[#11131a] p-4">
              <div className="flex min-h-28 flex-col-reverse justify-start gap-2">
                {stack.map((container, index) => (
                  <motion.div
                    key={container}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 font-mono text-xs font-black text-[#fff8ee]"
                  >
                    layer {index + 1}: {container}
                  </motion.div>
                ))}
              </div>
              <p
                className={`mt-3 font-mono text-xs font-black ${imageBuilt ? "text-[var(--red)]" : "text-white/38"}`}
              >
                {imageBuilt
                  ? "image built successfully"
                  : "waiting for layers..."}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
