"use client"

import { useEffect, useRef } from "react"
import BioCard from "@/components/bio-card"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const isInitializedRef = useRef(false)

  // Define Particle class
  class Particle {
    x: number
    y: number
    size: number
    baseX: number
    baseY: number
    speedX: number
    speedY: number
    color: string
    pulseSpeed: number
    pulseDirection: number
    pulseSize: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.baseX = x
      this.baseY = y
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 0.3 - 0.15
      this.speedY = Math.random() * 0.3 - 0.15
      this.color = `rgba(${30 + Math.random() * 30}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, ${0.5 + Math.random() * 0.3})`
      this.pulseSpeed = Math.random() * 0.02 + 0.01
      this.pulseDirection = 1
      this.pulseSize = 0
    }

    update(mouseX: number, mouseY: number) {
      // Autonomous movement
      this.x += this.speedX
      this.y += this.speedY

      // Boundary check with bounce effect
      if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX *= -1
      }
      if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY *= -1
      }

      // Calculate distance from mouse
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Maximum distance, past which the particle is no longer affected by mouse
      const maxDistance = 100

      if (distance < maxDistance) {
        // Calculate force (weaker than before)
        const force = (maxDistance - distance) / maxDistance
        const directionX = dx / distance
        const directionY = dy / distance
        const moveX = directionX * force * 0.5
        const moveY = directionY * force * 0.5

        // Move away from mouse (reversed direction)
        this.x -= moveX
        this.y -= moveY
      }

      // Pulse effect
      this.pulseSize += this.pulseSpeed * this.pulseDirection
      if (this.pulseSize > 0.5 || this.pulseSize < 0) {
        this.pulseDirection *= -1
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      const size = this.size + this.pulseSize
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create animated background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reinitialize particles on resize
      if (isInitializedRef.current) {
        initializeParticles()
      }
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 12000))

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particlesRef.current.push(new Particle(x, y))
      }

      isInitializedRef.current = true
    }

    // Connect particles with lines
    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      const particles = particlesRef.current
      const connectionDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(80, 120, 255, ${opacity * 0.15})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Connect mouse to nearby particles
    const connectMouseToParticles = (ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number) => {
      const particles = particlesRef.current
      const mouseConnectionDistance = 150

      for (let i = 0; i < particles.length; i++) {
        const dx = mouseX - particles[i].x
        const dy = mouseY - particles[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseConnectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / mouseConnectionDistance
          ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.3})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(mouseX, mouseY)
          ctx.lineTo(particles[i].x, particles[i].y)
          ctx.stroke()
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const { x: mouseX, y: mouseY } = mouseRef.current

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouseX, mouseY)
        particles[i].draw(ctx)
      }

      // Connect particles with lines
      connectParticles(ctx)

      // Connect mouse to particles
      connectMouseToParticles(ctx, mouseX, mouseY)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Set up event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize
    handleResize()
    initializeParticles()
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0a1128] via-[#1c2541] to-[#0b3366] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <BioCard />
      </div>
    </main>
  )
}
