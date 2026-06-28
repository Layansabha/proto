import { motion } from "framer-motion";

export default function PageIntro() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.22, delay: 0.34 } }}
      className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[var(--navy)]"
    >
      <motion.div
        initial={{ y: 0 }}
        exit={{
          y: "-100%",
          transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] },
        }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[var(--navy)]"
      />
      <motion.div
        initial={{ y: 0 }}
        exit={{
          y: "100%",
          transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] },
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0d1528]"
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, transition: { duration: 0.25 } }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#dfd4c4]/54">
          initializing portfolio
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-tight text-[#eee5d6] sm:text-7xl">
          LAYAN
        </h1>
        <div className="mx-auto mt-5 h-1 w-56 overflow-hidden rounded-full bg-[#dfd4c4]/14">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.52, ease: "easeInOut" }}
            className="h-full bg-[var(--red)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
