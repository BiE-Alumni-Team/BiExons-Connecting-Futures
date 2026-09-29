// components/BioinformaticsIntro.jsx
"use client";

import { useEffect, useRef, useState } from "react";

// Fades + slides children in when they scroll into view.
function Reveal({ from = "up", delay = 0, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect(); // animate once
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${from} ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default function BioinformaticsIntro({
  src = "/bio-planet.html", // file placed in your Next.js /public folder
  title = "Rotating bioinformatics planet",
}) {
  return (
    <section className="mx-auto max-w-6xl overflow-hidden px-4 py-16">
      <style>{`
        .reveal { opacity: 0; transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
        .reveal-left  { transform: translateX(-60px); }
        .reveal-right { transform: translateX(60px); }
        .reveal-up    { transform: translateY(30px); }
        .reveal-in    { opacity: 1; transform: none; }

        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
        {/* Left: 3D planet. Slides in from the left and spins by itself */}
        <Reveal from="left" className="w-full md:w-3/5">
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="block aspect-square w-full border-0 bg-transparent"
            style={{ colorScheme: "normal" }}
          />
        </Reveal>

        {/* Right: text, each block reveals in turn */}
        <div className="w-full md:w-2/5">
          <Reveal from="right" delay={500}>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              About Bioinformatics Engineering
            </h2>
          </Reveal>
          <Reveal from="right" delay={300}>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              Bioinformatics Engineering brings together biology, computer science
              and mathematics to make sense of biological data. Our graduates
              analyse genomes, predict protein structures, build machine learning
              models and design software that speeds up discoveries in medicine,
              agriculture and life science.
            </p>
          </Reveal>
          <Reveal from="right" delay={400}>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              From molecular docking to genomics pipelines, the department trains
              students to turn raw sequence data into real-world solutions.
            </p>
          </Reveal>
          <Reveal from="up" delay={550}>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Genomics", "Molecular Docking", "Machine Learning", "Structural Biology"].map((t) => (
                <li key={t} className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
