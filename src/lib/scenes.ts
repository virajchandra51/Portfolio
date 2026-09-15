// The backdrops. Each is a public domain painting or print; sources are in
// public/scenes/CREDITS.txt. The scene is independent of day/night: the theme
// picks the paper stock, the scene picks what the paper is lying on.
export type Scene = {
  id: string;
  label: string;
  note: string;
  // A layered scene is drawn as parallax planes from these files, back to
  // front. A flat scene is a single --scene-image set in globals.css.
  layers?: string[];
};

export const SCENES: Scene[] = [
  {
    id: "forest",
    label: "Forest",
    note: "ansimuz, CC0",
    layers: [
      "/scenes/forest/1-back.png",
      "/scenes/forest/2-middle.png",
      "/scenes/forest/3-front.png",
      "/scenes/forest/4-lights.png",
    ],
  },
  {
    id: "snow",
    label: "Snowy summits",
    note: "CraftPix, OGA-BY",
    layers: [
      "/scenes/snow/1-back.png",
      "/scenes/snow/2-mid.png",
      "/scenes/snow/3-near.png",
      "/scenes/snow/4-front.png",
    ],
  },
  { id: "moonlit", label: "Moonlit river", note: "Hiroshige, 1835" },
  { id: "rain", label: "Rainy street", note: "Caillebotte, 1877" },
  { id: "mist", label: "Morning mist", note: "Hiroshige, 1833" },
  { id: "dusk", label: "Dusk", note: "Inness, 1891" },
];

export const DEFAULT_SCENE = "forest";
export const SCENE_KEY = "scene";

export function isScene(v: unknown): v is string {
  return typeof v === "string" && SCENES.some((s) => s.id === v);
}
