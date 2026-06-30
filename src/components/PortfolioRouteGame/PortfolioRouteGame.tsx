import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import PortfolioRouteScene from "./PortfolioRouteScene";
import type { GameMilestone } from "./milestones";
import GameIntroOverlay from "./GameIntroOverlay";

export default function PortfolioRouteGame() {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const phaserRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<PortfolioRouteScene | null>(null);

  const [nearby, setNearby] = useState<GameMilestone | null>(null);
  const [opened, setOpened] = useState<GameMilestone | null>(null);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    if (!gameRef.current || phaserRef.current) return;

    const scene = new PortfolioRouteScene({
      onMilestoneNearby: setNearby,
      onOpenMilestone: setOpened,
      onRouteComplete: () => setComplete(true),
      onProgressChange: setProgress,
    });

    sceneRef.current = scene;

    phaserRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 960,
      height: 540,
      backgroundColor: "#83c9ff",
      pixelArt: true,
      roundPixels: true,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene,
    });

    return () => {
      phaserRef.current?.destroy(true);
      phaserRef.current = null;
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showVideoModal) {
          setShowVideoModal(false);
        } else {
          setOpened(null);
        }
      }
    };

    const onWindowBlur = () => {
      sceneRef.current?.stopPlayer();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [showVideoModal]);

  useEffect(() => {
    if (!showVideoModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showVideoModal]);

  useEffect(() => {
    if (!phaserRef.current) return;

    sceneRef.current?.stopPlayer();

    if (opened) {
      phaserRef.current.scene.pause("PortfolioRouteScene");
    } else {
      phaserRef.current.scene.resume("PortfolioRouteScene");
      window.requestAnimationFrame(() => sceneRef.current?.stopPlayer());
    }
  }, [opened]);

  const pressControl = (control: "left" | "right" | "jump") => {
    if (control === "left") sceneRef.current?.setMobileInput({ left: true });
    if (control === "right") sceneRef.current?.setMobileInput({ right: true });
    if (control === "jump") sceneRef.current?.setMobileInput({ jump: true });
  };

  const releaseControl = (control: "left" | "right") => {
    if (control === "left") sceneRef.current?.setMobileInput({ left: false });
    if (control === "right") sceneRef.current?.setMobileInput({ right: false });
  };

  const handleStartGame = () => {
    setHasStarted(true);
    sceneRef.current?.startGame();
  };

  return (
    <section
      id="route-game"
      className="relative overflow-hidden bg-[#0f111a] px-4 py-16 text-[#fff7ea] sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#151827] p-3 shadow-[0_34px_130px_rgba(0,0,0,0.42)]">
          <div className="mb-3 rounded-[1.45rem] border border-white/10 bg-[#11131d]/90 px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ff6b8a]">
                  Play My Route
                </p>

                <h2 className="mt-2 text-3xl font-black leading-none sm:text-5xl">
                  Jump through my work.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-7 text-white/60">
                A small pixel platformer portfolio. Move, jump, inspect each
                milestone, and reach the final flag.
              </p>
            </div>
          </div>

          {!hasStarted && <GameIntroOverlay onStartGame={handleStartGame} />}

          <div className="relative rounded-[1.55rem] border border-white/10 bg-[#0b0f18] p-2">
            <div className="absolute left-5 right-5 top-5 z-20 h-3 overflow-hidden rounded-full border border-white/10 bg-[#0f111a]/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b8a] via-[#73e0c1] to-[#fff2dd] transition-[width] duration-200"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div
              ref={gameRef}
              className="h-[min(72vh,640px)] w-full overflow-hidden rounded-[1.25rem] bg-[#83c9ff]"
            />
          </div>

          {nearby && !opened && hasStarted ? (
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-2xl border border-white/15 bg-[#0f111a]/92 px-5 py-3 text-center text-sm font-black shadow-2xl backdrop-blur-sm">
              Press <span className="text-[#ff6b8a]">E</span> to open{" "}
              <span className="text-[#73e0c1]">
                {nearby.number} · {nearby.title}
              </span>
            </div>
          ) : null}

          <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden gap-3 max-lg:flex">
            <button
              type="button"
              onPointerDown={() => pressControl("left")}
              onPointerUp={() => releaseControl("left")}
              onPointerLeave={() => releaseControl("left")}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-[#0f111a]/88 text-xl font-black shadow-xl"
            >
              ←
            </button>

            <button
              type="button"
              onPointerDown={() => pressControl("right")}
              onPointerUp={() => releaseControl("right")}
              onPointerLeave={() => releaseControl("right")}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-[#0f111a]/88 text-xl font-black shadow-xl"
            >
              →
            </button>
          </div>

          <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden gap-3 max-lg:flex">
            <button
              type="button"
              onPointerDown={() => pressControl("jump")}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-[#0f111a]/88 text-xs font-black uppercase shadow-xl"
            >
              Jump
            </button>

            <button
              type="button"
              onPointerDown={() => sceneRef.current?.inspectNearby()}
              className="pointer-events-auto grid h-12 w-16 place-items-center rounded-2xl border border-white/15 bg-[#ff6b8a] text-xs font-black uppercase text-[#11131a] shadow-xl"
            >
              Open
            </button>
          </div>

          {opened ? (
            <div className="absolute inset-0 z-30 grid place-items-center bg-black/48 p-4 backdrop-blur-sm">
              <div className="max-h-[calc(100%-2rem)] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-black/10 bg-[#fff7ea] text-[#11131a] shadow-[0_34px_130px_rgba(0,0,0,0.52)]">
                <div className="border-b border-black/10 bg-[#11131a] px-6 py-4 text-[#fff7ea]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                        Milestone unlocked
                      </p>
                      <p className="mt-1 text-sm font-black text-[#73e0c1]">
                        {opened.number} · {opened.type}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowVideoModal(false);
                        setOpened(null);
                      }}
                      className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm font-black transition hover:-translate-y-0.5"
                      aria-label="Close milestone card"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-3xl font-black leading-tight">
                      {opened.title}
                    </h3>
                    {opened.status ? (
                      <span className="rounded-full border border-[#e2484d]/20 bg-[#e2484d]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#b72f36]">
                        {opened.status}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm font-black text-black/50">
                    {opened.date} · {opened.organization}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-black/70">
                    {opened.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                      Skills unlocked
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {opened.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-black/10 bg-[#fff7ea] px-3 py-1.5 text-xs font-black text-black/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {opened.evidence && opened.evidence.length > 0 ? (
                    <div className="mt-5 rounded-2xl border border-black/10 bg-[#11131a] p-4 text-[#fff7ea]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                            Verified credentials
                          </p>
                          <p className="mt-1 text-sm font-black text-[#73e0c1]">
                            {opened.type === "Certification"
                              ? "Official certification record"
                              : "Training completion records"}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
                          {opened.evidence.length}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {opened.evidence.map((item) =>
                          item.href ? (
                            <a
                              key={item.href}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex min-h-28 flex-col justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 transition hover:-translate-y-0.5 hover:border-[#73e0c1]/50 hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-[#73e0c1]/60"
                            >
                              <div>
                                <span className="inline-flex rounded-md bg-[#ff6b8a] px-2 py-1 font-mono text-[9px] font-black tracking-[0.16em] text-[#11131a]">
                                  PDF
                                </span>
                                <p className="mt-2 text-sm font-black leading-5 text-[#fff7ea]">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-[11px] leading-4 text-white/55">
                                  {item.detail}
                                </p>
                              </div>
                              <span className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#73e0c1]">
                                View PDF
                              </span>
                            </a>
                          ) : (
                            <div
                              key={item.title}
                              className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3"
                            >
                              <p className="text-sm font-black text-[#fff7ea]">
                                {item.title}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-white/60">
                                {item.detail}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {opened.demoVideo ? (
                      <button
                        type="button"
                        onClick={() => setShowVideoModal(true)}
                        className="rounded-xl bg-[#e2484d] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#c9373d] focus:outline-none focus:ring-2 focus:ring-[#e2484d]/35"
                      >
                        View Demo
                      </button>
                    ) : null}

                    {opened.link ? (
                      <a
                        href={opened.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-black/15 bg-white/45 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#11131a] transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        View Project
                      </a>
                    ) : null}

                    {opened.presentation ? (
                      <a
                        href={opened.presentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-black/15 bg-white/45 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        View PowerPoint
                      </a>
                    ) : null}

                    {complete ? (
                      <>
                        <a
                          href="#projects"
                          className="rounded-xl border border-black/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em]"
                        >
                          View All Projects
                        </a>

                        <a
                          href="/Layan-Sabha-CV.pdf"
                          className="rounded-xl border border-black/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em]"
                        >
                          Download CV
                        </a>
                      </>
                    ) : null}
                  </div>

                  <p className="mt-5 text-xs font-bold text-black/40">
                    Press Esc or close to continue the level.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {showVideoModal && opened?.demoVideo ? (
            <div
              className="fixed inset-0 z-[200] grid place-items-center bg-[#070a10]/78 p-4 backdrop-blur-sm sm:p-6"
              onPointerDown={(event) => {
                if (event.target === event.currentTarget) {
                  setShowVideoModal(false);
                }
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="amanak-demo-title"
            >
              <div className="w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#11131a] text-[#fff7ea] shadow-[0_34px_130px_rgba(0,0,0,0.62)]">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                  <div>
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#73e0c1]">
                      Project demo
                    </p>
                    <h3 id="amanak-demo-title" className="mt-1 text-xl font-black sm:text-2xl">
                      Amanak
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.06] text-lg font-black transition hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label="Close Amanak demo"
                  >
                    X
                  </button>
                </div>

                <div className="p-3 sm:p-5">
                  <video
                    src={opened.demoVideo}
                    controls
                    playsInline
                    preload="metadata"
                    className="max-h-[68vh] w-full rounded-xl bg-black object-contain"
                  >
                    Your browser does not support the video element.
                  </video>

                  {opened.demoNote ? (
                    <p className="px-1 pb-1 pt-4 text-xs leading-6 text-white/58 sm:text-sm">
                      {opened.demoNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
