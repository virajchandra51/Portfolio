// A small Web Audio mixer for the ambience.
//
// Browsers refuse to start audio without a gesture, so nothing is fetched or
// decoded until the visitor actually asks for sound. After that, each layer is
// a looping buffer behind its own gain node, and thunder is a one shot fired on
// a random timer.

export type LayerName = "rain" | "wind" | "music";

export type Mix = Record<LayerName | "master", number>;

export const DEFAULT_MIX: Mix = {
  master: 0.55,
  rain: 0.7,
  wind: 0.35,
  music: 0,
};

const FILES: Record<LayerName, string> = {
  rain: "/audio/rain.mp3",
  wind: "/audio/wind.mp3",
  music: "/audio/pad.mp3",
};

const THUNDER_FILE = "/audio/thunder.mp3";
const STORAGE_KEY = "ambience-mix";

export function loadMix(): Mix {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_MIX };
    const parsed = JSON.parse(raw) as Partial<Mix>;
    return {
      master: clamp(parsed.master ?? DEFAULT_MIX.master),
      rain: clamp(parsed.rain ?? DEFAULT_MIX.rain),
      wind: clamp(parsed.wind ?? DEFAULT_MIX.wind),
      music: clamp(parsed.music ?? DEFAULT_MIX.music),
    };
  } catch {
    return { ...DEFAULT_MIX };
  }
}

export function saveMix(mix: Mix) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mix));
  } catch {
    // Storage blocked. The mix just will not survive a reload.
  }
}

function clamp(v: number) {
  return Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));
}

export class Ambience {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private gains = new Map<LayerName, GainNode>();
  private sources = new Map<LayerName, AudioBufferSourceNode>();
  private thunderBuffer: AudioBuffer | null = null;
  private thunderTimer: number | null = null;
  private mix: Mix;

  constructor(mix: Mix) {
    this.mix = { ...mix };
  }

  get started() {
    return this.ctx !== null;
  }

  // Must be called from a user gesture.
  async start() {
    if (this.ctx) {
      await this.ctx.resume();
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = this.mix.master;
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
      this.sources.set(name, src);
    });

    this.thunderBuffer = await fetchBuffer(ctx, THUNDER_FILE);
    this.scheduleThunder();
  }

  setLayer(name: LayerName, value: number) {
    this.mix[name] = clamp(value);
    const gain = this.gains.get(name);
    if (gain && this.ctx) {
      gain.gain.setTargetAtTime(this.mix[name], this.ctx.currentTime, 0.08);
    }
  }

  setMaster(value: number) {
    this.mix.master = clamp(value);
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.mix.master, this.ctx.currentTime, 0.08);
    }
  }

  getMix(): Mix {
    return { ...this.mix };
  }

  // Thunder only makes sense under rain, and only now and then.
  private scheduleThunder() {
    if (this.thunderTimer !== null) window.clearTimeout(this.thunderTimer);
    const wait = 28000 + Math.random() * 62000;
    this.thunderTimer = window.setTimeout(() => {
      this.playThunder();
      this.scheduleThunder();
    }, wait);
  }

  playThunder() {
    const ctx = this.ctx;
    const buffer = this.thunderBuffer;
    if (!ctx || !buffer || !this.master) return;
    if (this.mix.rain < 0.08) return;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    // Quieter when the rain is light, so it never arrives out of nowhere.
    gain.gain.value = 0.35 + this.mix.rain * 0.45;
    src.connect(gain);
    gain.connect(this.master);
    src.start();
  }

  async suspend() {
    await this.ctx?.suspend();
  }

  destroy() {
    if (this.thunderTimer !== null) window.clearTimeout(this.thunderTimer);
    this.sources.forEach((s) => {
      try {
        s.stop();
      } catch {
        // Already stopped.
      }
    });
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
