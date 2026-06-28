import { motion } from "framer-motion";

const features = [
  {
    title: "Security Mindset",
    text: "I think in risks, controls, and practical tradeoffs. The goal is secure work that teams can actually ship and maintain.",
    button: "About Layan",
    href: "#about",
    accent: "cyan",
    icon: "SEC",
    tone: "from-[#dfd4c4] to-[#cfc2ae] border-[rgba(20,33,61,0.18)]",
  },
  {
    title: "DevOps Tooling",
    text: "Automation, CI/CD, Linux, Docker, Python, and cloud workflows built to reduce manual effort and improve reliability.",
    button: "View Skills",
    href: "#skills",
    accent: "pink",
    icons: ["Linux", "Docker", "Python", "AWS", "CI/CD"],
    icon: "OPS",
    tone: "from-[#dfd4c4] to-[#ceb8b8] border-[rgba(20,33,61,0.18)]",
  },
  {
    title: "Project Work",
    text: "Hands-on builds across security, infrastructure, and cloud operations, with a focus on clarity, impact, and repeatability.",
    button: "Explore Projects",
    href: "#projects",
    accent: "violet",
    icon: "PRJ",
    tone: "from-[#dfd4c4] to-[#bcc5d2] border-[rgba(20,33,61,0.18)]",
  },
];

export default function FeatureCards() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
      {features.map((feature, index) => (
        <motion.article
          key={feature.title}
          id={feature.title.includes("Tooling") ? "skills" : feature.title.includes("Project") ? "projects" : undefined}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, delay: index * 0.1 }}
          whileHover={{ y: -6 }}
          className={`group relative min-h-[310px] overflow-hidden rounded-2xl border bg-gradient-to-br ${feature.tone} p-7 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:border-white/24`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(150,54,58,0.035),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(37,69,119,0.04),transparent_30%)] opacity-80" />
          <div className="relative flex h-full flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div className="rounded-xl border border-[var(--line)] bg-[rgba(221,210,192,0.58)] px-3 py-2 font-mono text-xs font-black text-[var(--red)]">
                {feature.icon}
              </div>
              <span className="font-mono text-xs text-[var(--muted-soft)]">0{index + 1}</span>
            </div>
            <h3 className="text-2xl font-black text-[var(--navy)]">{feature.title}</h3>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">{feature.text}</p>
            {feature.icons ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {feature.icons.map((icon) => (
                  <span
                    key={icon}
                    className="rounded-full border border-[var(--line)] bg-[rgba(221,210,192,0.55)] px-3 py-1.5 text-xs font-bold text-[var(--navy)]/72"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            ) : null}
            <a
              href={feature.href}
              className="mt-auto inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--red)] transition hover:text-[var(--blue)] focus:outline-none focus:ring-2 focus:ring-[rgba(25,84,210,0.25)]"
            >
              {feature.button} <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
