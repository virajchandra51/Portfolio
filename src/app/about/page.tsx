"use client";
import { FC, useEffect } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const About: FC = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
      console.log(locomotiveScroll);
      setTimeout(() => {
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 3000);
    })();
  }, []);

  return (
    <section className="section">
      <div className="relative my-auto flex min-h-[60vh] flex-col items-center justify-center gap-y-8 px-[5%] md:min-h-screen">
        <div className="flex flex-col gap-y-6">
          <h1
            className="text-[4rem] leading-[0.9] font-medium tracking-tight uppercase md:text-[10rem] lg:text-[12rem]"
          >
            ABOUT ME
          </h1>
          <div className="flex justify-between">
            <div className="text-xl leading-[1.4] text-stone-500 uppercase md:text-2xl">
              Indian
            </div>
            <div className="text-xl leading-[1.4] text-stone-500 uppercase md:text-2xl">
              Software Engineer
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex max-w-[35rem] flex-col gap-y-4 font-general-sans text-lg font-normal sm:text-2xl md:max-w-[50rem]">
            <p>
              As a{" "}
              <span className="font-bold">computer science engineer</span>,
              I thrive on transforming ideas into{" "}
              <span className="font-bold">innovative solutions</span>{" "}
              through technology. With a strong foundation in{" "}
              <span className="font-bold">software development</span>,{" "}
              <span className="font-bold">data structures</span>,{" "}
              <span className="font-bold">algorithms</span>, and{" "}
              <span className="font-bold">system design</span>, I bring both
              creativity and precision to every project I undertake.
            </p>
            <p>
              My journey in the tech world has been fueled by a dedication to
              solving <span className="font-bold">complex problems</span>{" "}
              and leveraging{" "}
              <span className="font-bold">cutting-edge technologies</span>{" "}
              to drive <span className="font-bold">meaningful change</span>.
              Whether it&apos;s developing{" "}
              <span className="font-bold">
                robust software applications
              </span>
              , optimizing processes, or exploring new avenues in{" "}
              <span className="font-bold">artificial intelligence</span> and{" "}
              <span className="font-bold">machine learning</span>, I am
              always eager to take on new challenges and deliver impactful
              results.
            </p>
            <p>
              Driven by curiosity and a commitment to{" "}
              <span className="font-bold">continuous learning</span>, I stay
              at the forefront of{" "}
              <span className="font-bold">industry trends</span> and{" "}
              <span className="font-bold">emerging technologies</span> to
              provide the most efficient and modern solutions. My goal is not
              only to build technology but to create{" "}
              <span className="font-bold">meaningful experiences</span> that
              help businesses and individuals grow in today&apos;s digital world.
            </p>
            <p>
              If you&apos;re looking for a{" "}
              <span className="font-bold">versatile</span>,{" "}
              <span className="font-bold">results-driven professional</span>{" "}
              who can turn{" "}
              <span className="font-bold">
                challenges into opportunities
              </span>
              , I am here to help you achieve your{" "}
              <span className="font-bold">technological goals</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
