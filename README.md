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

Four backdrops, switchable from the control at the top left, all public domain
from the Art Institute of Chicago's open access collection:

| id | work |
|---|---|
| `moonlit` | Hiroshige, *No. 32: Seba*, c. 1835 |
| `rain` | Caillebotte, *Paris Street; Rainy Day*, 1877 |
| `mist` | Hiroshige, *Mishima: Morning Mist*, c. 1833 |
| `dusk` | Inness, *Moonrise*, 1891 |

Scene and theme are separate axes: the theme picks the paper stock, the scene
picks what the paper lies on. The choice persists in localStorage and is applied
before first paint by the inline script in `layout.tsx`.

To add one: drop the image in `public/scenes/`, add a row to `SCENES` in
`src/lib/scenes.ts`, add a `:root[data-scene="<id>"]` block in `globals.css`,
and add the id to the allow-list in the pre-paint script. Tune `--scene-veil`
per image, because a pale print needs more dimming than a dark painting for the
card to stay readable.

Woodblock prints work better than photographs here: flat colour and strong
composition survive being blurred, where a photo turns to mush. Note that every
print carries a white paper margin, which is why `.scene-art` zooms past it.

Do not use artwork you do not have the rights to. Museum open access
(artic.edu, metmuseum.org, rijksmuseum.nl) is the easy legal source; a site
having no licence notice means all rights reserved, not free to take. The AIC
IIIF endpoint returns 403 without a User-Agent header.

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
