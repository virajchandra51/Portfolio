"use client";
import { useEffect, useState } from "react";
import {
  DEFAULT_SCENE,
  isScene,
  SCENES,
  SCENE_KEY,
  thumbFor,
} from "@/lib/scenes";

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

  // Escape closes the picker, like any other dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded bg-highlight px-4 py-2 text-left text-highlight-ink transition-opacity hover:opacity-90 ${
          scene ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="block text-[0.82rem] font-medium">Change scene</span>
        <span className="block text-[0.72rem] opacity-70">{current.label}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Choose a scene"
            className="card max-h-[86dvh] w-full max-w-[44rem] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="display text-[1.8rem]">Somewhere to sit.</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close"
                className="text-xl leading-none text-muted transition-colors hover:text-fg"
              >
                &times;
              </button>
            </div>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {SCENES.map((s) => {
                const active = s.id === current.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => pick(s.id)}
                      className="block w-full text-left"
                    >
                      <span
                        className={`block overflow-hidden rounded border-2 transition-colors ${
                          active ? "border-cta" : "border-transparent hover:border-rule"
                        }`}
                      >
                        {/* Static export, so no next/image optimisation. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbFor(s.id)}
                          alt=""
                          width={440}
                          height={248}
                          loading="lazy"
                          className="block aspect-[440/248] w-full object-cover"
                          style={
                            s.layers ? { imageRendering: "pixelated" } : undefined
                          }
                        />
                      </span>
                      <span className="mt-2 block text-[0.92rem] text-fg">
                        {s.label}
                        {active && (
                          <span className="text-muted"> &middot; here</span>
                        )}
                      </span>
                      <span className="block text-[0.8rem] text-muted">
                        {s.mood}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-7 border-t border-rule pt-4 text-[0.74rem] leading-relaxed text-faint">
              Forest by ansimuz (CC0). Snow train and Underwater Cave use
              CraftPix backgrounds (OGA-BY 3.0); the train window is original
              CSS. Moonlit River by Hiroshige, public domain via the Art
              Institute of Chicago. Ambience: CC0 recordings by VanEngelen,
              Sandermotions, ceich93, Fission9 and craigsmith on Freesound.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
