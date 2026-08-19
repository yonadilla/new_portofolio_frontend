"use client"
import { useEffect, useState } from "react"


export function useResize(breakpoint: number = 1024) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= breakpoint)

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= breakpoint)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return isDesktop
}