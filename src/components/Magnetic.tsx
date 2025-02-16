"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Magnetic = (props: { children: React.ReactElement }) => {
  const magnetic = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    if (magnetic.current !== null) {
      magnetic.current.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        if (magnetic.current !== null) {
          const { height, width, left, top } =
            magnetic.current.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          xTo(x * 0.35);
          yTo(y * 0.35);
        }
      });

      magnetic.current.addEventListener("mouseleave", (e) => {
        xTo(0);
        yTo(0);
      });
    }
  }, []);
  return React.cloneElement(props.children, { ref: magnetic });
};

export default Magnetic;
