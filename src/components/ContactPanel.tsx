import { motion } from "framer-motion";
import redbullCan from "../assets/redbull.png";

const channels = ["DevOps", "Security", "Network"];
const contacts = [
  {
    label: "Email",
    value: "layansabha@yahoo.com",
    href: "mailto:layansabha@yahoo.com",
  },
  { label: "Phone", value: "+962798691559", href: "tel:+962798691559" },
  {
    label: "GitHub",
    value: "github.com/Layansabha",
    href: "https://github.com/Layansabha",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/layan-sabha",
    href: "https://www.linkedin.com/in/layan-sabha/",
  },
  {
    label: "Instagram",
    value: "@layan.9ss",
    href: "https://www.instagram.com/layan.9ss",
  },
];

export default function ContactPanel() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[var(--paper)] px-4 pb-14 pt-6 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--navy)] py-4 px-4 text-[var(--paper-soft)] shadow-[0_30px_90px_rgba(17,19,26,0.18)] md:py-5 md:px-6"
        >
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-24 rounded-full bg-[var(--blue)]/18 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_0.66fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white/42">
                Contact
              </p>
              <h2 className="mt-2 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
                Let&apos;s build something secure, useful, and lasting.
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {channels.map((channel) => (
                  <span
                    key={channel}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white/70"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            <div
              id="contact-info"
              className="scroll-mt-28 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-end gap-4">
                <motion.img
                  src={redbullCan}
                  alt="Red Bull can"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-24 w-12 object-contain"
                />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/42">
                    status
                  </p>
                  <p className="mt-2 text-2xl font-black">
                    Available for focused, well-scoped work.
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {contacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="rounded-xl border border-white/10 bg-[var(--paper-soft)] px-4 py-3 text-[var(--navy)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <span className="block font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {contact.label}
                    </span>
                    <span className="mt-1 block text-sm font-black">
                      {contact.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
