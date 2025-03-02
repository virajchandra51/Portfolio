import { FC } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import Button from "@/components/Button";
import { motion } from "motion/react";

const Hero: FC = () => {
  const handleClick = (
    props: { path?: string; hash?: string },
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (props.path) {
      window.location.href = props.path;
    } else if (props.hash) {
      document.querySelector(props.hash)?.scrollIntoView({ behavior: "smooth" });
    }
    return;
  };

  return (
    <section id="about">
      <div className="flex items-center justify-center h-full min-h-[100vh] sticky top-0">
        <div className="flex flex-col justify-center">
          <div className="container !max-w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative mt-20 flex flex-col items-center justify-center"
            >
              <div className="text-[4rem] leading-[0.9] font-medium tracking-tighter uppercase md:text-[10rem] lg:text-[12rem]">
                Viraj
              </div>
              <div className="pt-2 text-base leading-[1.4] text-stone-500 uppercase md:text-2xl font-normal">
                Software Engineer
              </div>
              <div className="text-[4rem] leading-[0.9] font-medium tracking-tighter uppercase md:text-[10rem] lg:text-[12rem]">
                Chandra
              </div>
            </motion.div>
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
                      <div className="h-5 w-10 flex -translate-x-1/2 group-hover/button:translate-x-[0.125] transition-transform duration-500">
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
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
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
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  }
                  onClick={(e) => handleClick({ path: "/projects" }, e)}
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
