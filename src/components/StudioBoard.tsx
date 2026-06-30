import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import redbullCan from "../assets/redbull.png";

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
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const filled = Math.ceil(cans / 50);
  const complete = cans >= 500;

  const machineLine = useMemo(() => {
    if (complete)
      return "The machine is fully fueled and ready for the next build.";
    if (cans >= 350)
      return "Momentum is building. The system is starting to feel reliable.";
    if (cans >= 200) return "The pipeline is shaping up and responding well.";
    return "Feed the machine and let the workflow take shape.";
  }, [cans, complete]);

  const feed = () => {
    setCans((current) => (current >= 500 ? 50 : current + 50));
    setFortuneIndex((index) => (index + 1) % fortunes.length);
  };

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
          className="mb-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--red)]">
            Interactive Lab
          </p>
        </motion.div>

        <motion.article
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#fff8ee] p-5 text-[var(--ink)] shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-7"
        >
          <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-[var(--red)]/16 blur-3xl" />
          <div className="relative grid gap-7 md:grid-cols-[0.72fr_1fr] md:items-center">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-[var(--red)]">
                energy loop
              </p>
              <h3 className="mt-3 max-w-lg text-4xl font-black leading-tight">
                You can pay me 500 cans.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
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
      </div>
    </section>
  );
}
