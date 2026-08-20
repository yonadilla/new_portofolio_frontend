"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./navmenu.css";
import SymbolX from "@/public/symbolx";
import Image from "next/image";

type NavmenuProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const TOTAL_COLS = 5;

export default function Navmenu({ open, setOpen }: NavmenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const bgColsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !closeRef.current) return;

    const cols = bgColsRef.current.filter(Boolean);
    const links = linksRef.current.filter(Boolean);

    if (open) {
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.fromTo(
        [...cols].reverse(),
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out", stagger: 0.08 },
      );

      gsap.fromTo(
        closeRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.1, ease: "power2.out" },
      );

      gsap.fromTo(
        links,
        { opacity: 0, rotateX: 90 },
        {
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2,
        },
      );
    } else {
      gsap.to(closeRef.current, {
        x: "100%",
        duration: 0.1,
        ease: "power2.in",
      });

      gsap.to([...cols].reverse(), {
        y: "-100%",
        duration: 0.1,
        ease: "power2.in",
        stagger: 0.08,
        delay: 0.1,
      });

      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in",
        delay: cols.length * 0.08 + 0.2,
      });

      gsap.to(links, { opacity: 0 });
    }

    console.log(cols)
  }, [open]);

  return (
    <nav className="navmenu_container">
      <button
        onClick={() => setOpen(true)}
        className={`navmenu_button || navmenu_header_link`}
      >
        <div className="menu_svg">
          <Image src={"/line2.svg"} alt="menuLine" width={70} height={50} />
        </div>
        <span>menu</span>
      </button>

      <div
        ref={containerRef}
        className={`navmenu_link_container ${!open ? "pointer-events-none" : "pointer-events-all"}`}
        style={{ opacity: 0 }}
      >
        <div className="navmenu_bg">
       {Array.from({ length: TOTAL_COLS }).map((_, index) => (
      <div
        key={index}
        ref={(el) => {
          bgColsRef.current[index] = el;
        }}
        className="menu_bg_col"
        style={{ transform: "translate3d(0, -100%, 0)" }}
      />
    ))}
        </div>

        <div className="navmenu_inner">
          <div
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="close_button"
            style={{ transform: "translate3d(100%, 0, 0)" }}
          >
            <div className="button_x">
              <SymbolX />
            </div>
          </div>

          <ul className="link_container">
            <li className="link">
              <a
                ref={(el) => {
                  linksRef.current[0] = el;
                }}
                className="link_text"
                href="/work"
                style={{
                  opacity: 0,
                  transform: "perspective(80vw) rotateX(-90deg)",
                }}
              >
                Work
              </a>
            </li>
            <li className="link">
              <a
                ref={(el) => {
                  linksRef.current[1] = el;
                }}
                className="link_text"
                href="/aboutme"
                style={{
                  opacity: 0,
                  transform: "perspective(80vw) rotateX(-90deg)",
                }}
              >
                Aboutme
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`navmenu_footer_container  ${open ? "navmenu_open" : ""}`}
        >
          <div className="navmenu_footer">
            <div className="navmenu_time">21:17</div>
            <div className="navmenu_addr">Blora, Indonesia</div>
          </div>
          <div className="navmenu_footer_sosmed">
            <div className="navmenu_sosmed">halo</div>
            <div className="navmenu_sosmed">halo</div>
            <div className="navmenu_sosmed">halo</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
