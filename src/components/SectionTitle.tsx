import { motion } from "framer-motion";

type SectionTitleProps = {
  label: string;
  title: string;
  subtitle: string;
};

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-14 max-w-5xl text-center"
    >
      <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[var(--gold)]">{label}</p>
      <h2 className="text-4xl font-black leading-tight tracking-normal text-[var(--paper-soft)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[rgba(255,250,240,0.72)] sm:text-lg">{subtitle}</p>
    </motion.div>
  );
}
