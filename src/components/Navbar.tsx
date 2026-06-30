import { motion } from "framer-motion";
import logo from "../assets/logoo.png";

const links = [
  { label: "Journey", href: "#route-game" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#technical-focus" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-5 sm:px-8 lg:px-12"
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 rounded-2xl border border-white/12 bg-[#101827]/78 px-4 py-3 shadow-[0_18px_70px_rgba(9,14,24,0.18)] backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-3 text-[var(--ink)]">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#f4eadb]">
            <img
              src={logo}
              alt="Layan logo"
              className="h-full w-full object-contain p-1.5"
            />
          </span>
          <span className="hidden leading-none text-[#fff4e6] sm:block">
            <span className="block font-mono text-sm font-black tracking-[0.18em]">
              LAYAN
            </span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.32em] text-[#e8d7c5]/52">
              Security &amp; DevOps
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-xs font-black uppercase tracking-[0.14em] text-[#e8d7c5]/68 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact-info"
          className="rounded-xl border border-[#e8d7c5]/16 bg-[#e8d7c5] px-4 py-2.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--navy)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#e8d7c5]/30"
        >
          Connect
        </a>
      </nav>
    </motion.header>
  );
}
