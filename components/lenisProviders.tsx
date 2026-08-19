"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update);


    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useLenis(({ scroll, direction }) => {
    const root = document.documentElement;
    root.classList.toggle("hide-quicknav", scroll > 100);

    if (direction == 1) {
      root.setAttribute("scroll-direction", "down" )
    } else if (direction == -1) {
      root.setAttribute("scroll-direction", "up" )
    } else {
      root.setAttribute("scroll-direction", "netral" )
    }
  });

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, smoothWheel: true, lerp: 0.1 }}
      ref={lenisRef}
    />
  );
}
