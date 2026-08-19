"use client";

import { SplitText } from "gsap/SplitText";
import "./hero.css";
import Heromain from "./components/heromain/heromain";
import Herofooter from "./components/herofooter/herofooter";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);
}

export default function Hero() {
  return (
    <div className="hero_section">
      <Heromain />
      <Herofooter />
    </div>
  );
}
