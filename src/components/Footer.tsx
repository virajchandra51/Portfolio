"use client";
import Button from "@/components/Button";
import { FC, useEffect } from "react";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { useInView } from "motion/react";

const navItems = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blog",
    href: "https://virajchandra.netlify.app/",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1p_5YEk2cgQqgdRqtmRPuyRZHpw42nV60/view?usp=sharing",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Footer: FC = () => {
  const handleClickFooterItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = new URL(e.currentTarget.href);
    const target = document.querySelector(url.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    return;
  };
  const { scope: footerScope, entraceAnimation: footerEntranceAnimation } =
    useTextRevealAnimation({ duration: 0.5, delay: 0.2 });

  const inView = useInView(footerScope, { once: false });

  useEffect(() => {
    if (inView) {
      footerEntranceAnimation();
    }
  }, [inView, footerEntranceAnimation]);

  return (
    <footer className="bg-black text-white" id="contact">
      <div className="container">
        <div className="section">
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="uppercase">One spot available for next month</span>
          </div>
          <div className="grid md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2
                className="text-4xl md:text-7xl lg:text-8xl mt-8 font-extralight"
                ref={footerScope}
              >
                Enough talk. Let&apos;s make something great together.
              </h2>
              <Button
                variant="secondary"
                className="mt-8"
                iconAfter={
                  <div className="overflow-hidden size-6">
                    <div className="h-6 w-12 flex group-hover/button:-translate-x-1/2 transition-transform duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                }
              >
                virajchandra@google.com
              </Button>
            </div>
            <div className="md:col-span-1">
              <nav className="flex flex-col md:items-end gap-8 mt-16 md:mt-0">
                {navItems.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-2xl md:text-3xl lg:text-4xl"
                    onClick={handleClickFooterItem}
                  >
                    <Button variant="text" className="text-lg">
                      {label}
                    </Button>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 justify-between gap-x-4">
          <div className="flex h-full w-full flex-col gap-y-6 border-t border-white/10 py-8">
            <div className="font-general-sans text-xl font-medium text-white uppercase">
              Social
            </div>
            <div className="flex flex-col gap-y-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-general-sans text-base font-normal text-white/70 transition-all duration-300 ease-in-out hover:text-white"
                href="https://www.linkedin.com/in/viraj-chandra"
              >
                LinkedIn
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-general-sans text-base font-normal text-white/70 transition-all duration-300 ease-in-out hover:text-white"
                href="https://www.instagram.com/me_ayan_710"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-y-4 border-t border-white/10 py-8">
            <div className="font-general-sans text-xl font-medium text-white uppercase">
              Contact
            </div>
            <div className="flex flex-col gap-y-2">
              <a
                className="font-general-sans text-base font-normal text-white/70 transition-all duration-300 ease-in-out hover:text-white"
                href="mailto:virajchandra@google.com"
              >
                Email
              </a>
              <a
                className="font-general-sans text-base font-normal text-white/70 transition-all duration-300 ease-in-out hover:text-white"
                href="tel:+919129916977"
              >
                Phone
              </a>
            </div>
          </div>
        </div>
        <p className="py-16 text-white/30 text-sm">
          Copyright &copy; Viraj Chandra &bull; All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
