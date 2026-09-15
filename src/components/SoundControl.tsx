"use client";
import { useEffect, useRef, useState } from "react";
import {
  Ambience,
  DEFAULT_MIX,
  loadMix,
  saveMix,
  type LayerName,
  type Mix,
} from "@/lib/ambience";

function Wave({ playing }: { playing: boolean }) {
  return (
    <span className="flex items-end gap-[2px]" aria-hidden="true">
      {[5, 10, 7].map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-sm bg-current ${playing ? "wave-bar" : ""}`}
          style={{ height: `${h}px`, animationDelay: `${-0.28 * i}s` }}
        />
      ))}
    </span>
  );
}

const SLIDERS: { key: LayerName | "master"; label: string }[] = [
  { key: "master", label: "Volume" },
  { key: "rain", label: "Rain" },
  { key: "wind", label: "Wind" },
  { key: "birds", label: "Birds" },
];

export default function SoundControl() {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [mix, setMix] = useState<Mix>(DEFAULT_MIX);
  const engine = useRef<Ambience | null>(null);

  useEffect(() => {
    setMix(loadMix());
    setReady(true);
    return () => engine.current?.destroy();
  }, []);

  async function toggleSound() {
    if (!engine.current) engine.current = new Ambience(mix);
    if (playing) {
      await engine.current.suspend();
      setPlaying(false);
      return;
    }
    await engine.current.start();
    setPlaying(true);
  }

  function change(key: LayerName | "master", value: number) {
    const next = { ...mix, [key]: value };
    setMix(next);
    saveMix(next);
    if (!engine.current) return;
    if (key === "master") engine.current.setMaster(value);
    else engine.current.setLayer(key, value);
  }

  return (
    <div className={`flex items-start gap-2 ${ready ? "opacity-100" : "opacity-0"}`}>
      {open && (
        <div className="w-60 rounded bg-seal p-4 text-seal-ink shadow-lg">
          <p className="text-[0.68rem] uppercase tracking-[0.15em] opacity-60">
            Mix
          </p>
          <div className="mt-3 space-y-3">
            {SLIDERS.map((s) => (
              <label key={s.key} className="block">
                <span className="flex items-baseline justify-between text-[0.75rem]">
                  {s.label}
                  <span className="opacity-60">
                    {Math.round(mix[s.key] * 100)}%
                  </span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(mix[s.key] * 100)}
                  onChange={(e) => change(s.key, Number(e.target.value) / 100)}
                  className="mt-1 w-full accent-highlight"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setMix(DEFAULT_MIX);
              saveMix(DEFAULT_MIX);
              engine.current?.setMaster(DEFAULT_MIX.master);
              (["rain", "wind", "birds"] as LayerName[]).forEach((n) =>
                engine.current?.setLayer(n, DEFAULT_MIX[n])
              );
            }}
            className="mt-4 text-[0.72rem] underline decoration-1 underline-offset-2 opacity-70 hover:opacity-100"
          >
            Reset mix
          </button>
          <p className="mt-3 text-[0.68rem] leading-relaxed opacity-55">
            Field recordings, all CC0. Credits in the footer.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={toggleSound}
        className="flex items-center gap-2 rounded bg-seal px-3 py-2 text-[0.72rem] text-seal-ink transition hover:opacity-90"
      >
        <Wave playing={playing} />
        {playing ? "Sound on" : "Tap for sound"}
      </button>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="mix settings"
        aria-expanded={open}
        className="rounded bg-seal px-3 py-2 text-[0.72rem] text-seal-ink transition hover:opacity-90"
      >
        Settings
      </button>
    </div>
  );
}
