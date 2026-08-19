"use client";

import { animate, motion } from "motion/react";
import { TransitionRouter } from "next-transition-router";
import React, { useRef } from "react";

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const animation = animate(
          overlayRef.current!,
          { opacity: 1 },
          { duration: 0.2, ease: "easeInOut" }
        );

        animation.finished.then(next);
      }}
      enter={(next) => {
        const animation = animate(
          overlayRef.current!,
          { opacity: 0 },
          { duration: 0.2, ease: "easeInOut", delay: 0.2 }
        );
        animation.finished.then(next);
      }}
    >
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "black",
          zIndex: 49,
          pointerEvents: "none",
          opacity: 0,
        }}
      />
        {children}
    </TransitionRouter>
  );
}