export type Project = {
  name: string;
  tagline: string;
  period: string;
  stack: string[];
  body: string[];
  links: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    name: "fikar",
    tagline: "a pixel-art desi maa who worries about you from your menu bar",
    period: "2026",
    stack: ["swift", "swiftui", "appkit", "windows"],
    body: [
      "a tiny macos menu bar app where a pixel-art maa walks onto your screen and nags you about paani, khaana, neend, breaks and the charger, plus one daily nudge to call your actual mother. ignore her and she escalates. keep ignoring her and she stops speaking to you.",
      "seven reminders, three moods, an escalation ladder that ends in the silent treatment. under 2 mb installed, and nothing about you leaves your machine. the sprite is my real mom, with her blessing.",
    ],
    links: [{ label: "fikar.app", url: "https://fikar.app" }],
  },
  {
    name: "tle cp-31",
    tagline: "editorial solutions for tle's cp-31 sheet",
    period: "2024 - present",
    stack: ["c++"],
    body: [
      "worked solutions to tle eliminators' cp-31 sheet, the sheet most people use as their first structured pass through competitive programming. my most used piece of work by a distance: 66 stars and a steady stream of people reading it to get unstuck.",
      "a companion repo covers the cses problem set the same way.",
    ],
    links: [
      { label: "cp-31", url: "https://github.com/virajchandra51/TLE_CP_31" },
      { label: "cses", url: "https://github.com/virajchandra51/TLE_CSES" },
    ],
  },
  {
    name: "medivault",
    tagline: "electronic health records on ethereum",
    period: "2023",
    stack: ["solidity", "truffle", "ganache", "metamask", "react"],
    body: [
      "a blockchain-backed ehr system for storing and retrieving patient health records on a decentralized database, with separate patient and doctor identities and secure record sharing between them.",
      "gas contracts ran against ganache through metamask, with simulations for the full backend flow.",
    ],
    links: [
      { label: "github", url: "https://github.com/virajchandra51/MediVault" },
    ],
  },
  {
    name: "visionary",
    tagline: "mouse control driven entirely by your eyes",
    period: "2023",
    stack: ["python", "pyside6", "mediapipe", "opencv"],
    body: [
      "face and iris matrix estimation turned into a full pointer: cursor movement plus left and right clicks, all from where a person is looking. built for people with limited mobility or paralysis, where a hand on a mouse is not an option.",
      "shipped as a bundled download with a plain-language guide to how it works. won vigyaan at aavartan 2023.",
    ],
    links: [
      { label: "github", url: "https://github.com/virajchandra51/Visionary" },
    ],
  },
  {
    name: "abhaybooks",
    tagline: "ecommerce for a national book supply chain",
    period: "2023",
    stack: ["react", "framer motion", "node", "php", "apache"],
    body: [
      "a full stack storefront for a national book distributor, freelance. react on the front, a php backend i integrated against and then maintained.",
      "self-hosted on a shared ubuntu box, tuned to 96+ on chrome lighthouse. ran at roughly 100 users a day.",
    ],
    links: [
      { label: "github", url: "https://github.com/virajchandra51/Abhay_Books" },
    ],
  },
  {
    name: "codeutsava 8.0",
    tagline: "site and browser game for nit raipur's coding fest",
    period: "2023",
    stack: ["react", "three.js", "gsap", "firebase", "vanilla js"],
    body: [
      "the full stack site for codeutsava, the annual coding fest at nit raipur, with three.js and gsap doing the heavy lifting on feel.",
      "also built a 2d browser game inside it in plain javascript, no engine or library: collision detection, sprite animation and grid movement written from scratch. firebase and google sheets held applicant data through a fest week of 100+ daily users.",
    ],
    links: [
      {
        label: "codeutsava 6.0",
        url: "https://github.com/virajchandra51/CodeUtsava6.0",
      },
    ],
  },
  {
    name: "academia alert",
    tagline: "announcements app for nit raipur",
    period: "2023",
    stack: ["react native", "javascript"],
    body: [
      "an android app that pushed upcoming events and college news to students, so notices stopped living only on a noticeboard nobody walked past.",
    ],
    links: [
      {
        label: "github",
        url: "https://github.com/virajchandra51/Academia_Alert",
      },
    ],
  },
  {
    name: "dbugger",
    tagline: "a tutoring platform for the batch below mine",
    period: "2022",
    stack: ["html", "css", "javascript", "figma"],
    body: [
      "a mentoring and teaching platform built for the sophomore batch at nit raipur, covering dsa and web development with quizzes and tutorials. mentored 20+ students through it and wrote the content myself.",
      "the first time teaching became the point rather than a side effect, which is a straight line to the tle work.",
    ],
    links: [
      { label: "github", url: "https://github.com/virajchandra51/Dbugger" },
    ],
  },
];
