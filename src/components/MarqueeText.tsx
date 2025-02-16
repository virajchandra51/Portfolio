import React from "react";
import { useRef } from "react";
import { useScroll, motion } from "motion/react";
import { useTransform } from "motion/react";

const MarqueeText = (props: {
  children: string;
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const transformTop = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <h2
      className="mt-20 py-10 text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden tracking-tighter"
      ref={titleRef}
    >
      <motion.span className="whitespace-nowrap" style={{ x: transformTop }}>
        {props.children}
      </motion.span>
      <motion.span
        className="whitespace-nowrap self-end text-red-orange-500"
        style={{ x: transformBottom }}
      >
        {props.children}
      </motion.span>
    </h2>
  );
};

export default MarqueeText;
