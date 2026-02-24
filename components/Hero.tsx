"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const roadGreenRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !carRef.current) return;

    const ctx = gsap.context(() => {
      const visiblePortion = 140;
      const moveDistance = window.innerWidth - visiblePortion;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.set(statsRef.current!.querySelectorAll(".stat-box"), {
        opacity: 0,
        y: 60,
      });

      tl.to(carRef.current, { x: moveDistance, ease: "none", duration: 1 }, 0);

      const initialOverlap = 80;
      gsap.set(roadGreenRef.current, { width: initialOverlap });

      tl.to(
        roadGreenRef.current,
        { width: moveDistance + initialOverlap, ease: "none", duration: 1 },
        0
      );

      tl.to(
        textMaskRef.current,
        { width: moveDistance, ease: "none", duration: 1 },
        0
      );

      tl.to(
        statsRef.current!.querySelectorAll(".stat-box"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.3,
          ease: "power2.out",
        },
        0.35
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gray-200"
    >
      {/* Road */}
      <div className="absolute top-1/2 left-0 w-full h-28 sm:h-32 md:h-50 -translate-y-1/2 z-10">
        <div className="absolute inset-0 bg-black" />
        <div
          ref={roadGreenRef}
          className="absolute top-0 left-0 h-full bg-green-400 w-0"
        />
      </div>

      {/* Text */}
      <div
        ref={textMaskRef}
        className="absolute top-1/2 left-6 sm:left-12 md:left-20 -translate-y-1/2 overflow-hidden w-0 z-20"
      >
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.1em] text-black whitespace-nowrap">
          WELCOME ITZFIZZ
        </h1>
      </div>

      
      <img
        ref={carRef}
        src="/car.png"
        alt="car"
        className="absolute top-1/2 -translate-y-1/2 left-0 
                   w-[220px] sm:w-[300px] md:w-[360px] lg:w-[400px] 
                   z-30"
      />

      
      <div
        ref={statsRef}
        className="absolute top-10 bottom-10 left-0 right-0 flex flex-col justify-between items-end pr-6 sm:pr-12 md:pr-24 z-40"
      >
        <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 relative">
          <div className="stat-box bg-yellow-300 px-4 sm:px-6 py-6 sm:py-8 rounded-2xl w-[220px] sm:w-[260px] md:w-[300px] shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              58%
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg">
              Increase in pick up point use
            </p>
          </div>

          <div className="stat-box bg-gray-800 text-white px-4 sm:px-6 py-6 sm:py-8 rounded-2xl w-[220px] sm:w-[260px] md:w-[300px] shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              27%
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg">
              Increase in pick up point use
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 sm:gap-10 md:gap-16 relative right-15">
          <div className="stat-box bg-sky-300 px-6 sm:px-8 py-6 rounded-2xl w-[220px] sm:w-[260px] md:w-[350px] shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              23%
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg">
              Decreased in customer phone calls
            </p>
          </div>

          <div className="stat-box bg-orange-400 px-6 sm:px-8 py-6 rounded-2xl w-[220px] sm:w-[260px] md:w-[350px] shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              40%
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg">
              Decreased in customer phone calls
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}