import Hero from "@/components/Hero";
import About from "@/components/About";
import TechMarquee from "@/components/TechMarquee";
import WhatIDo from "@/components/WhatIDo";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechMarquee />
      <WhatIDo />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
