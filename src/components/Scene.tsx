"use client";
import { useEffect, useState } from "react";
import { DEFAULT_SCENE, SCENES } from "@/lib/scenes";

// Depth per plane, back to front, for a 4-plane pixel-art scene. Higher moves
// further with the pointer, which is what reads as distance. A scene with a
// different plane count gets depths spread evenly across the same range.
const DEPTH_4 = [0.18, 0.42, 0.85, 0.3];

function depthFor(count: number, i: number): number {
  if (count === DEPTH_4.length) return DEPTH_4[i];
  const min = 0.15;
  const max = 0.8;
  return count <= 1 ? min : min + ((max - min) * i) / (count - 1);
}

export default function Scene() {
  const [sceneId, setSceneId] = useState(DEFAULT_SCENE);

  // The scene lives as data-scene on <html> so it can be applied before paint.
  // Watch it rather than lifting state, so the switcher stays independent.
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setSceneId(root.dataset.scene || DEFAULT_SCENE);
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-scene"] });
    return () => obs.disconnect();
  }, []);

  // Pointer parallax, written straight to a CSS variable so React never
  // re-renders on mouse move.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        document.documentElement.style.setProperty("--px", x.toFixed(4));
        document.documentElement.style.setProperty("--py", y.toFixed(4));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scene = SCENES.find((s) => s.id === sceneId);
  const smooth = scene?.render === "smooth";

  return (
    <div className="scene" aria-hidden="true">
      {scene?.layers ? (
        scene.layers.map((src, i) => (
          <div
            key={src}
            className={`plane plane-${i + 1} ${smooth ? "plane-smooth" : ""}`}
            style={{
              backgroundImage: `url("${src}")`,
              // Each plane shifts a different amount, which is the whole trick.
              ["--depth" as string]: depthFor(scene.layers!.length, i),
            }}
          />
        ))
      ) : (
        <div className="scene-art" />
      )}
      <div className="scene-veil" />
    </div>
  );
}
