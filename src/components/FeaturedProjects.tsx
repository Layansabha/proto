import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type DetailKey = "amanak-case-study" | "amanak-architecture" | "dom-methodology";

type ProjectAction = {
  label: string;
  href?: string;
  detail?: DetailKey;
  primary?: boolean;
};

type FeaturedProject = {
  title: string;
  category: string;
  description: string;
  status?: string;
  stack: string[];
  surface: string;
  muted: string;
  actions: ProjectAction[];
};

const projects: FeaturedProject[] = [
  {
    title: "Amanak",
    category: "Full-stack mobile security",
    description: "Android frontend + Spring Boot backend + MySQL + dataset logic.",
    status: "90% Complete",
    stack: ["Android", "Java", "Spring Boot", "MySQL", "REST API", "Figma"],
    surface: "border-black/10 bg-[#fff7ea] text-[#11131a]",
    muted: "text-black/55",
    actions: [
      { label: "View Case Study", detail: "amanak-case-study", primary: true },
      { label: "GitHub Repo", href: "https://github.com/Layansabha/amanak-fullstack" },
      { label: "Live Demo / API", href: "https://layansabha.github.io/amanak-fullstack/" },
      { label: "Architecture", detail: "amanak-architecture" },
    ],
  },
  {
    title: "DOM XSS ML",
    category: "Machine learning security",
    description: "DOM-based XSS detection using machine learning.",
    stack: ["Python", "DOM XSS", "Feature Engineering", "Model Evaluation"],
    surface: "border-[#9fb7d3]/35 bg-[#dfe8f2] text-[#11131a]",
    muted: "text-black/55",
    actions: [
      { label: "GitHub", href: "https://github.com/Layansabha/Dom-xss-ML", primary: true },
      {
        label: "Presentation",
        href: "https://1drv.ms/p/c/96dce14123ced02e/IQBX9nfeSpMaSLrUsLL3BSQtAUqRZswKKZp3o1fUSYqLJfI?e=b7Vgid",
      },
      { label: "Methodology", detail: "dom-methodology" },
    ],
  },
  {
    title: "DevOps / Deployment Portfolio",
    category: "Technical proof",
    description: "This portfolio is deployed through GitHub Actions CI/CD to GitHub Pages.",
    stack: ["GitHub Actions", "CI/CD", "Vite", "GitHub Pages"],
    surface: "border-[#73e0c1]/20 bg-[#14231f] text-[#fff8ee]",
    muted: "text-white/58",
    actions: [
      {
        label: "View Workflow",
        href: "https://github.com/Layansabha/proto/blob/main/.github/workflows/deploy.yml",
        primary: true,
      },
      { label: "View Repo", href: "https://github.com/Layansabha/proto" },
      { label: "View Live Site", href: "https://layansabha.github.io/proto/" },
    ],
  },
];

const detailContent: Record<
  DetailKey,
  {
    eyebrow: string;
    title: string;
    intro: string;
    sections: { title: string; body: string }[];
  }
