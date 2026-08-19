"use client";

import "./preload.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const COPY_LINES = [
  'Caution: Slow Moving Vehicle" or "Caution: Construction Zone',
  'Location information like "Los Angeles, CA" or "Based in California"',
];

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const copyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const counterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const splits = [
      ...copyRefs.current.filter(Boolean),
      counterRef.current,
    ].map((el) =>
      SplitText.create(el!, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      })
    );

    const tl = gsap.timeline();

    tl.to(
      [
        ...copyRefs.current.map((el) => el?.querySelectorAll(".line")),
        counterRef.current?.querySelectorAll(".line"),
      ],
      {
        y: "0%",
        duration: 1,
        stagger: 0.075,
        ease: "power3.out",
        delay: 1,
      }
    )
      .to(
        revealerRef.current,
        { scale: 0.1, duration: 0.75, ease: "power2.out" },
        "<"
      )
      .to(revealerRef.current, {
        scale: 0.5,
        duration: 1.5,
        ease: "power2.out",
      })
      .to(revealerRef.current, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        preloaderRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.25,
          ease: "power3.out",
        },
        "-=1"
      );

    return () => {
      tl.kill();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={revealerRef} className="preloader-revelaer" />

      <div className="preloader-col">
        {COPY_LINES.map((text, i) => (
          <div key={i} className="preloader-col-copy">
            <p ref={(el) => { copyRefs.current[i] = el }}>{text}</p>
          </div>
        ))}
      </div>

      <div className="preloader-counter">
        <p ref={counterRef}>00%</p>
      </div>
    </div>
  );
}