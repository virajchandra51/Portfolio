# virajchandra.in

Personal site. Next.js 14 (app router) exported to static HTML and published on
Netlify. One repo, no CMS.

A postcard on a scene: a fixed illustrated backdrop with a paper card on top
that holds every page. Day and night are two paper stocks rather than an
inverted UI. Instrument Serif for display, DM Sans for everything else.

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
| card tagline, at-a-glance facts | `src/lib/site.ts`, `src/app/page.tsx` |
| palette, paper, scene | `src/app/globals.css` |
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

## The ambience

`./scripts/build-audio.sh` fetches four CC0 field recordings from Freesound and
processes them into loops: gentle rain on leaves, wind in trees, birds in light
rain, and one distant thunder strike. CC0 is a public domain dedication, so
there is nothing to honour; the credits in `public/audio/CREDITS.txt` and the
site footer are courtesy.

The script needs network and ffmpeg. The processed mp3s are committed, so a
deploy never runs it.

Two things in there are load-bearing and easy to break:

- The loop is built by opening the source twice and crossfading its tail back
  over its head. Doing the same with `asplit` starves the graph, and ffmpeg
  writes an empty file with only "No filtered frames for output stream" in the
  log.
- A filtergraph cannot contain literal newlines, so those strings stay on one
  line however long they get.

Playback lives in `src/lib/ambience.ts` (a Web Audio mixer) and
`src/components/SoundControl.tsx` (the button and sliders). Nothing is fetched
or decoded until someone asks for sound, because browsers block autoplay
anyway. The mix persists in localStorage.

## The scenes

Two backdrops, both public domain from the Art Institute of Chicago's open
access collection. Day is Cazin's *Landscape* (c. 1895), night is Whistler's
*Nocturne: Blue and Gold* (1872). Sources and links are in
`public/scenes/CREDITS.txt`; the credit in the site footer is courtesy, not
obligation, since neither has rights reserved.

To use different art, drop a file in `public/scenes/` and point the variables at
it in `src/app/globals.css` (day lives in `:root`, night in both the
`[data-theme="dark"]` block and the `prefers-color-scheme` copy):

```css
--scene-image: url("/scenes/day.jpg");
--scene-blur: 9px;                  /* how far back the art sits */
--scene-veil: rgba(28, 30, 20, 0.30);  /* how much is dimmed behind the card */
```

Do not use artwork you do not have the rights to. Museum open access
(artic.edu, metmuseum.org, rijksmuseum.nl) is the easy legal source; a site
having no licence notice means all rights reserved, not free to take.

## Deploying

Netlify builds with `npm run build` and publishes `out/` (see `netlify.toml`).
Nothing else to configure: there is no server runtime.

## TODO

- `src/lib/site.ts`: set `url` to the custom domain once bought, and fill in the
  Codeforces profile link.
- `src/lib/life.ts`: add the rest of the travel list.
- `content/writing/competitive-programming-journey.md`: finish it or delete it.
- Replace the placeholder scene, and the dashed postmark circle on the home
  card, with real art.
