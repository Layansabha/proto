export type GameMilestoneEvidence = {
  title: string;
  detail: string;
  href?: string;
};

export type GameMilestone = {
  id: number;
  number: string;
  title: string;
  shortLabel: string;
  type: "Education" | "Experience" | "Certification" | "Project" | "Goal";
  date: string;
  organization: string;
  x: number;
  y: number;
  description: string;
  skills: string[];
  status?: string;
  demoVideo?: string;
  demoNote?: string;
  link?: string;
  presentation?: string;
  evidence?: GameMilestoneEvidence[];
};

export const gameMilestones: GameMilestone[] = [
  {
    id: 1,
    number: "01",
    title: "Bachelor of Cyber Security",
    shortLabel: "Education",
    type: "Education",
    date: "2021–2025",
    organization: "Hashemite University",
    x: 380,
    y: 430,
    description:
      "The starting world: cybersecurity fundamentals, networking, systems, and secure development.",
    skills: ["Cybersecurity", "Networking", "Systems", "Secure development"],
  },
  {
    id: 2,
    number: "02",
    title: "Network Engineer Intern",
    shortLabel: "Network Internship",
    type: "Experience",
    date: "Aug 2022–Nov 2022",
    organization: "Internship",
    x: 900,
    y: 350,
    description:
      "Hands-on exposure to networking, troubleshooting, infrastructure basics, and real technical workflows.",
    skills: [
      "Networking",
      "Troubleshooting",
      "Infrastructure",
      "Network devices",
    ],
    evidence: [
      {
        title: "Introduction to Networks",
        detail: "Cisco Networking Academy | Completed 26 Nov 2022",
        href: "/assets/game/certs/1.pdf",
      },
      {
        title: "Enterprise Networking, Security & Automation",
        detail: "Cisco Networking Academy | Completed 12 Dec 2022",
        href: "/assets/game/certs/2.pdf",
      },
      {
        title: "Switching, Routing & Wireless Essentials",
        detail: "Cisco Networking Academy | Completed 12 Dec 2022",
        href: "/assets/game/certs/3.pdf",
      },
      {
        title: "Introduction to Networks",
        detail: "Cisco Networking Academy | Training certificate record",
        href: "/assets/game/certs/4.pdf",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Security+",
    shortLabel: "Security+",
    type: "Certification",
    date: "2023",
    organization: "Certification path",
    x: 1450,
    y: 430,
    description:
      "A security-focused checkpoint that strengthened my understanding of threats, defense, risk, and core security concepts.",
    skills: ["Security concepts", "Threats", "Risk", "Defensive thinking"],
  },
  {
    id: 4,
    number: "04",
    title: "Cyber Security Intern",
    shortLabel: "Security Internship",
    type: "Experience",
    date: "Jul 2024–Sep 2024",
    organization: "Internship",
    x: 1960,
    y: 320,
    description:
      "A practical security stage where theory started turning into real applied cybersecurity work.",
    skills: [
      "Security operations",
      "Vulnerability awareness",
      "Analysis",
      "Investigation",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Amanak",
    shortLabel: "Amanak",
    type: "Project",
    date: "2024",
    organization: "Project",
    x: 2500,
    y: 430,
    description:
      "Amanak is a full-stack cybercrime reporting mobile application designed for government-service use. It helps users report cybercrimes, track report status, browse awareness content, and access support features through an Android frontend connected to a Spring Boot backend and MySQL database.",
    skills: [
      "Android",
      "Java",
      "Spring Boot",
      "MySQL",
      "REST API",
      "Figma",
    ],
    status: "90% Complete",
    demoVideo: "/assets/game/certs/amanak.mp4",
    demoNote:
      "Amanak is designed to integrate with official government datasets. For demonstration and testing, it currently uses a realistic mock government dataset.",
    link: "https://github.com/Layansabha/amanak-fullstack",
  },
  {
    id: 6,
    number: "06",
    title: "DevOps Intern",
    shortLabel: "DevOps Internship",
    type: "Experience",
    date: "Mar 2025–Apr 2025",
    organization: "Internship",
    x: 3100,
    y: 350,
    description:
      "The stage where development connected with operations: Linux, deployment, automation, and delivery workflows.",
    skills: ["Linux", "Deployment", "CI/CD", "Automation"],
    evidence: [
      {
        title: "DevOps Internship Training",
        detail: "Official internship training certificate",
        href: "/assets/game/certs/ليان صبحا-شهادة تدريب.pdf",
      },
    ],
  },
  {
    id: 7,
    number: "07",
    title: "CCNA",
    shortLabel: "CCNA",
    type: "Certification",
    date: "2025",
    organization: "Cisco certification",
    x: 3650,
    y: 430,
    description:
      "A networking checkpoint that strengthened routing, switching, subnetting, and network troubleshooting fundamentals.",
    skills: ["Routing", "Switching", "Subnetting", "Network security"],
    evidence: [
      {
        title: "Cisco Certified Network Associate",
        detail: "Issued 30 Aug 2025 | Valid through 30 Aug 2028",
        href: "/assets/game/certs/Cisco Certified Network Associate certificate.pdf",
      },
    ],
  },
  {
    id: 8,
    number: "08",
    title: "DOM XSS ML",
    shortLabel: "DOM XSS ML",
    type: "Project",
    date: "2025",
    organization: "Machine Learning Security Project",
    x: 4200,
    y: 320,
    description:
      "An academic detection pipeline that classifies DOM-based XSS using structural DOM features and multiple machine learning models.",
    skills: [
      "DOM XSS",
      "Feature engineering",
      "Machine learning",
      "Model evaluation",
    ],
    link: "https://github.com/Layansabha/Dom-xss-ML",
    presentation:
      "https://1drv.ms/p/c/96dce14123ced02e/IQBX9nfeSpMaSLrUsLL3BSQtAUqRZswKKZp3o1fUSYqLJfI?e=b7Vgid",
  },
  {
    id: 9,
    number: "09",
    title: "Network & DevOps Path",
    shortLabel: "Network\n+ DevOps",
    type: "Goal",
    date: "Present",
    organization: "Career direction",
    x: 4850,
    y: 430,
    description:
      "Currently focused on opportunities in network engineering or DevOps, combining infrastructure, automation, troubleshooting, and secure delivery.",
    skills: ["Networking", "Linux", "CI/CD", "Automation", "Troubleshooting"],
  },
  {
    id: 10,
    number: "10",
    title: "Final Flag",
    shortLabel: "Finish",
    type: "Goal",
    date: "Now",
    organization: "Portfolio Route Complete",
    x: 5500,
    y: 350,
    description:
      "The finish line of the portfolio route. This marks the end of the current journey and the start of bigger goals in DevOps, DevSecOps, cloud, and engineering growth.",
    skills: ["DevOps", "DevSecOps", "Cloud", "Growth"],
  },
];
