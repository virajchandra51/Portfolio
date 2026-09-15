// The backdrops. Each is a public domain painting or print; sources are in
// public/scenes/CREDITS.txt. The scene is independent of day/night: the theme
// picks the paper stock, the scene picks what the paper is lying on.
export type Scene = {
  id: string;
  label: string;
  note: string;
};

export const SCENES: Scene[] = [
  { id: "moonlit", label: "Moonlit river", note: "Hiroshige, 1835" },
  { id: "rain", label: "Rainy street", note: "Caillebotte, 1877" },
  { id: "mist", label: "Morning mist", note: "Hiroshige, 1833" },
  { id: "dusk", label: "Dusk", note: "Inness, 1891" },
];

export const DEFAULT_SCENE = "moonlit";
export const SCENE_KEY = "scene";

export function isScene(v: unknown): v is string {
  return typeof v === "string" && SCENES.some((s) => s.id === v);
}
