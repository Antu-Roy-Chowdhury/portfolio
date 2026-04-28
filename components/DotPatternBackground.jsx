"use client"

import { useEffect, useRef } from "react"

export default function DotPatternBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const pointer = { x: -9999, y: -9999, active: false }
    const spacing = 18
    const dotRadius = 1
    const influenceRadius = 120

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      context.clearRect(0, 0, width, height)

      for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const intensity = pointer.active ? Math.max(0, 1 - distance / influenceRadius) : 0
          const glow = 0.14 + intensity * 0.22
          const size = dotRadius + intensity * 0.6

          context.beginPath()
          context.arc(x, y, size, 0, Math.PI * 2)
          context.fillStyle = `rgba(233, 244, 255, ${glow})`
          context.fill()
        }
      }

      window.requestAnimationFrame(draw)
    }

    const handleMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const handleLeave = () => {
      pointer.active = false
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handleMove)
    window.addEventListener("pointerleave", handleLeave)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handleMove)
      window.removeEventListener("pointerleave", handleLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="dot-grid-bg" aria-hidden="true" />
}
