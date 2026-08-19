"use client";

import { animate } from "motion";
import { TransitionRouter } from "next-transition-router";
import { useEffect, useRef } from "react";

export default function TransitionProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const transitionRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);

  const createTransitionGrid = () => {
    if (!transitionRef.current) return;

    const container = transitionRef.current;
    container.innerHTML = "";
    blocksRef.current = [];

    const gridWidth = window.innerWidth;
    const gridHeight = window.innerHeight;
    const blockSize = 50;
    const cols = Math.ceil(gridWidth / blockSize);
    const rows = Math.ceil(gridHeight / blockSize);
    const offsetX = (gridWidth - cols * blockSize ) / 2;
    const offsetY = ( gridHeight - rows * blockSize ) / 2;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const block = document.createElement("div");
        block.className = "transition-block";
        block.style.cssText = `
          width: ${blockSize}px;
          height: ${blockSize}px;
          left: ${j * blockSize + offsetX}px;
          top: ${i * blockSize + offsetY}px;
        `;
        container.appendChild(block);
        blocksRef.current.push(block);
      }
    }
  };

  useEffect(() => {
    createTransitionGrid();
    window.addEventListener("resize", createTransitionGrid);
    return () => window.removeEventListener("resize", createTransitionGrid);
  }, []);

  return (
    <TransitionRouter
      auto
      leave={async (next) => {
        const elements = blocksRef.current;

        if (elements.length === 0) {
          next();
          return;
        }
        const animations = elements.map((el) => {
          
          return animate(
            el,
            { opacity: 1},
            {
              duration: 0.3,
              delay: Math.random() * 0.5, 
              ease: "easeOut",
            }
          ).finished;
        });

        await Promise.all(animations);
        next();
      }}
      enter={(next) => {
        const animations = blocksRef.current.map((el) => {
          return animate(
            el,
            { opacity: 0 },
            {
              duration: 0.3,
              delay: Math.random() * 0.5,
              ease: "easeIn",
            }
          ).finished;
        });

        Promise.all(animations).then(next);
      }}
    >
      <div ref={transitionRef} className="transition-grid" >
      {children}
      </div>
    </TransitionRouter>
  );
}