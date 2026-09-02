export type LifeSection = { title: string; body: string[]; tags?: string[] };

export const life: LifeSection[] = [
  {
    title: "travelling",
    body: [
      "i like landing somewhere with a rough idea and working the rest out on the ground. the parts of a place you remember are never the parts you planned.",
      "sri lanka and vietnam are the two that have stuck with me most so far.",
      // TODO: add the other trips you want listed, and drop a line or two you
      // actually remember from sri lanka and vietnam. specifics beat adjectives.
    ],
    tags: ["sri lanka", "vietnam"],
  },
  {
    title: "teaching",
    body: [
      "teaching is not a side project for me. between dbugger in college and nearly three years at tle eliminators, explaining a problem badly and then explaining it better is most of how i learned to think clearly.",
      "the post-contest discussions are the format i enjoy most: a problem everyone just failed at, live, with no time to pretend the solution was obvious.",
    ],
  },
  {
    title: "music",
    body: [
      "i sing, and i play more or less anything with strings on it. picked up early and never really put it down.",
      "the discipline transfers more than you would expect. so does knowing immediately when something is wrong.",
    ],
  },
  {
    title: "sport and geopolitics",
    body: [
      "football and lawn tennis, mostly watched, occasionally played.",
      "geopolitics is my long-running rabbit hole. reading how a decision made in one capital shows up three years later somewhere else scratches the same itch as reading a system trace.",
    ],
  },
  {
    title: "building small things",
    body: [
      "most of my github is small, finished experiments: three.js scenes, browser games, a cricket address book written in bash, a background tracking app for field employees. fikar came out of the same habit and is the first one people who are not me actually use.",
      "i would rather ship something 2 mb and complete than something ambitious and unfinished.",
    ],
  },
];
