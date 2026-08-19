"use client";

import gsap from "gsap";
import { RefObject, useEffect } from "react";

interface StackProps {
  itemClass: string;
  innerClass: string;
  outerClass: string;
  ratio: number;
}

export default function useStack(
  containerRef : RefObject<HTMLDivElement | null> , {
  innerClass,
  itemClass,
  outerClass,
  ratio = 1 / 1.65,
}: StackProps) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const item = Array.from(
      container.querySelectorAll(itemClass),
    ) as HTMLDivElement[];
    const inner = Array.from(
      container.querySelectorAll(innerClass),
    ) as HTMLDivElement[];
    const outer = Array.from(
      container.querySelectorAll(outerClass),
    ) as HTMLDivElement[];

    const getStyle = () => {
      gsap.set([container, ...item, ...inner, ...outer], { clearProps: "all" });

      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const getElement = container.getBoundingClientRect();
      const firstItem = window.getComputedStyle(item[0]);
      const marginBottom =
        parseInt(firstItem.getPropertyValue("margin-bottom")) || 0;

      const itemHeight = getElement.width * ratio;
      const offsetTop = -(viewport.height - itemHeight) / 2;

      gsap.set(container, { height: getElement.height - offsetTop });

      item.forEach((itemElement, i) => {
        const height = (itemHeight - marginBottom) * (i + 1) - offsetTop;

        gsap.set(itemElement, {
          position: "absolute",
          top: offsetTop,
          left: 0,
          width: "100%",
          height: height,
          zIndex: item.length - i,
        });

        if (inner[i]) gsap.set(inner[i], {paddingTop : -offsetTop});
        if ( outer[i] ) gsap.set(outer[i], {scale: 1 - 0.025 * i , y : 10 * i, transformOrigin : "bottom center"})

        });
    };

    getStyle();

    let resizeTick = false;
    const handleResize = () => {
      if (!resizeTick) {
        resizeTick = true;
        requestAnimationFrame(() => {
          getStyle();
          resizeTick = false;
        });
      }
    };

    window.addEventListener("resize", handleResize)

    return () => {
        window.removeEventListener("resize", handleResize);
    }
  }, [containerRef, itemClass, innerClass, outerClass, ratio]);
}
