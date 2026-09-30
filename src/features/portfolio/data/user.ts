import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Shreyash",
  lastName: "Tailor",
  displayName: "Shreyash Tailor",
  username: "ShreyashTailor",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Creating with code. Small details matter.",
    "Design Engineer.",
    "Open source contributor.",
    "I own a vintage iPhone.",
  ],
  address: "Vadodara, IN",
  emailB64: "c2hyZXlhc2hAYmxlYXIuaW4=", // base64 encoded
  website: "https://blear.in",
  jobTitle: "Co-Founder | CTO",
  jobs: [
    {
      title: "CTO",
      company: "Alchasys",
      website: "https://alchasys.com",
      experienceId: "alchasys",
    },
    {
      title: "Co-Founder",
      company: "Blear",
      website: "https://blear.in",
      products: [{ name: "Plato", website: "https://plato.blear.in" }],
    },
  ],
  about: `- I’m Shreyash Tailor — a Next.js & shadcn/ui Specialist focused on scalable system design, modern frontend architecture, performance, and building production-ready web applications.
- Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted projects.
`,

  avatar: "/pfp.png",
  avatarSketch: "/pfp.png",
  // Lighting variants await art that matches the avatar, so all four point at
  // it for now (the avatar lights toggle is disabled in ProfileHeader).
  avatarVariants: {
    lightOff: "/pfp.png",
    lightOn: "/pfp.png",
    darkOff: "/pfp.png",
    darkOn: "/pfp.png",
  },
  ogImage: "/pfp.png",
  namePronunciationUrl: "", // Hides the pronounce-my-name button until a recording exists
  timeZone: "Asia/Kolkata",
  keywords: [
    "shreyash",
    "shreyash tailor",
    "shreyashtailor",
    "tailor shreyash",
    "shreyash tailor portfolio",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}
