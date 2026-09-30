import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "subverse",
    title: "Subverse",
    period: {
      start: "01.2025",
    },
    link: "https://subverse.blear.in",
    skills: [
      "AI SaaS Product",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "AI Integrations",
    ],
    description: `AI-powered SaaS tool that tracks and manages recurring subscriptions and surfaces cost-optimization insights.
- AI-driven insight layer that flags redundant or underused subscriptions for cost savings`,
    isExpanded: true,
  },
  {
    id: "heavenverse",
    title: "Heavenverse",
    period: {
      start: "01.2025",
    },
    link: "https://heaven.blear.in",
    skills: [
      "Full-Stack Web Application",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    description: `Music streaming platform built end-to-end, from frontend architecture through API integration and deployment.
- Responsive, performance-focused UI in Next.js`,
  },
  {
    id: "konvexa",
    title: "Konvexa",
    period: {
      start: "01.2025",
    },
    link: "https://konvexa.blear.in",
    skills: ["Web Tool", "Next.js", "Node.js", "Tailwind CSS"],
    description:
      "Multi-format file conversion tool with a focus on performance and scalable architecture.",
  },
]
