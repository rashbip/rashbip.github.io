// ===== INITIALIZE ON DOM READY =====
document.addEventListener("DOMContentLoaded", () => {
  initOilPaintingCanvas()
  initDustParticles()
  initQuillCursor()
  initNavigation()
  initScrollReveal()
  initCurrentYear()
})

// ===== OIL PAINTING CANVAS =====
function initOilPaintingCanvas() {
  const canvas = document.getElementById("oil-canvas")
  const ctx = canvas.getContext("2d")

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 6
    drawOilPainting()
  }

  function drawOilPainting() {
    const width = canvas.width
    const height = canvas.height

    // Base gradient - deep baroque colors
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "#1a1410")
    gradient.addColorStop(0.2, "#2d1f1a")
    gradient.addColorStop(0.4, "#1f1815")
    gradient.addColorStop(0.6, "#261a14")
    gradient.addColorStop(0.8, "#1a1612")
    gradient.addColorStop(1, "#0f0d0b")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Oil brush strokes
    const colors = [
      "rgba(139, 90, 43, 0.1)",
      "rgba(101, 67, 33, 0.08)",
      "rgba(160, 82, 45, 0.06)",
      "rgba(89, 60, 31, 0.12)",
      "rgba(205, 133, 63, 0.05)",
      "rgba(45, 31, 26, 0.15)",
    ]

    for (let i = 0; i < 500; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const strokeWidth = Math.random() * 100 + 20
      const strokeHeight = Math.random() * 20 + 5
      const rotation = Math.random() * Math.PI

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.beginPath()
      ctx.ellipse(0, 0, strokeWidth, strokeHeight, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // Dramatic light spots
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 200 + 100

      const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      lightGradient.addColorStop(0, "rgba(255, 200, 100, 0.08)")
      lightGradient.addColorStop(0.5, "rgba(200, 150, 80, 0.03)")
      lightGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = lightGradient
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }

    // Craquelure effect (aged painting cracks)
    ctx.strokeStyle = "rgba(30, 20, 10, 0.15)"
    ctx.lineWidth = 0.5

    for (let i = 0; i < 100; i++) {
      const startX = Math.random() * width
      const startY = Math.random() * height
      ctx.beginPath()
      ctx.moveTo(startX, startY)

      let currentX = startX
      let currentY = startY
      const segments = Math.floor(Math.random() * 5) + 2

      for (let j = 0; j < segments; j++) {
        currentX += (Math.random() - 0.5) * 50
        currentY += (Math.random() - 0.5) * 50
        ctx.lineTo(currentX, currentY)
      }
      ctx.stroke()
    }
  }

  resize()
  window.addEventListener("resize", resize)

  // Parallax scroll effect
  let scrollY = 0
  window.addEventListener(
    "scroll",
    () => {
      scrollY = window.scrollY
      canvas.style.transform = `translateY(-${scrollY * 0.5}px)`
    },
    { passive: true },
  )
}

// ===== DUST PARTICLES =====
function initDustParticles() {
  const container = document.getElementById("dust-container")

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.className = "dust-particle"

    const size = Math.random() * 3 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 8
    const duration = Math.random() * 10 + 8

    particle.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `

    container.appendChild(particle)
  }
}

// ===== QUILL CURSOR =====
function initQuillCursor() {
  const cursor = document.getElementById("quill-cursor")
  const inkDrip = document.getElementById("ink-drip")

  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX - 5 + "px"
    cursor.style.top = mouseY - 25 + "px"
    cursor.classList.add("visible")
  })

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("visible")
  })

  document.addEventListener("mousedown", () => {
    cursor.classList.add("writing")
    inkDrip.style.display = "block"
  })

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("writing")
    inkDrip.style.display = "none"
  })
}

// ===== NAVIGATION =====
function initNavigation() {
  const nav = document.getElementById("vintage-nav")

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 100) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    },
    { passive: true },
  )

  // Smooth scroll for nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll(".scroll-reveal")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number.parseInt(entry.target.dataset.delay) || 0
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, delay)
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  reveals.forEach((el) => observer.observe(el))
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
  const yearEl = document.getElementById("current-year")
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear()
  }
}
