"use client";
import { FC, useEffect } from "react";
import image1 from "@/assets/images/project-1.jpg";
import image2 from "@/assets/images/project-2.jpg";
import image3 from "@/assets/images/project-3.jpg";
import image4 from "@/assets/images/project-4.jpg";
import image5 from "@/assets/images/project-5.jpg";
import Project from "@/components/Project";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const projects = [
  {
    name: "Artisan Brew Co.",
    image: image1,
  },
  {
    name: "Wavelength Studios",
    image: image2,
  },
  {
    name: "Nova Fitness",
    image: image3,
  },
  {
    name: "Urban Plates",
    image: image4,
  },
  {
    name: "Bloom Botanicals",
    image: image5,
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
          {projects.map(({ name, image }) => (
            <Project key={name} name={name} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
