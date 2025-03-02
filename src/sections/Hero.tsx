import { FC } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import Button from "@/components/Button";
import {
  motion,
} from "motion/react";

const Hero: FC = () => {
  const handleClick = (
    props: { hash: string },
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const target = document.querySelector(props.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    return;
  };

  return (
    <section id="about">
      <div className="flex items-center justify-center md:h-screen sticky top-0">
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container !max-w-full">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[4rem] md:text-[10rem] lg:text-[12rem] leading-[4rem] lg:leading-[10rem] mt-40 md:mt-10 flex flex-col justify-center items-center"
            >
              <span className="uppercase font-medium">Viraj</span>
              <span className="uppercase font-normal text-stone-500 !text-lg !lg:text-xl">Software Engineer</span>
              <span className="uppercase font-medium">Chandra</span>
            </motion.h1>
            <div className="flex flex-col mt-10 items-center justify-center gap-6 md:flex-row md:items-center">
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 5.1 }}
              >
                <Button
                  variant="secondary"
                  iconAfter={
                    <div className="overflow-hidden size-5">
                      <div className="h-5 w-10 flex group-hover/button:-translate-x-1/2 transition-transform duration-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                  onClick={(e) => handleClick({ hash: "#projects" }, e)}
                >
                  <span>View My Work</span>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 5.3 }}
              >
                <Button
                  variant="text"
                  onClick={(e) => handleClick({ hash: "#contact" }, e)}
                >
                  Let&apos;s Talk
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
