export type Role = {
  org: string;
  title: string;
  period: string;
  url?: string;
  points: string[];
};

export const roles: Role[] = [
  {
    org: "google",
    title: "software engineer ii",
    period: "jul 2025 - present",
    url: "https://about.google/",
    points: [
      "started on home history for the google home app, then moved to monetization infrastructure, building shared infra that products like google health and payments run on.",
      "architected an mcp-based agent wired to gemini that generates metadata and powers data discovery across 120+ internal tables. top-5 retrieval accuracy went from 31% to 93%.",
      "led a backend migration of the query-parsing system behind a conversational assistant, fixing a signal loss that was causing 20% semantic drift and bringing it down to 2%.",
      "designed a conditional iam authorization model to protect a data ingestion pipeline from unauthorized external writes.",
      "built scheduling and ingest logic for premium subscription features on a consumer health platform. the placement became the second highest converting surface app-wide: 3,800+ conversions off 175k+ impressions.",
      "set up automated end-to-end performance testing and alerting for a core platform service, so latency regressions get caught before production.",
      "ran a 6-part company-wide ai workshop series teaching 50+ engineers to build and deploy their own agents.",
    ],
  },
  {
    org: "tle eliminators",
    title: "educator, product and operations",
    period: "dec 2023 - present",
    url: "https://www.tle-eliminators.com/",
    points: [
      "lead product and operations.",
      "teach competitive programming to a base of 10,000+ students, across codeforces, codechef and atcoder, including the tle prime cohort.",
      "taken 200+ lectures and post-contest discussions.",
      "wrote 200+ editorial solutions, covering the cp-31 sheet and the cses problem set.",
    ],
  },
  {
    org: "google",
    title: "swe intern, home wifi",
    period: "may 2024 - aug 2024",
    points: [
      "worked on the internal tool that unpacks diagnostic reports from google wifi devices.",
      "built the upload flow for diagnostic reports, handling files over 150 mb, fully unit tested.",
      "built the viewer for report contents, whether freshly uploaded or already in the database.",
    ],
  },
];

export const education = [
  {
    school: "national institute of technology, raipur",
    detail: "b.tech, information technology · 9.18/10",
    period: "2021 - 2025",
  },
  {
    school: "spring dale college, lucknow",
    detail: "cisce xii · 97.8% · icse x · 97.2%",
    period: "2019 - 2021",
  },
];

export const responsibilities = [
  {
    title: "convener, training and placement office",
    org: "nit raipur",
    period: "jul 2023 - 2025",
  },
  {
    title: "overall coordinator, turing club of programmers",
    org: "nit raipur",
    period: "apr 2022 - 2025",
  },
];

export const ratings = [
  { platform: "codeforces", detail: "expert, max 1740" },
  { platform: "codechef", detail: "5 star, division 1, max 2028" },
  { platform: "leetcode", detail: "guardian, 2339, global rank 2.4k" },
];

export const achievements = [
  "icpc 2023 regionalist at the kanpur site. team rank 69 of the 100 teams that made it onsite.",
  "icpc 2023 preliminaries, team rank 343 of 1500, out of 4500 teams that entered.",
  "best contest finishes: codechef starters 66 div2 global rank 99, leetcode biweekly 101 global rank 467, codeforces edu round 149 div2 global rank 746.",
  "1500+ problems solved across platforms.",
  "finalist at smart india hackathon 2023, 1000+ teams.",
  "winner of vigyaan, aavartan 2023, the national tech exhibition at nit raipur.",
];
