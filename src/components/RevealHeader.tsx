"use client";
import { stagger, useAnimate, useInView } from "motion/react";
import { useEffect } from "react";
import SplitType from "split-type";

const RevealHeader = (props: { children: string }) => {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: false });

  useEffect(() => {
    new SplitType(scope.current.querySelector("h2"), {
      types: "lines,words",
      tagName: "span",
    });
  }, [scope]);

  useEffect(() => {
    if (inView) {
      animate(
        scope.current.querySelectorAll(".word"),
        {
          transform: "translateY(0)",
        },
        {
          duration: 0.5,
          delay: stagger(0.2),
        }
      );
    }
  }, [inView, scope, animate]);

  return <h2 className="text-4xl md:text-7xl lg:text-8xl">{props.children}</h2>;
};

export default RevealHeader;
