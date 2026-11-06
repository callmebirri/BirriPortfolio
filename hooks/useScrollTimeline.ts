'use client'

import { useEffect } from 'react'

export interface ScrollTimelineRefs {
  sectionRef:    React.RefObject<HTMLElement | null>
  stageRef:      React.RefObject<HTMLDivElement | null>
  heroRef:       React.RefObject<HTMLElement | null>
  aboutRef:      React.RefObject<HTMLElement | null>
  passionsRef:   React.RefObject<HTMLElement | null>
  stackSceneRef: React.RefObject<HTMLDivElement | null>
  contactRef:    React.RefObject<HTMLElement | null>
  tintRef:       React.RefObject<HTMLDivElement | null>
  blobFieldRef:  React.RefObject<HTMLDivElement | null>
  motifLayerRef: React.RefObject<HTMLDivElement | null>
}

/**
 * useScrollTimeline — cinematic scroll choreography for desktop,
 * bypassed on mobile (< 768px) and prefers-reduced-motion for pure native touch scroll.
 *
 * Smooth-scroll stack (desktop):
 *  1. Lenis intercepts scroll input and emits continuous, eased deltas.
 *  2. Lenis's `scroll` event calls `ScrollTrigger.update()` to stay in sync.
 *  3. GSAP's ticker `lagSmoothing` is disabled.
 *  4. `scrub: true` direct 1:1 link without extra scrub lag.
 *
 * Mobile / touch (< 768px):
 *  - Lenis and ScrollTrigger are skipped completely.
 *  - Native document flow with high-performance 120Hz touch scroll.
 *  - All panels are visible and interactive.
 */
