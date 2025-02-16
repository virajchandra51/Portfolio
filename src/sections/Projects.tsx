"use client";
import { FC, useEffect } from "react";
import image1 from "@/assets/images/project-1.jpg";
import image2 from "@/assets/images/project-2.jpg";
import image3 from "@/assets/images/project-3.jpg";
import image4 from "@/assets/images/project-4.jpg";
import image5 from "@/assets/images/project-5.jpg";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
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
  const {
    scope: projectsHeaderScope,
    entraceAnimation: projectsHeaderAnimate,
  } = useTextRevealAnimation({
    duration: 0.5,
    delay: 0.3,
  });
  useEffect(() => {
    projectsHeaderAnimate();
  }, [projectsHeaderAnimate]);
  return (
    <section className="section" id="projects">
      <div className="container">
        <h2
          className="text-4xl md:text-7xl lg:text-8xl"
          ref={projectsHeaderScope}
        >
          Selected Works
        </h2>
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
