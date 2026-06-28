import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import redbullCan from "../assets/redbull.png";

const statuses = [
  "insert cans",
  "warming up",
  "invoice math happening",
  "negotiation mode",
  "final boss invoice",
  "paid in full",
];

const tickets = [
  "deploy token",
  "focus refill",
  "tiny victory",
  "no meeting spell",
  "ship it pass",
  "bug apology",
];

export default function PersonalityBits() {
  const [cans, setCans] = useState(50);
  const [ticketIndex, setTicketIndex] = useState(0);
  const filledSlots = Math.max(1, Math.ceil(cans / 50));
  const status = statuses[Math.min(statuses.length - 1, Math.floor(cans / 100))];
  const complete = cans === 500;

  const receipt = useMemo(() => {
    if (complete) return "500 cans accepted. portfolio owner has been emotionally compensated.";
    return `${500 - cans} cans left before the machine stops judging the invoice.`;
  }, [cans, complete]);

  const feedMachine = () => {
    setCans((current) => Math.min(500, current + 50));
    setTicketIndex((index) => (index + 1) % tickets.length);
  };

  return (
    <section id="playground" className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#182133_0%,#cfc5b7_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0.22),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
          className="text-[#eee5d6] lg:self-start"
        >
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#dfd4c4]/58">Playground / Red Bull machine</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Payment terminal, but make it suspiciously caffeinated.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[#dfd4c4]/70">
            Feed the machine. It prints tiny rewards and pretends 500 cans is a normal invoice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[720px]"
        >
          <div className="absolute -left-10 top-12 h-56 w-56 rounded-full bg-[var(--red)]/18 blur-3xl" />
          <div className="absolute -right-8 bottom-10 h-56 w-56 rounded-full bg-[var(--blue)]/18 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-[#111827] p-5 shadow-[0_34px_110px_rgba(9,14,24,0.34)]">
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:16px_16px]" />
            {complete ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.26, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.35 }}
                className="pointer-events-none absolute inset-0 bg-[var(--gold)]"
              />
            ) : null}

            <div className="relative grid gap-5 lg:grid-cols-[1fr_0.55fr]">
              <div className="rounded-[1.7rem] border border-white/10 bg-[#182132] p-5">
                <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d1424] p-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#dfd4c4]/45">machine status</p>
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-xl font-black text-[#f3ead9]"
                    >
                      {status}
                    </motion.p>
                  </div>
                  <div className="rounded-xl bg-black/28 px-4 py-3 text-right font-mono">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/38">balance</p>
                    <p className="text-2xl font-black text-[#f3ead9]">{cans}</p>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/42">can chamber</p>
                    <p className="text-xs font-bold text-[#dfd4c4]/58">{filledSlots}/10 slots</p>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: 10 }, (_, index) => (
                      <motion.div
                        key={index}
                        animate={{
                          opacity: index < filledSlots ? 1 : 0.16,
                          y: index < filledSlots ? [0, -4, 0] : 0,
                        }}
                        transition={{ duration: 0.5, delay: index < filledSlots ? index * 0.025 : 0 }}
                        className="grid h-20 place-items-center rounded-xl border border-white/10 bg-[#101827]"
                      >
                        <img src={redbullCan} alt="" className="h-14 w-9 object-contain [image-rendering:pixelated]" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_0.65fr]">
                  <div className="rounded-2xl border border-white/10 bg-[#0d1424] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#dfd4c4]/42">progress</p>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-black/30">
                      <motion.div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--red),var(--gold),var(--blue))]"
                        animate={{ width: `${(cans / 500) * 100}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                    <p className="mt-3 text-sm font-bold text-[#dfd4c4]/70">{receipt}</p>
                  </div>

                  <button
                    type="button"
                    onClick={feedMachine}
                    className="group relative overflow-hidden rounded-2xl border border-[#dfd4c4]/18 bg-[var(--red)] px-5 py-5 text-sm font-black uppercase tracking-[0.14em] text-[#f3ead9] shadow-[inset_0_-6px_0_rgba(0,0,0,0.24)] transition hover:translate-y-0.5 hover:bg-[#a33f45] focus:outline-none focus:ring-2 focus:ring-[#dfd4c4]/40"
                  >
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-white/10 transition group-hover:translate-y-full" />
                    <span className="relative">insert +50</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="relative min-h-64 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#dfd4c4] p-5 text-[var(--navy)]">
                  <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-[var(--line)] bg-[#eee5d6]" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted-soft)]">ticket printer</p>
                  <motion.div
                    key={ticketIndex}
                    initial={{ y: -42, opacity: 0, rotate: -1 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    className="mt-7 rounded-2xl border border-[var(--line)] bg-[#fff8ea] p-4 shadow-[0_18px_40px_rgba(20,33,61,0.12)]"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--red)]">reward</p>
                    <p className="mt-3 text-3xl font-black">{complete ? "legendary payout" : tickets[ticketIndex]}</p>
                    <p className="mt-4 font-mono text-xs leading-6 text-[var(--muted)]">
                      {complete ? "approved by the completely real finance department" : "valid until the next production alert"}
                    </p>
                  </motion.div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCans(50);
                    setTicketIndex(0);
                  }}
                  className="rounded-2xl border border-white/10 bg-[#0d1424] px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-[#dfd4c4]/62 transition hover:text-[#f3ead9] focus:outline-none focus:ring-2 focus:ring-[#dfd4c4]/30"
                >
                  reset terminal
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