> = {
  "amanak-case-study": {
    eyebrow: "Amanak case study",
    title: "A reporting flow designed around clarity and trust.",
    intro:
      "Amanak is a full-stack cybercrime reporting mobile application designed for government-service use.",
    sections: [
      {
        title: "User experience",
        body: "Users can submit cybercrime reports, follow report status, browse awareness content, and reach support features from an Android interface.",
      },
      {
        title: "System implementation",
        body: "The Android client communicates with a Spring Boot REST API backed by MySQL, keeping mobile flows, business logic, and persistence clearly separated.",
      },
      {
        title: "Data scope",
        body: "The system is designed to integrate with official government datasets. Its current demonstration uses a realistic mock government dataset for testing.",
      },
    ],
  },
  "amanak-architecture": {
    eyebrow: "Amanak architecture",
    title: "Android to API to structured data.",
    intro:
      "The project uses a layered full-stack architecture that keeps the client, service layer, and data store independently understandable.",
    sections: [
      {
        title: "Client",
        body: "Android and Java provide the reporting, status, awareness, and support interfaces designed in Figma.",
      },
      {
        title: "Service layer",
        body: "Spring Boot exposes REST endpoints and handles validation, reporting workflows, status updates, and application logic.",
      },
      {
        title: "Persistence and integration",
        body: "MySQL stores application data, while the dataset layer is prepared for official integrations and currently runs against realistic mock records.",
      },
    ],
  },
  "dom-methodology": {
    eyebrow: "DOM XSS ML methodology",
    title: "Detecting browser-side risk through structural signals.",
    intro:
      "The project treats DOM-based XSS detection as a supervised classification workflow rather than a payload-injection exercise.",
    sections: [
      {
        title: "Prepare",
        body: "DOM samples are cleaned, normalized, filtered, and split into training, validation, and test sets.",
      },
      {
        title: "Represent",
        body: "Important DOM tokens and structural patterns are converted into numerical feature vectors for model training.",
      },
      {
        title: "Compare",
        body: "LightGBM, XGBoost, AdaBoost, Decision Tree, Random Forest, and MLP models are trained and evaluated to compare classification performance.",
      },
    ],
  },
};

export default function FeaturedProjects() {
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);

  useEffect(() => {
    if (!activeDetail) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDetail(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeDetail]);

  const detail = activeDetail ? detailContent[activeDetail] : null;

  return (
    <section id="projects" className="bg-[#f1ece4] px-4 py-14 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#e2484d]">
              Selected work
            </p>
            <h2 className="mt-3 text-4xl font-black leading-none text-[#11131a] sm:text-5xl">
              Featured Projects
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-black/55">
            Security, software, and deployment work with inspectable technical proof.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06 }}
              className={`flex min-h-[390px] flex-col rounded-lg border p-5 shadow-[0_20px_70px_rgba(17,19,26,0.1)] ${project.surface}`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] ${project.muted}`}>
                  {project.category}
                </p>
                {project.status ? (
                  <span className="shrink-0 rounded-full border border-[#e2484d]/20 bg-[#e2484d]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#b72f36]">
                    {project.status}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-5 text-3xl font-black leading-tight">{project.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${project.muted}`}>{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-current/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                {project.actions.map((action) => {
                  const className = action.primary
                    ? "rounded-md bg-[#e2484d] px-3.5 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:bg-[#c9373d] focus:outline-none focus:ring-2 focus:ring-[#e2484d]/35"
                    : "rounded-md border border-current/15 bg-white/10 px-3.5 py-2.5 text-[10px] font-black uppercase tracking-[0.1em] transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-current/20";

                  return action.href ? (
                    <a
                      key={action.label}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {action.label}
                    </a>
                  ) : (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => action.detail && setActiveDetail(action.detail)}
                      className={className}
                    >
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {detail ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] grid place-items-center bg-[#080b11]/76 p-4 backdrop-blur-sm"
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) setActiveDetail(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="featured-detail-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-[#fff7ea] text-[#11131a] shadow-[0_32px_120px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-black/10 bg-[#11131a] px-5 py-4 text-[#fff7ea] sm:px-7">
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#73e0c1]">
                    {detail.eyebrow}
                  </p>
                  <h3 id="featured-detail-title" className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
                    {detail.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDetail(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/12 bg-white/[0.06] font-black transition hover:bg-white/[0.12]"
                  aria-label="Close project details"
                >
                  X
                </button>
              </div>

              <div className="p-5 sm:p-7">
                <p className="max-w-2xl text-sm leading-7 text-black/65">{detail.intro}</p>
                <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
                  {detail.sections.map((section) => (
                    <div key={section.title} className="grid gap-2 py-5 sm:grid-cols-[150px_1fr] sm:gap-5">
                      <h4 className="text-sm font-black">{section.title}</h4>
                      <p className="text-sm leading-7 text-black/62">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
