"use client";
import { FC, useEffect } from "react";
import image1 from "@/assets/images/project-1.png";
import image2 from "@/assets/images/project-2.png";
import image3 from "@/assets/images/project-3.png";
import image4 from "@/assets/images/project-4.png";
import image5 from "@/assets/images/project-5.png";
import image6 from "@/assets/images/project-6.png";
import Project from "@/components/Project";
import { link } from "fs";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const projects = [
  {
    name: "CodeUtsava 8.0",
    image: image1,
    link: "https://codeutsava-prod.netlify.app/",
  },
  {
    name: "Mentorship Programme",
    image: image2,
    link: "https://codeutsava.nitrr.ac.in/",
  },
  {
    name: "CodeUtsava 7.0",
    image: image3,
    link: "https://codeutsava7.netlify.app/",
  },
  {
    name: "Virtual Escape Room",
    image: image4,
    link: "https://virtual-escape-room-tcp.vercel.app/",
  },
  {
    name: "Visionary",
    image: image5,
    link: "https://virajchandra51.github.io/Visionary/",
  },
  {
    name: "CodeUtsava 6.0",
    image: image6,
    link: "https://codeutsava.netlify.app/",
  },
];

const Projects: FC = () => {
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
          <h1 className="text-[4rem] leading-[0.9] font-medium tracking-tight uppercase md:text-[10rem] lg:text-[12rem]">
            PROJECTS
          </h1>
        </div>
        <div className="mt-10 md:mt-16 lg:mt-20">
          {projects.map(({ name, image, link }) => (
            <Project key={name} name={name} image={image} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
