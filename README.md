# virajchandra.in

Personal site. Next.js 14 (app router) exported to static HTML and published on
Netlify. One repo, four pages, no CMS.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

## Where things live

| What | File |
|---|---|
| name, role line, email, social + profile links | `src/lib/site.ts` |
| work history, education, ratings, awards | `src/lib/data.ts` |
| projects page entries | `src/lib/projects.ts` |
| life page sections | `src/lib/life.ts` |
| "written elsewhere" list | `src/lib/posts.ts` |
| blog posts | `content/writing/*.md` |

Copy edits are data edits. You should almost never need to touch a component.

## Writing a post

Drop a markdown file in `content/writing/`:

```markdown
---
title: "the title, lowercase"
date: 2026-09-14
summary: "one line, shown in the list"
draft: false
---

Body in markdown.
```

`draft: true` keeps it off the site. It appears on `/writing` automatically,
newest first, at `/writing/<filename>`.

## Deploying

Netlify builds with `npm run build` and publishes `out/` (see `netlify.toml`).
Nothing else to configure: there is no server runtime.

## TODO

- `src/lib/site.ts`: set `url` to the custom domain once bought, and fill in the
  Codeforces profile link.
- `src/lib/life.ts`: add the rest of the travel list.
- `content/writing/competitive-programming-journey.md`: finish it or delete it.
