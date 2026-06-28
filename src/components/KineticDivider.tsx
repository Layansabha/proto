export default function KineticDivider() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[var(--navy)] py-3 text-[var(--paper-soft)]">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-[11px] font-black uppercase tracking-[0.24em] opacity-58">
        {Array.from({ length: 2 }, (_, group) => (
          <div key={group} className="flex gap-8">
            {["secure", "automate", "connect", "network", "ship", "500 cans clause"].map((item) => (
              <span key={`${group}-${item}`} className="flex items-center gap-8">
                {item}
                <span className="h-1 w-1 rounded-full bg-[var(--red)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
