"use client";
import { useEffect, useRef } from "react";
import "./locomotive.css";

export default function LocomotivePage({children } : {children : React.ReactNode}) {
  const containerRef = useRef(null);

 useEffect(() => {
  let scroll: any;
  // Import dinamis agar tidak error saat SSR
  import("locomotive-scroll").then((LocomotiveScroll) => {
    scroll = new LocomotiveScroll.default({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      // Ini yang memicu matrix3d:
      getDirection: true, 
      multiplier: 1,
    });
  });

  return () => {
    if (scroll) scroll.destroy();
  };
}, []);

  return (
    <div 
      className="o-scroll" 
      data-module-scroll="main" 
      ref={containerRef} 
      data-scroll-container
    >
      <section 
        className="c-section" 
        data-scroll-section 
        data-module-section="section0"
      >
        {children}
      </section>
    </div>
  );
}