"use client";
import { useEffect, useState } from "react";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import FAQs from "@/sections/FAQs";
import Footer from "@/sections/Footer";
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
      <Header />
      <Hero />
      <MarqueeText>Developer &bull; Designer &bull; Developer &bull; Designer &bull; Developer</MarqueeText>
      <Intro />
      <Projects />
      <Testimonials />
      <FAQs />
      <Footer />
    </>
  );
}
