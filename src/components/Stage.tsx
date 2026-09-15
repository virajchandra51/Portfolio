"use client";
import { useEffect, useState } from "react";
import Controls from "@/components/Controls";
import Postcard from "@/components/Postcard";
import SceneSwitcher from "@/components/SceneSwitcher";
import SocialBar from "@/components/SocialBar";
import { site } from "@/lib/site";

// The scene is the page; the card sits on top of it and can be dismissed.
// "Enjoy the view" hides the card and sharpens the scene, "About me" brings it
// back. The blur lives in CSS, keyed off data-card on the document.
export default function Stage({ children }: { children: React.ReactNode }) {
  const [cardOpen, setCardOpen] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.card = cardOpen ? "open" : "closed";
  }, [cardOpen]);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 md:p-4">
        <span
          className={`pointer-events-auto rounded bg-seal px-3 py-2 font-serif text-sm text-seal-ink transition-opacity ${
            cardOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          {site.name}
        </span>
        <div className="pointer-events-auto">
          <Controls />
        </div>
      </div>

      {cardOpen && (
        <div className="relative z-20 mx-auto flex h-dvh w-full max-w-[52rem] items-center px-4 pb-28 pt-16 md:px-8">
          <Postcard onHide={() => setCardOpen(false)}>{children}</Postcard>
        </div>
      )}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto_1fr] items-end gap-3 p-3 md:p-4">
        <div className="pointer-events-auto">
          <SocialBar />
        </div>
        <div className="pointer-events-auto justify-self-center">
          <SceneSwitcher />
        </div>
        <div className="pointer-events-auto justify-self-end">
          {!cardOpen && (
            <button
              type="button"
              onClick={() => setCardOpen(true)}
              className="rounded bg-cta px-4 py-2 text-[0.78rem] text-cta-ink transition-opacity hover:opacity-90"
            >
              About me
            </button>
          )}
        </div>
      </div>
    </>
  );
}
