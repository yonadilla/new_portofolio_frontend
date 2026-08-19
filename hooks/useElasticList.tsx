"use client";

import gsap from "gsap";
import { RefObject, useEffect } from "react";

interface ElasticListProps {
  itemClass: string;
  innerClass: string;
  outerClass: string;
}
const MIN_HEIGHT = 20;

export default function useElasticList(
  containerRef: RefObject<HTMLDivElement | null>,
  { itemClass, innerClass, outerClass }: ElasticListProps,
) {
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

    let getElement = item[0]?.getBoundingClientRect();
    let refLines = { top: 0, bottom: 0 };

    const compute = () => {
      // Reset CSS inline
      gsap.set([...item, ...inner, ...outer], { clearProps: "all" });
      gsap.set(container, { clearProps: "height" });

      if (!item[0]) return;

      getElement = item[0].getBoundingClientRect();

      // Buat garis acuan di tengah viewport
      refLines = {
        top: window.innerHeight / 2 - getElement.height / 2,
        bottom: window.innerHeight / 2 + getElement.height / 2,
      };

      container.style.height = window
        .getComputedStyle(container)
        .getPropertyValue("height");

      update();
    };

    const update = () => {
      item.forEach((items, i) => {
        const BCR = items.getBoundingClientRect();
        const distanceWithTopRefLine = BCR.top - refLines.top;

        let scaleY = 0;

        // Jika posisi kartu di bawah garis acuan tengah
        if (distanceWithTopRefLine >= 0) {
          scaleY =
            Math.abs(distanceWithTopRefLine) /
            (window.innerHeight - refLines.top);
        }

        // 1. Ubah tinggi fisik outer (efek menciut/mengembang)
        gsap.set(outer[i], {
          height: Math.floor(
            Math.max(MIN_HEIGHT, getElement.height * (1 - scaleY)),
          ),
        });

        // 2. Parallax translateY pada inner agar konten tetap rata/terkelupas halus
        gsap.set(inner[i], {
          y: (-getElement.height / 2) * scaleY,
          force3D: true,
        });
      });
    };

    compute();


    const handleScroll = () => requestAnimationFrame(update);
    let resizeTick = false;
    const handleResize = () => {
      if (!resizeTick) {
        resizeTick = true;
        requestAnimationFrame(() => {
          compute();
          resizeTick = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [itemClass]);
}
