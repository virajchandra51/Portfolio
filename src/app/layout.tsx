import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/Chrome";
import Footer from "@/components/Footer";
import Postcard from "@/components/Postcard";
import Scene from "@/components/Scene";
import { site } from "@/lib/site";

const sans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Instrument_Serif({
  display: "swap",
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} - software engineer`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} - software engineer`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans antialiased`}
      >
        {/* Applies saved theme and scene before first paint, so a choice that
            differs from the default does not flash the wrong one. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement,t=localStorage.getItem('theme');if(t==='dark'||t==='light'){d.dataset.theme=t}var s=localStorage.getItem('scene');if(['moonlit','rain','mist','dusk'].indexOf(s)>-1){d.dataset.scene=s}}catch(e){}",
          }}
        />
        <Scene />
        <Chrome />
        <div className="mx-auto flex min-h-dvh w-full max-w-[56rem] flex-col justify-center px-4 py-16 md:px-8">
          <Postcard>{children}</Postcard>
          <Footer />
        </div>
      </body>
    </html>
  );
}
