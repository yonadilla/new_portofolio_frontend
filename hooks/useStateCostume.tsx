"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useStateCostume() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const root = document.documentElement; 

    if (isOpen) {
      root.classList.add("nav_open", "no-scroll");
      root.setAttribute("data-nav", "open");
    } else {
      root.classList.remove("nav_open", "no-scroll");
      root.setAttribute("data-nav", "closed");
    }

    root.setAttribute("current-page", pathname)


    return () => {
      root.classList.remove("nav_open", "no-scroll");
      root.removeAttribute("data-nav");
    };
  }, [isOpen, pathname]);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return { isOpen, toggle, close };
}
