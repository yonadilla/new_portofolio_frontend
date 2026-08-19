// hooks/useElementSize.ts
"use client"
import { useCallback, useRef, useState } from "react"

interface ElementSize {
  width: number
  height: number
}

export function useElementSize<T extends HTMLElement>() {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)

  const ref = useCallback((node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (!node) return

    const { width, height } = node.getBoundingClientRect()
    setSize({ width, height })

    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    observerRef.current.observe(node)
  }, [])

  return { ref, ...size }
}