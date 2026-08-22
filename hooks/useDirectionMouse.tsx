const HOVER_DURATION = 0.25;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";



export default function useDirectionMouse<T extends HTMLElement = HTMLElement>(
  LinkClassName : string) {
  const containerNavRef = useRef<T | null>(null);
  const prevRef = useRef<number>(0);

  useGSAP(
    () => {
      const container = containerNavRef.current;

      if (!container) return;

      const handleMouseMove = (e: MouseEvent) => {
        prevRef.current = e.clientY;
      };

      window.addEventListener("mousemove", handleMouseMove);

      const links = container.querySelectorAll<HTMLElement>(LinkClassName);

      const getDirection = (
        e: MouseEvent,
        target: HTMLElement,
      ): "up" | "down" => {
        if (e.clientY > prevRef.current) return "down";
        if (e.clientY < prevRef.current) return "up";

        const BCR = target.getBoundingClientRect();
        const layerY = e.clientY - BCR.top;
        return layerY > BCR.height / 2 ? "up" : "down";
      };

      const handleEnter = (e: MouseEvent | FocusEvent) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const target = e.currentTarget as HTMLElement;
        const overlay = target.children[1] as HTMLElement;
        const overlayInner = overlay?.children[0] as HTMLElement;

        if (!overlay || !overlayInner) return;

        const way = e instanceof MouseEvent ? getDirection(e, target) : "down";

        const tl = gsap.timeline({});

        tl.set(overlay, { visibility: "visible" }, 0);
        tl.fromTo(
          overlay,
          { y: way === "down" ? "-100%" : "100%" },
          { y: "0%", duration: HOVER_DURATION, ease: "power2.out" },
          0,
        );

        tl.fromTo(
          overlayInner,
          { y: way === "down" ? "100%" : "-100%" },
          { y: "0%", duration: HOVER_DURATION, ease: "power2.out" },
          0,
        );
      };

      const handleLeave = (e: MouseEvent | FocusEvent) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const target = e.currentTarget as HTMLElement;
        const overlay = target.children[1] as HTMLElement;
        const overlayInner = overlay?.children[0] as HTMLElement;

        if (!overlay || !overlayInner) return;

        const way = e instanceof MouseEvent ? getDirection(e, target) : "down";

        const tl = gsap.timeline({});
        tl.to(
          overlay,
          {
            y: way === "down" ? "100%" : "-100%",
            duration: HOVER_DURATION,
            ease: "power2.out",
          },
          0,
        );
        tl.to(
          overlayInner,
          {
            y: way === "down" ? "-100%" : "100%",
            duration: HOVER_DURATION,
            ease: "power2.out",
          },
          0,
        );
        tl.set(overlay, { clearProps: "visibility" });
      };

      links.forEach((link) => {
        link.addEventListener("mouseenter", handleEnter);
        link.addEventListener("mouseleave", handleLeave);
        link.addEventListener("focus", handleEnter);
        link.addEventListener("blur", handleLeave);
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        links.forEach((link) => {
          link.removeEventListener("mouseenter", handleEnter);
          link.removeEventListener("mouseleave", handleLeave);
          link.removeEventListener("focus", handleEnter);
          link.removeEventListener("blur", handleLeave);
        });
      };
    },
    { scope: containerNavRef },
  );

  return containerNavRef;
}
