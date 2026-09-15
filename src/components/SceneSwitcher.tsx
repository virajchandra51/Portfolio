"use client";
import { useEffect, useState } from "react";
import { DEFAULT_SCENE, isScene, SCENES, SCENE_KEY } from "@/lib/scenes";

export default function SceneSwitcher() {
  const [scene, setScene] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.dataset.scene;
    if (isScene(attr)) {
      setScene(attr);
      return;
    }
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(SCENE_KEY);
    } catch {
      stored = null;
    }
    setScene(isScene(stored) ? stored : DEFAULT_SCENE);
  }, []);

  function pick(id: string) {
    setScene(id);
    setOpen(false);
    document.documentElement.dataset.scene = id;
    try {
      localStorage.setItem(SCENE_KEY, id);
    } catch {
      // Storage blocked. The choice just will not stick.
    }
  }

  const current = SCENES.find((s) => s.id === scene) ?? SCENES[0];

  return (
    <div className={`relative ${scene ? "opacity-100" : "opacity-0"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded bg-seal px-3 py-2 text-[0.72rem] text-seal-ink transition hover:opacity-90"
      >
        {current.label}
        <span aria-hidden="true" className="text-[0.6rem] opacity-70">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul className="absolute left-0 mt-1 w-52 overflow-hidden rounded bg-seal py-1 text-seal-ink shadow-lg">
          {SCENES.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => pick(s.id)}
                className={`block w-full px-3 py-2 text-left text-[0.74rem] transition hover:bg-white/10 ${
                  s.id === current.id ? "opacity-100" : "opacity-70"
                }`}
              >
                {s.label}
                <span className="block text-[0.64rem] opacity-55">{s.note}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
