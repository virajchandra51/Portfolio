// The backdrops. Each is a public domain painting or print; sources are in
// public/scenes/CREDITS.txt. The scene is independent of day/night: the theme
// picks the paper stock, the scene picks what the paper is lying on.
export type SceneMix = {
  rain: number;
  leaves: number;
  water: number;
  thunder: boolean;
};

export type Scene = {
  id: string;
  label: string;
  note: string;
  // One line of mood, shown under the name in the picker.
  mood: string;
  // Every scene sounds like itself. The same three loops are always playing;
  // only their levels change, so switching scene is a fade, not a reload.
  mix: SceneMix;
  // A layered scene is drawn as parallax planes from these files, back to
  // front. A flat scene is a single --scene-image set in globals.css.
  layers?: string[];
  // "pixel" (default) tiles the plane horizontally and drifts it, which is
  // right for a repeating pixel-art strip. "smooth" is for a single wide
  // illustration: no tiling, no auto-drift, just the pointer parallax, so a
  // non-repeating image never shows its own seam or its edge.
  render?: "pixel" | "smooth";
  // Doubles the drift speed on every plane, for a scene where the view is
  // meant to be passing by rather than just breathing.
  fast?: boolean;
  // Draws an original CSS window frame over the planes: no image asset, just
  // borders and gradients in globals.css. See .train-frame.
  frame?: "train-window";
};

export const SCENES: Scene[] = [
  {
    id: "forest",
    label: "Forest",
    note: "ansimuz, CC0",
    mood: "Warm and close",
    mix: { rain: 0.45, leaves: 0.75, water: 0.12, thunder: false },
    layers: [
      "/scenes/forest/1-back.png",
      "/scenes/forest/2-middle.png",
      "/scenes/forest/3-front.png",
      "/scenes/forest/4-lights.png",
    ],
  },
  {
    id: "train",
    label: "Snow train",
    note: "CraftPix layers, original frame",
    mood: "Watching it go by",
    // No train recording exists among the licensed loops, so this leans on
    // wind rather than pretending there is one. Honest approximation, not a
    // real train sound.
    mix: { rain: 0, leaves: 0.4, water: 0, thunder: false },
    fast: true,
    frame: "train-window",
    layers: [
      "/scenes/snow/1-back.png",
      "/scenes/snow/2-mid.png",
      "/scenes/snow/3-near.png",
      "/scenes/snow/4-front.png",
    ],
  },
  { id: "moonlit", label: "Moonlit river", note: "Hiroshige, 1835" , mood: "Moon on the water" , mix: { rain: 0, leaves: 0.3, water: 0.7, thunder: false } },
  {
    id: "underwater",
    label: "Underwater cave",
    note: "CraftPix, OGA-BY",
    mood: "Below the surface",
    mix: { rain: 0, leaves: 0, water: 0.85, thunder: false },
    render: "smooth",
    layers: [
      "/scenes/underwater/1-layer.png",
      "/scenes/underwater/2-layer.png",
      "/scenes/underwater/3-layer.png",
      "/scenes/underwater/4-layer.png",
      "/scenes/underwater/5-layer.png",
      "/scenes/underwater/6-layer.png",
    ],
  },
];

export const DEFAULT_SCENE = "forest";
export const SCENE_KEY = "scene";

export const thumbFor = (id: string) => `/scenes/thumbs/${id}.jpg`;

export function isScene(v: unknown): v is string {
  return typeof v === "string" && SCENES.some((s) => s.id === v);
}
