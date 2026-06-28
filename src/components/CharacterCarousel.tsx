import { motion } from "framer-motion";
import dva from "../assets/dva.png";
import spiderman from "../assets/spiderman.png";
import redbullCan from "../assets/redbull.png";

const cards = [
  {
    title: "D.VA MODE",
    tag: "Game On. Nerf This.",
    image: dva,
    alt: "D.Va inspired gamer character placeholder",
    className: "from-pink-500/30 to-cyan-400/10 border-pink-300/60 hover:shadow-[0_0_42px_rgba(244,114,182,0.58)]",
  },
  {
    title: "SPIDER-SENSE",
    tag: "Great Power. Great Responsibility.",
    image: spiderman,
    alt: "Spider-Man inspired upside-down hero placeholder",
    className: "from-red-500/25 to-blue-500/20 border-red-300/60 hover:shadow-[0_0_42px_rgba(59,130,246,0.52)] spider-card",
  },
  {
    title: "RED BULL",
    tag: "Essential Boost Activated.",
    image: redbullCan,
    alt: "Red Bull energy drink can placeholder",
    className: "from-blue-500/25 to-red-500/20 border-cyan-200/60 hover:animate-energyBoost hover:shadow-[0_0_42px_rgba(45,212,255,0.5)]",
  },
];

export default function CharacterCarousel() {
  return (
    <div className="relative w-full">
      <button
        aria-label="Previous character"
        className="absolute -left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl font-black text-[#101225] shadow-[0_0_24px_rgba(255,255,255,0.45)] transition hover:scale-105 lg:grid"
      >
        ‹
      </button>
      <button
        aria-label="Next character"
        className="absolute -right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl font-black text-[#101225] shadow-[0_0_24px_rgba(255,255,255,0.45)] transition hover:scale-105 lg:grid"
      >
        ›
      </button>
      <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + index * 0.14, duration: 0.65, ease: "easeOut" }}
            whileHover={{ y: -8, rotate: index === 1 ? -1.5 : 1.5 }}
            className={`group relative min-h-[265px] min-w-[220px] snap-center overflow-hidden rounded-[26px] border bg-gradient-to-br p-4 backdrop-blur-xl transition sm:min-w-[240px] lg:min-w-0 lg:flex-1 ${card.className}`}
          >
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 spider-web-lines" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070814] via-[#070814]/25 to-transparent" />
            <img
              src={card.image}
              alt={card.alt}
              className={`absolute inset-x-0 top-1 h-40 w-full object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.2)] transition duration-500 group-hover:scale-105 ${index === 2 ? "p-2" : ""}`}
            />
            <div className="relative z-10 flex h-full flex-col justify-end pt-40">
              <div>
                <h3 className="text-xl font-black uppercase leading-none text-white">{card.title}</h3>
                <p className="mt-3 max-w-[150px] text-sm font-semibold leading-5 text-white/82">{card.tag}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-3">
        {cards.map((card, index) => (
          <span
            key={card.title}
            className={`h-2 rounded-full ${index === 0 ? "w-2 bg-pink-300" : "w-2 bg-white/40"}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
