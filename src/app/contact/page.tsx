"use client";
import Button from "@/components/Button";
import { FC, useEffect } from "react";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const Contact: FC = () => {
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
            CONTACT
          </h1>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-y-4">
          <div className="relative flex flex-col ">
            <label className="bg-white text-base font-medium text-black transition-all duration-200 ease-in-out">
              Name
            </label>
            <input
              id="name"
              className="w-full appearance-none  border-b border-black bg-white p-2 transition-colors duration-200 outline-none "
              type="text"
              value=""
            />
          </div>
          <div className="relative flex flex-col ">
            <label className="bg-white text-base font-medium text-black transition-all duration-200 ease-in-out">
              Email
            </label>
            <input
              id="email"
              className="w-full appearance-none  border-b border-black bg-white p-2 transition-colors duration-200 outline-none "
              type="email"
              value=""
            />
          </div>
          <div className="relative flex flex-col ">
            <label className="bg-white text-base font-medium text-black transition-all duration-200 ease-in-out">
              Subject
            </label>
            <input
              id="subject"
              className="w-full appearance-none  border-b border-black bg-white p-2 transition-colors duration-200 outline-none "
              type="text"
              value=""
            />
          </div>
          <div className="relative flex flex-col ">
            <label className="bg-white text-base font-medium text-black transition-all duration-200 ease-in-out">
              Message
            </label>
            <textarea
              id="message"
              rows={3}
              className="w-full appearance-none  border-b border-black bg-white p-2 transition-colors duration-200 outline-none  resize-none"
            ></textarea>
          </div>
          <Button
            variant="secondary"
            className="px-4 mt-12 py-4 text-black"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
