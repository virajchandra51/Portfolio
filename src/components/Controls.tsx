"use client";
import { useEffect, useRef, useState } from "react";
import {
  Ambience,
  DEFAULT_MASTER,
  loadMaster,
  saveMaster,
} from "@/lib/ambience";
import { DEFAULT_SCENE, SCENES } from "@/lib/scenes";

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

export default function Controls() {
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [master, setMaster] = useState(DEFAULT_MASTER);
  const [motion, setMotion] = useState(true);
  const [sceneId, setSceneId] = useState(DEFAULT_SCENE);
  const [ready, setReady] = useState(false);
  const engine = useRef<Ambience | null>(null);

  useEffect(() => {
    setMaster(loadMaster());
    setReady(true);
    const root = document.documentElement;
    const read = () => setSceneId(root.dataset.scene || DEFAULT_SCENE);
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-scene"] });
    return () => {
      obs.disconnect();
      engine.current?.destroy();
    };
  }, []);

  const scene = SCENES.find((s) => s.id === sceneId) ?? SCENES[0];

  // A scene change is a fade between levels, not a reload.
  useEffect(() => {
    engine.current?.setSceneMix(scene.mix);
  }, [scene]);

  async function toggleSound() {
    // The panel is a peer of this button, not a parent: opening one closes the
    // other, so the two never fight over the same corner.
    setOpen(false);
    if (!engine.current) engine.current = new Ambience(scene.mix, master);
    if (playing) {
      await engine.current.suspend();
      setPlaying(false);
      return;
    }
    await engine.current.start();
    setPlaying(true);
  }

  function changeMaster(v: number) {
    setMaster(v);
    saveMaster(v);
    engine.current?.setMaster(v);
  }

  function toggleMotion() {
    const next = !motion;
    setMotion(next);
    document.documentElement.dataset.motion = next ? "on" : "off";
  }

  return (
    <div className={`flex items-start gap-2 ${ready ? "opacity-100" : "opacity-0"}`}>
      {open && (
        <div className="w-64 rounded bg-seal p-4 text-seal-ink shadow-lg">
          <p className="font-serif text-lg">Make it yours</p>

          <label className="mt-4 block">
            <span className="flex items-baseline justify-between text-[0.76rem]">
              Volume
              <span className="opacity-60">{Math.round(master * 100)}%</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(master * 100)}
              onChange={(e) => changeMaster(Number(e.target.value) / 100)}
              className="mt-1 w-full accent-highlight"
            />
          </label>

          <div className="mt-4 flex items-center justify-between text-[0.76rem]">
            <button
              type="button"
              onClick={toggleMotion}
              className="underline decoration-1 underline-offset-2 opacity-80 hover:opacity-100"
            >
              {motion ? "Pause motion" : "Resume motion"}
            </button>
            <button
              type="button"
              onClick={() => changeMaster(DEFAULT_MASTER)}
              className="underline decoration-1 underline-offset-2 opacity-80 hover:opacity-100"
            >
              Reset
            </button>
          </div>

          <p className="mt-4 border-t border-white/15 pt-3 text-[0.72rem] leading-relaxed opacity-60">
            {scene.label}. {scene.note}. Each scene has its own mix.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={toggleSound}
        className="flex items-center gap-2 rounded bg-seal px-3 py-2 text-[0.72rem] text-seal-ink transition hover:opacity-90"
      >
        <Wave playing={playing} />
        {playing ? "Sound on" : "Enable sound"}
      </button>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded bg-seal px-3 py-2 text-[0.72rem] text-seal-ink transition hover:opacity-90"
      >
        Settings
      </button>
    </div>
  );
}
