import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const reports = [
  {
    title: "Incident 042",
    body: "Bug contained. Root cause got its own chair and a very uncomfortable meeting.",
  },
  {
    title: "Incident 109",
    body: "Pipeline stopped acting mysterious after logs, checks, and a cleaner release route.",
  },
  {
    title: "Incident 217",
    body: "Permissions learned boundaries. Least privilege entered the chat.",
  },
];

const bugs = ["race condition", "expired token", "missing env", "local-only fix", "forgotten cron"];

export default function CreativeOps() {
  const [scanCount, setScanCount] = useState(0);
  const [contained, setContained] = useState<string[]>([]);
  const [reportIndex, setReportIndex] = useState(0);

  const clearance = useMemo(() => {
    if (scanCount === 0) return "awaiting scan";
    if (scanCount < 3) return "access granted";
    return "trusted operator";
  }, [scanCount]);

  const toggleBug = (bug: string) => {
    setContained((current) => (current.includes(bug) ? current.filter((item) => item !== bug) : [...current, bug]));
  };

  return (
    <section className="relative isolate overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#171d2a_0%,#101725_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-[var(--blue)]/10 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#dfd4c4]/48">Creative ops layer</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#eee5d6] sm:text-5xl">
              Tiny systems with personality.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <motion.article
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-white/10 bg-[#202838] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#dfd4c4]/40">badge scanner</p>
            <div className="mt-6 rounded-2xl border border-[#dfd4c4]/12 bg-[#111827] p-5">
              <div className="flex items-center justify-between">
                <motion.span
                  animate={{ rotate: scanCount ? [0, 8, -8, 0] : 0 }}
                  transition={{ duration: 0.42 }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 font-mono text-xs font-black text-[var(--gold)]"
                >
                  L
                </motion.span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{clearance}</span>
              </div>
              <h3 className="mt-8 text-3xl font-black text-[#eee5d6]">Layan</h3>
              <p className="mt-2 text-sm text-[#dfd4c4]/62">Security / DevOps / Cloud</p>
            </div>
            <button
              type="button"
              onClick={() => setScanCount((count) => count + 1)}
              className="mt-5 w-full rounded-2xl border border-[#dfd4c4]/14 bg-[#dfd4c4]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#eee5d6] transition hover:bg-[#dfd4c4] hover:text-[#101725]"
            >
              scan badge {scanCount ? `0${Math.min(scanCount, 9)}` : ""}
            </button>
          </motion.article>

          <motion.article
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-white/10 bg-[#dfd4c4] p-6 text-[var(--ink)] shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted-soft)]">bug containment</p>
              <span className="rounded-full bg-[var(--navy)] px-3 py-1 text-xs font-black text-[#eee5d6]">
                {contained.length}/{bugs.length}
              </span>
            </div>
            <h3 className="mt-5 text-3xl font-black text-[var(--navy)]">Put the bugs in time-out.</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {bugs.map((bug) => {
                const isContained = contained.includes(bug);
                return (
                  <button
                    key={bug}
                    type="button"
                    onClick={() => toggleBug(bug)}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                      isContained
                        ? "border-[var(--red)] bg-[var(--red)] text-[#eee5d6] line-through"
                        : "border-[var(--line)] bg-[#eee5d6]/72 text-[var(--navy)] hover:border-[var(--blue)]"
                    }`}
                  >
                    {bug}
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
              {contained.length === bugs.length
                ? "All clear. The board is suddenly very peaceful."
                : "Click the messy parts. Watch them lose power."}
            </p>
          </motion.article>

          <motion.article
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-white/10 bg-[#202838] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#dfd4c4]/40">incident report</p>
            <motion.div
              key={reportIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 min-h-52 rounded-2xl border border-[#dfd4c4]/12 bg-[#111827] p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{reports[reportIndex].title}</p>
              <p className="mt-5 text-xl font-black leading-snug text-[#eee5d6]">{reports[reportIndex].body}</p>
            </motion.div>
            <button
              type="button"
              onClick={() => setReportIndex((index) => (index + 1) % reports.length)}
              className="mt-5 w-full rounded-2xl border border-[#dfd4c4]/14 bg-[#dfd4c4]/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#eee5d6] transition hover:bg-[#dfd4c4] hover:text-[#101725]"
            >
              next report
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
