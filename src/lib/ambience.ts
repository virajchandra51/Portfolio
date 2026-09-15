// A small Web Audio mixer for the ambience.
//
// Browsers refuse to start audio without a gesture, so nothing is fetched or
// decoded until the visitor asks for sound. After that, three loops play
// continuously behind their own gain nodes and the scene only changes their
// levels, so switching scene is a fade rather than a reload. Thunder is a one
// shot on a random timer, and only in scenes that want it.
import type { SceneMix } from "@/lib/scenes";

export type LayerName = "rain" | "leaves" | "water";

const FILES: Record<LayerName, string> = {
  rain: "/audio/rain.mp3",
  leaves: "/audio/leaves.mp3",
  water: "/audio/water.mp3",
};

const THUNDER_FILE = "/audio/thunder.mp3";
const MASTER_KEY = "ambience-master";
export const DEFAULT_MASTER = 0.6;

export function loadMaster(): number {
  try {
    const raw = localStorage.getItem(MASTER_KEY);
    const n = raw === null ? NaN : Number(raw);
    return Number.isFinite(n) ? clamp(n) : DEFAULT_MASTER;
  } catch {
    return DEFAULT_MASTER;
  }
}

export function saveMaster(v: number) {
  try {
    localStorage.setItem(MASTER_KEY, String(v));
  } catch {
    // Storage blocked. The level just will not survive a reload.
  }
}

function clamp(v: number) {
  return Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));
}

export class Ambience {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private gains = new Map<LayerName, GainNode>();
  private thunderBuffer: AudioBuffer | null = null;
  private thunderTimer: number | null = null;
  private mix: SceneMix;
  private masterLevel: number;

  constructor(mix: SceneMix, masterLevel: number) {
    this.mix = { ...mix };
    this.masterLevel = masterLevel;
  }

  get running() {
    return this.ctx !== null && this.ctx.state === "running";
  }

  // Must be called from a user gesture.
  async start() {
    if (this.ctx) {
      await this.ctx.resume();
      this.scheduleThunder();
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = this.masterLevel;
    master.connect(ctx.destination);
    this.master = master;

    const names = Object.keys(FILES) as LayerName[];
    const buffers = await Promise.all(
      names.map((n) => fetchBuffer(ctx, FILES[n]))
    );

    names.forEach((name, i) => {
      const buffer = buffers[i];
      if (!buffer) return;
      const gain = ctx.createGain();
      gain.gain.value = this.mix[name];
      gain.connect(master);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      src.connect(gain);
      src.start();
      this.gains.set(name, gain);
    });

    this.thunderBuffer = await fetchBuffer(ctx, THUNDER_FILE);
    this.scheduleThunder();
  }

  // Called when the scene changes. Fades every layer to the new levels.
  setSceneMix(mix: SceneMix) {
    this.mix = { ...mix };
    const ctx = this.ctx;
    if (!ctx) return;
    (Object.keys(FILES) as LayerName[]).forEach((name) => {
      const gain = this.gains.get(name);
      if (gain) gain.gain.setTargetAtTime(this.mix[name], ctx.currentTime, 0.5);
    });
    this.scheduleThunder();
  }

  setMaster(value: number) {
    this.masterLevel = clamp(value);
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(
        this.masterLevel,
        this.ctx.currentTime,
        0.08
      );
    }
  }

  private scheduleThunder() {
    if (this.thunderTimer !== null) window.clearTimeout(this.thunderTimer);
    this.thunderTimer = null;
    if (!this.mix.thunder) return;
    const wait = 26000 + Math.random() * 60000;
    this.thunderTimer = window.setTimeout(() => {
      this.playThunder();
      this.scheduleThunder();
    }, wait);
  }

  private playThunder() {
    const ctx = this.ctx;
    const buffer = this.thunderBuffer;
    if (!ctx || !buffer || !this.master || !this.mix.thunder) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = 0.35 + this.mix.rain * 0.4;
    src.connect(gain);
    gain.connect(this.master);
    src.start();
  }

  async suspend() {
    if (this.thunderTimer !== null) window.clearTimeout(this.thunderTimer);
    this.thunderTimer = null;
    await this.ctx?.suspend();
  }

  destroy() {
    if (this.thunderTimer !== null) window.clearTimeout(this.thunderTimer);
    this.ctx?.close();
    this.ctx = null;
  }
}

async function fetchBuffer(ctx: AudioContext, url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await ctx.decodeAudioData(await res.arrayBuffer());
  } catch {
    return null;
  }
}
