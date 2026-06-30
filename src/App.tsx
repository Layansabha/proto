import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import KineticDivider from "./components/KineticDivider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PageIntro from "./components/PageIntro";
import ContactPanel from "./components/ContactPanel";
import StudioBoard from "./components/StudioBoard";
import PortfolioRouteGame from "./components/PortfolioRouteGame/PortfolioRouteGame";
import FeaturedProjects from "./components/FeaturedProjects";
import TechnicalFocus from "./components/TechnicalFocus";

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
      <AnimatePresence>{introVisible ? <PageIntro /> : null}</AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[120] h-1 origin-left bg-[var(--red)]"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <KineticDivider />

      <FeaturedProjects />
      <TechnicalFocus />
      <PortfolioRouteGame />

      <StudioBoard />
      <ContactPanel />
    </main>
  );
}

export default App;
