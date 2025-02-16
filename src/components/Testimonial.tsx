"use client";
import { useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { usePresence, motion } from "motion/react";

const Testimonial = (props: {
  quote: string;
  role: string;
  company: string;
  name: string;
  image: string | StaticImport;
  imagePositionY: number;
  className?: string;
}) => {
  const {
    quote,
    role,
    company,
    name,
    image,
    imagePositionY,
    className,
    ...rest
  } = props;

  const {
    scope: qouteScope,
    entraceAnimation: quoteEntraceAnimate,
    exitAnimation: qouteExitAnimation,
  } = useTextRevealAnimation({
    duration: 0.5,
    delay: 0.2,
  });
  const {
    scope: citeScope,
    entraceAnimation: citeEntraceAnimate,
    exitAnimation: citeExitAnimation,
  } = useTextRevealAnimation({
    duration: 0.5,
    delay: 0.2,
  });

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      Promise.all([qouteExitAnimation(), citeExitAnimation()]).then(() => {
        safeToRemove();
      });
    } else {
      quoteEntraceAnimate().then(() => {
        citeEntraceAnimate();
      });
    }
  }, [
    isPresent,
    quoteEntraceAnimate,
    citeEntraceAnimate,
    qouteExitAnimation,
    citeExitAnimation,
    safeToRemove,
  ]);

  return (
    <div
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center",
        className
      )}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative">
        <motion.div
          className="absolute h-full bg-stone-900"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          exit={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <Image
          src={image}
          alt={name}
          className="size-full object-cover"
          style={{ objectPosition: `50% ${imagePositionY * 100}%` }}
        />
      </div>
      <blockquote className="md:col-span-3">
        <div
          className="text-3xl md:text-5xl lg:text-6xl mt-8 md:mt-0"
          ref={qouteScope}
        >
          <span>&ldquo;</span>
          {quote}
          <span>&rdquo;</span>
        </div>
        <cite
          className="mt-4 md:mt-8 not-italic block md:text-lg lg:text-xl"
          ref={citeScope}
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};
export default Testimonial;
