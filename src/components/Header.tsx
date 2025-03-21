"use client";
import { FC, useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";
import Magnetic from "./Magnetic";
import Link from "next/link";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [topLineScope, topLineAnimate] = useAnimate();
  const [bottomLineScope, bottomLineAnimate] = useAnimate();
  const [navScope, navAnimate] = useAnimate();

  useEffect(() => {
    if (isOpen) {
      topLineAnimate([
        [
          topLineScope.current,
          {
            translateY: 4,
          },
        ],
        [
          topLineScope.current,
          {
            rotate: 45,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            translateY: -4,
          },
        ],
        [
          bottomLineScope.current,
          {
            rotate: -45,
          },
        ],
      ]);
      navAnimate([
        [
          navScope.current,
          {
            height: "100%",
          },
          {
            duration: 0.7,
          },
        ],
      ]);
    } else {
      topLineAnimate([
        [
          topLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          topLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      bottomLineAnimate([
        [
          bottomLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          bottomLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      navAnimate([
        [
          navScope.current,
          {
            height: "0",
          },
        ],
      ]);
    }
  }, [
    isOpen,
    topLineScope,
    topLineAnimate,
    bottomLineScope,
    bottomLineAnimate,
    navScope,
    navAnimate,
  ]);

  return (
    <header>
      <div
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-black z-10"
        ref={navScope}
      >
        <nav className="mt-20 flex flex-col">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={setIsOpen.bind(null, false)}
              className="text-stone-200 border-t border-stone-800 last:border-b py-8 group/nav-item relative isolate uppercase"
            >
              <div className="container !max-w-full flex items-center justify-between">
                <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-500">
                  {label}
                </span>
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
              <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-500 bottom-0 -z-10"></div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute top-0 left-0 w-full z-10">
        <div className="container !max-w-full">
          <div className="flex justify-between h-20 items-center">
            <Magnetic>
              <Link href="/">
                <span className="text-2xl font-bold text-black uppercase font-serif">
                  V .
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <div
                className="cursor-pointer size-11 border border-stone-400 rounded-full inline-flex items-center justify-center bg-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="3"
                    y="7"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={topLineScope}
                    style={{
                      transformOrigin: "12px 8px",
                    }}
                  />
                  <motion.rect
                    x="3"
                    y="15"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={bottomLineScope}
                    style={{
                      transformOrigin: "12px 16px",
                    }}
                  />
                </svg>
              </div>
            </Magnetic>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
