"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import MarqueeText from "@/components/MarqueeText";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      console.log(locomotiveScroll);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 3000);
    })();
  }, []);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Hero />
      <MarqueeText>Developer &bull; Designer &bull; Developer &bull; Designer &bull; Developer</MarqueeText>
      <Intro />
    </>
  );
}
