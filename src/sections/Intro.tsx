"use client";
import { useInView } from "motion/react";
import { FC, useEffect } from "react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";

const Intro: FC = () => {
  const { scope: introScope, entraceAnimation: introAnimate } =
    useTextRevealAnimation({
      duration: 0.5,
      delay: 0.2,
    });
  const inView = useInView(introScope, { once: false });
  useEffect(() => {
    if (inView) {
      introAnimate();
    }
  }, [inView, introAnimate]);

  return (
    <section className="section mt-12 md:mt-16 lg:mt-20" id="intro">
      <div className="container">
        <h2
          className="text-4xl md:text-7xl lg:w-4/5 lg:text-8xl"
          ref={introScope}
        >
          Building beautiful websites with clean code and thoughtful design to
          help your business grow and stand out online
        </h2>
      </div>
    </section>
  );
};

export default Intro;
