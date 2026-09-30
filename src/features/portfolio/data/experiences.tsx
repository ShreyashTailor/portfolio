import {
  BoxIcon,
  Building2Icon,
  CodeXmlIcon,
  LightbulbIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "alchasys",
    companyName: "Alchasys",
    companyIcon: <Building2Icon strokeWidth={1.8} />,
    companyWebsite: "https://alchasys.com",
    location: "Vadodara, IN",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "CTO",
        employmentPeriod: {
          start: "01.2026",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Lead engineering and design for the Alchasys product.
- Own the design system and component library, from Figma to production-ready React.
- Ship and maintain features across the marketing site and app.`,
        skills: [
          "TypeScript",
          "Next.js",
          "Tailwind CSS",
          "shadcn/registry",
          "Figma",
          "Design System",
          "Design",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "blear",
    companyName: "Blear",
    companyIcon: <Building2Icon strokeWidth={1.8} />,
    companyWebsite: "https://blear.in",
    location: "Vadodara, IN",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Co-Founder",
        employmentPeriod: {
          start: "03.2024",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        skills: ["Business Ownership"],
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "beap",
    companyName: "BEAP",
    companyIcon: <BoxIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "1",
        title: "Co-Founder",
        employmentPeriod: {
          start: "2023",
        },
        icon: <CodeXmlIcon />,
        description: `- Contributed to open-source hosting and Linux ecosystem tooling used by other developers.
- Collaborated with a distributed contributor base on community-driven development.`,
        skills: ["Open Source", "Linux", "Hosting", "Community"],
      },
    ],
  },
]