export function useScrollTimeline(refs: ScrollTimelineRefs) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let killed = false
    const cleanupFns: Array<() => void> = []

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])
      if (killed) return

      gsap.registerPlugin(ScrollTrigger)

      const {
        sectionRef, heroRef, aboutRef,
        passionsRef, stackSceneRef,
        contactRef, tintRef, blobFieldRef, motifLayerRef,
      } = refs

      const section    = sectionRef.current
      const hero       = heroRef.current
      const about      = aboutRef.current
      const passions   = passionsRef.current
      const stackScene = stackSceneRef.current
      const contact    = contactRef.current
      const tint       = tintRef.current

      if (!section || !hero) return

      // ── Detect reduced motion or mobile viewport (< 768px) ──────────────
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile  = window.matchMedia('(max-width: 768px)').matches

      if (isReduced || isMobile) {
        ;[hero, about, passions, contact].forEach((el) => {
          if (!el) return
          el.style.opacity = '1'
          el.style.visibility = 'visible'
          el.style.transform = 'none'
          el.style.pointerEvents = 'auto'
        })
        if (stackScene) {
          stackScene.style.opacity = isMobile ? '0' : '1'
          stackScene.style.visibility = isMobile ? 'hidden' : 'visible'
        }
        if (tint) {
          tint.style.opacity = '0'
          tint.style.display = 'none'
        }

        const scrollToSection = (id: string) => {
          if (id === 'hero' || id === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
          }
          const targetEl = document.getElementById(id)
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' })
          }
        }

        ;(section as HTMLElement & { __scrollToSection?: (id: string) => void }).__scrollToSection =
          scrollToSection

        return
      }

      // ── Kill GSAP lag smoothing so it doesn't fight Lenis ───────────────
      gsap.ticker.lagSmoothing(0)

      // ── Lenis setup ─────────────────────────────────────────────────────
      const lenis = new Lenis({
        duration        : 1.1,
        easing          : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation     : 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel     : true,
        touchMultiplier : 2,
        autoRaf         : false,
      })

      // Drive Lenis from GSAP's RAF ticker so both run in the same frame
      const tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)

      // Wire Lenis scroll → ScrollTrigger.update
      lenis.on('scroll', ScrollTrigger.update)

      cleanupFns.push(() => {
        gsap.ticker.remove(tickerFn)
        lenis.destroy()
      })

      // ── Section scroll height ────────────────────────────────────────────
      const SCROLL_LENGTH = Math.max(window.innerHeight * 5, 3800)
      section.style.height = `${SCROLL_LENGTH + window.innerHeight}px`

      // ── Set initial states ───────────────────────────────────────────────
      gsap.set(hero, { autoAlpha: 1, y: 0, pointerEvents: 'auto' })
      gsap.set([about, passions, contact].filter(Boolean), {
        autoAlpha: 0, y: 0, pointerEvents: 'none',
      })
      if (stackScene) gsap.set(stackScene, { autoAlpha: 0 })
      if (tint)       gsap.set(tint, { opacity: 0 })

      // ── Master timeline (100 units) ──────────────────────────────────────
      const tl = gsap.timeline({ paused: true })

      // Hero exits (3 → 18)
      tl.to(hero, {
        autoAlpha: 0, y: -44,
        ease: 'power2.in',
        duration: 15,
        onStart()           { hero.style.pointerEvents = 'none' },
        onReverseComplete() { hero.style.pointerEvents = 'auto' },
      }, 3)

      // Tint rises for About (17 → 25)
      if (tint) {
        tl.to(tint, { opacity: 0.82, ease: 'power2.out', duration: 8 }, 17)
        tl.to(tint, { opacity: 0,    ease: 'power2.in',  duration: 6 }, 38)
        tl.to(tint, { opacity: 0.82, ease: 'power2.out', duration: 5 }, 47)
        tl.to(tint, { opacity: 0,    ease: 'power2.in',  duration: 7 }, 66)
      }

      // About enters (25 → 33)
      if (about) {
        tl.fromTo(about,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1, y: 0, ease: 'power2.out', duration: 8,
            onStart()           { about.style.pointerEvents = 'auto' },
            onReverseComplete() { about.style.pointerEvents = 'none' },
          },
          25,
        )
        // About exits (35 → 43)
        tl.to(about, {
          autoAlpha: 0, y: -22, ease: 'power2.in', duration: 8,
          onStart()           { about.style.pointerEvents = 'none' },
          onReverseComplete() { about.style.pointerEvents = 'auto' },
        }, 35)
      }

      // Stack scene enters with Passions (44 → 48), exits after Passions (67 → 73)
      if (stackScene) {
        tl.to(stackScene, { autoAlpha: 1, ease: 'power2.out', duration: 4 }, 44)
        tl.to(stackScene, { autoAlpha: 0, ease: 'power2.in',  duration: 6 }, 67)
      }

      // Passions enters (48 → 56)
      if (passions) {
        tl.fromTo(passions,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1, y: 0, ease: 'power2.out', duration: 8,
            onStart()           { passions.style.pointerEvents = 'auto' },
            onReverseComplete() { passions.style.pointerEvents = 'none' },
          },
          48,
        )
        // Passions exits (69 → 75)
        tl.to(passions, {
          autoAlpha: 0, y: -22, ease: 'power2.in', duration: 6,
          onStart()           { passions.style.pointerEvents = 'none' },
          onReverseComplete() { passions.style.pointerEvents = 'auto' },
        }, 69)
      }

      // Contact enters (75 → 88)
      if (contact) {
        tl.fromTo(contact,
          { autoAlpha: 0, y: -20 },
          {
            autoAlpha: 1, y: 0, ease: 'power2.out', duration: 13,
            onStart()           { contact.style.pointerEvents = 'auto' },
            onReverseComplete() { contact.style.pointerEvents = 'none' },
          },
          75,
        )
      }

      // ── End hold ──────────────────────────────────────────────────────────
      tl.set({}, {}, 100)

      // ── ScrollTrigger directly scrubs the master timeline ────────────────
      const st = ScrollTrigger.create({
        trigger    : section,
        start      : 'top top',
        end        : `+=${SCROLL_LENGTH}`,
        scrub      : true,
        animation  : tl,
      })

      // ── Navbar scroll-to helpers (Desktop) ────────────────────────────────
      const navPanelMap: Record<string, { progress: number }> = {
        hero    : { progress: 0    },
        about   : { progress: 0.33 },
        stack   : { progress: 0.60 },
        contact : { progress: 0.88 },
      }

      const scrollToSection = (id: string) => {
        const def = navPanelMap[id] ?? navPanelMap.hero
        const sectionTop    = section.getBoundingClientRect().top + window.scrollY
        const targetScrollY = sectionTop + def.progress * SCROLL_LENGTH

        const distance = Math.abs(targetScrollY - window.scrollY)
        const duration = Math.min(1.8, Math.max(0.6, distance / 3000))

        lenis.scrollTo(targetScrollY, {
          duration,
          lock: true,
          force: true,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      }

      ;(section as HTMLElement & { __scrollToSection?: (id: string) => void }).__scrollToSection =
        scrollToSection

      // ── Pointer parallax (fine pointer only) ────────────────────────────
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      if (!isCoarsePointer && blobFieldRef.current && motifLayerRef.current) {
        const blobEl  = blobFieldRef.current
        const motifEl = motifLayerRef.current
        const blobX   = gsap.quickTo(blobEl,  'x', { duration: 0.9, ease: 'power3' })
        const blobY   = gsap.quickTo(blobEl,  'y', { duration: 0.9, ease: 'power3' })
        const motifX  = gsap.quickTo(motifEl, 'x', { duration: 0.55, ease: 'power3' })
        const motifY  = gsap.quickTo(motifEl, 'y', { duration: 0.55, ease: 'power3' })

        const onMouseMove = (e: MouseEvent) => {
          const cx = e.clientX / window.innerWidth  - 0.5
          const cy = e.clientY / window.innerHeight - 0.5
          blobX(-cx * 14); blobY(-cy * 9)
          motifX( cx * 20); motifY( cy * 13)
        }
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        cleanupFns.push(() => window.removeEventListener('mousemove', onMouseMove))
      }

      // ── Cleanup ──────────────────────────────────────────────────────────
      cleanupFns.push(() => {
        st.kill()
        tl.kill()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    })()

    return () => {
      killed = true
      cleanupFns.forEach((fn) => fn())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
