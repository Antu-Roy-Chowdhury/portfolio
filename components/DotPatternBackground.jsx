"use client"

import { useEffect, useRef } from "react"

export default function DotPatternBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const pointer = { x: -9999, y: -9999, active: false, vx: 1, vy: 0 }
    const spacing = 18
    const dotRadius = 1
    const influenceRadius = 100
    const flashLifetime = 70
    const flashes = []
    let animationFrame = null

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const distanceBetween = (a, b) => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    const normalizeVector = (x, y) => {
      const length = Math.sqrt(x * x + y * y) || 1
      return { x: x / length, y: y / length }
    }

    const createForwardLightning = () => {
      const movement = normalizeVector(pointer.vx, pointer.vy)
      const direction = { x: -movement.x, y: -movement.y }
      const visited = new Set()
      const candidates = []
      const maxCandidateDistance = 49
      const maxBranches = 9
      const maxConnections = 20

      for (let y = spacing; y < window.innerHeight; y += spacing) {
        for (let x = spacing; x < window.innerWidth; x += spacing) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const forwardness = dx * direction.x + dy * direction.y
          if (forwardness <= 12) continue

          const lateral = Math.abs(dx * -direction.y + dy * direction.x)
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > maxCandidateDistance || lateral > 26) continue

          candidates.push({
            x,
            y,
            distance,
            forwardness,
            score: forwardness - lateral * 0.3 - distance * 0.12,
          })
        }
      }

      candidates.sort((a, b) => b.score - a.score)

      const flashesToAdd = []
      const headOptions = candidates.slice(0, 18)

      for (let branchIndex = 0; branchIndex < Math.min(maxBranches, headOptions.length); branchIndex += 1) {
        const start = headOptions[branchIndex]
        const points = [{ x: pointer.x, y: pointer.y }, start]
        visited.add(`${start.x}:${start.y}`)

        let current = start
        let segments = 1

        while (segments < 5 && visited.size < maxConnections) {
          const next = candidates.find((candidate) => {
            const key = `${candidate.x}:${candidate.y}`
            if (visited.has(key)) return false
            if (distanceBetween(current, candidate) > 20) return false

            const dx = candidate.x - current.x
            const dy = candidate.y - current.y
            const forwardness = dx * direction.x + dy * direction.y
            const lateral = Math.abs(dx * -direction.y + dy * direction.x)
            return forwardness > 3 && lateral < 18
          })

          if (!next) break

          points.push(next)
          visited.add(`${next.x}:${next.y}`)
          current = next
          segments += 1
        }

        if (points.length > 1) {
          flashesToAdd.push({
            points,
            createdAt: performance.now(),
            duration: flashLifetime,
          })
        }
      }

      flashes.push(...flashesToAdd)
      if (flashes.length > 18) {
        flashes.splice(0, flashes.length - 18)
      }
    }

    const draw = () => {
      const now = performance.now()
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

      for (let index = flashes.length - 1; index >= 0; index -= 1) {
        const flash = flashes[index]
        const age = now - flash.createdAt

        if (age >= flash.duration) {
          flashes.splice(index, 1)
          continue
        }

        const life = 1 - age / flash.duration
        context.lineWidth = 0.42
        context.strokeStyle = `rgba(190, 242, 255, ${life * 0.48})`

        for (let pointIndex = 0; pointIndex < flash.points.length - 1; pointIndex += 1) {
          const from = flash.points[pointIndex]
          const to = flash.points[pointIndex + 1]
          context.beginPath()
          context.moveTo(from.x, from.y)
          context.lineTo(to.x, to.y)
          context.stroke()
        }
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    const handleMove = (event) => {
      const deltaX = event.clientX - pointer.x
      const deltaY = event.clientY - pointer.y
      if (Number.isFinite(deltaX) && Number.isFinite(deltaY) && (Math.abs(deltaX) > 0.4 || Math.abs(deltaY) > 0.4)) {
        pointer.vx = deltaX
        pointer.vy = deltaY
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      createForwardLightning()
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
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="dot-grid-bg" aria-hidden="true" />
}
