export type GameMilestone = {
  id: number;
  number: string;
  title: string;
  type: "Education" | "Experience" | "Certification" | "Project" | "Goal";
  date: string;
  organization: string;
  x: number;
  y: number;
  description: string;
  skills: string[];
};

export const gameMilestones: GameMilestone[] = [
  {
    id: 1,
    number: "01",
    title: "Bachelor of Cyber Security",
    type: "Education",
    date: "2021–2025",
    organization: "Hashemite University",
    x: 180,
    y: 150,
    description:
      "Built a strong foundation in cybersecurity, networking, systems thinking, and secure development.",
    skills: ["Cybersecurity", "Networking", "Systems", "Secure development"],
  },
  {
    id: 2,
    number: "02",
    title: "Network Engineer Intern",
    type: "Experience",
    date: "Aug 2022–Nov 2022",
    organization: "Internship",
    x: 390,
    y: 135,
    description:
      "Gained hands-on experience in infrastructure, troubleshooting, and real networking workflows.",
    skills: ["Networking", "Troubleshooting", "Infrastructure"],
  },
  {
    id: 3,
    number: "03",
    title: "Security+ and CCNA",
    type: "Certification",
    date: "2023 / 2025",
    organization: "Certification path",
    x: 620,
    y: 150,
    description:
      "Strengthened core security and networking fundamentals through structured certification study.",
    skills: ["CCNA", "Security+", "Network security"],
  },
  {
    id: 4,
    number: "04",
    title: "Cyber Security Intern",
    type: "Experience",
    date: "Jul 2024–Sep 2024",
    organization: "Internship",
    x: 530,
    y: 300,
    description:
      "Moved from theory into applied cybersecurity work and defensive thinking.",
    skills: ["Security operations", "Vulnerability awareness", "Analysis"],
  },
  {
    id: 5,
    number: "05",
    title: "Amanak",
    type: "Project",
    date: "2024",
    organization: "Project",
    x: 250,
    y: 330,
    description:
      "A project milestone centered on secure system thinking and practical delivery.",
    skills: ["Web security", "Backend logic", "Problem solving"],
  },
  {
    id: 6,
    number: "06",
    title: "DevOps Intern",
    type: "Experience",
    date: "Mar 2025–Apr 2025",
    organization: "Internship",
    x: 485,
    y: 455,
    description:
      "Connected development with operations through Linux, deployment, and automation practices.",
    skills: ["Linux", "Deployment", "CI/CD", "Automation"],
  },
  {
    id: 7,
    number: "07",
    title: "TRIO",
    type: "Project",
    date: "2025",
    organization: "Project",
    x: 680,
    y: 475,
    description:
      "A full-stack project that combined frontend, backend, integration, and thoughtful UI decisions.",
    skills: ["Frontend", "Backend", "Integration"],
  },
  {
    id: 8,
    number: "08",
    title: "Full Stack Engineer",
    type: "Experience",
    date: "Dec 2025–Present",
    organization: "Current role",
    x: 300,
    y: 620,
    description:
      "Building production-ready features across frontend and backend while growing toward secure delivery.",
    skills: ["APIs", "Production features", "Frontend", "Backend"],
  },
  {
    id: 9,
    number: "09",
    title: "Current Direction",
    type: "Goal",
    date: "Now",
    organization: "DevOps / DevSecOps Route",
    x: 620,
    y: 650,
    description:
      "The next step: automation, cloud reliability, and secure delivery at scale.",
    skills: ["Cloud", "DevOps", "DevSecOps", "Reliability"],
  },
];
