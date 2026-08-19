"use client";

import { useState } from "react";
import Logo from "./components/logo/logo";
import Navmenu from "./components/navmenu/navmenu";
import "./navbar.css";
import useStateCostume from "@/hooks/useStateCostume";
import QuickNav from "./components/quicknav/quicknav";

export default function Navbar() {
  const { isOpen, toggle } = useStateCostume();
  return (
    <header className="navbar">
      <Logo />
      <QuickNav />
      <Navmenu open={isOpen} setOpen={toggle} />
    </header>
  );
}
