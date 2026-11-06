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
 * useScrollTimeline — cinematic scroll choreography.
 *
 * Smooth-scroll stack (in order):
 *  1. Lenis intercepts all scroll input and emits continuous, eased deltas
 *     on every RAF tick (even between discrete wheel notches).
 *  2. Lenis's `scroll` event calls `ScrollTrigger.update()` so GSAP's
 *     trigger positions stay in sync with Lenis's virtual scroll position.
 *  3. GSAP's ticker `lagSmoothing` is disabled so the two RAF loops
 *     don't fight each other.
 *  4. `scrub: true` (direct 1:1 link, no GSAP-side delay) — smoothness
 *     comes from Lenis, not from GSAP scrub lag.
 *  5. The `onUpdate` manual `tl.progress()` call is REMOVED — ScrollTrigger
 *     scrubs the timeline natively (faster, no callback overhead).
 *
 * Layout/compositor fixes applied:
 *  - `contain: strict` removed from .cinematic-stage (was blocking compositor).
 *  - `will-change: transform` added to stage so the browser promotes it.
 *  - All animated panels already have `will-change: transform, opacity` via CSS.
 *  - css `html { scroll-behavior: smooth }` removed (fights Lenis).
 *  - `prefers-reduced-motion`: Lenis is destroyed, ScrollTrigger markers
 *    are off; all panels set to fully visible, no animation.
 *
 * Timeline labels (% of total duration = 100 units):
 *   0    hero enters (already visible)
 *   3    hero starts fading out
 *   18   hero fully gone
 *   20   tint rises
 *   25   about enters
 *   35   about exits start
 *   43   about gone / tint clears
 *   44   stack scene peeks in
 *   48   passions enter
 *   66   passions exit start
 *   73   passions gone / tint clears / stack fades
 *   75   contact enters
 *   88   contact fully settled
 *   100  end hold
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

      // ── Reduced motion: skip all animation ──────────────────────────────
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        ;[hero, about, passions, contact].forEach((el) => {
          if (!el) return
          el.style.opacity = '1'
          el.style.visibility = 'visible'
          el.style.transform = 'none'
          el.style.pointerEvents = 'auto'
        })
        if (stackScene) {
          stackScene.style.opacity = '1'
          stackScene.style.visibility = 'visible'
        }
        return
      }

      // ── Kill GSAP lag smoothing so it doesn't fight Lenis ───────────────
      // Lenis is the one source of scroll smoothing; GSAP should track it 1:1.
      gsap.ticker.lagSmoothing(0)

      // ── Lenis setup ─────────────────────────────────────────────────────
      const lenis = new Lenis({
        duration        : 1.1,     // smoothing window in seconds
        easing          : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation     : 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel     : true,
        touchMultiplier : 2,
        // Let Lenis drive RAF — we sync via gsap.ticker below
        autoRaf         : false,
      })

      // Drive Lenis from GSAP's RAF ticker so both run in the same frame
      const tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)

      // Wire Lenis scroll → ScrollTrigger.update so trigger positions stay in sync
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
      // Built as ONE paused timeline, scrubbed directly by ScrollTrigger.
      // No onUpdate callback — ScrollTrigger scrubs natively via its
      // internal link() mechanism (faster, same-frame, no extra overhead).
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
        // Tint clears after About exits (38 → 44)
        tl.to(tint, { opacity: 0,    ease: 'power2.in',  duration: 6 }, 38)
        // Tint rises again for Passions (47 → 52)
        tl.to(tint, { opacity: 0.82, ease: 'power2.out', duration: 5 }, 47)
        // Tint clears after Passions exits (66 → 73)
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
      // Extend the timeline to exactly 100 units so progress values in
      // navPanelMap map 1:1 to the documented timeline labels.
      // Without this, the timeline's totalDuration = 88 (last tween end),
      // and progress 0.27 would land at position 23.76 instead of 27.
      tl.set({}, {}, 100)

      // ── ScrollTrigger directly scrubs the master timeline ────────────────
      // `scrub: true` = direct 1:1 link (no GSAP-side smoothing).
      // All motion smoothness comes from Lenis's continuous deltas.

      const st = ScrollTrigger.create({
        trigger    : section,
        start      : 'top top',
        end        : `+=${SCROLL_LENGTH}`,
        scrub      : true,
        animation  : tl,           // native link — no onUpdate callback needed
      })

      // ── Navbar scroll-to helpers ──────────────────────────────────────────
      // Clicking a nav link moves the real scroll position to the target offset
      // and NOTHING else. All panel visibility/opacity/transforms are driven
      // exclusively by the one ScrollTrigger-linked timeline (st → tl), so there
      // is only ever one source of truth for "what should be visible."
      //
      // Rapid-click guard: Lenis's scrollTo() already cancels any in-flight
      // scrollTo internally when called again, so no explicit stop/start is
      // needed. We do NOT call lenis.stop()/lenis.start() here — doing so
      // desyncs Lenis's virtual scroll from window.scrollY and causes the
      // sticky stage to appear to "drift" (trôi).
      //
      // IMPORTANT: Do NOT add an onComplete callback that calls window.scrollTo()
      // or mutates lenis.scroll/lenis.target. Doing so sets the native scroll
      // position behind Lenis's back, which Lenis detects as an external scroll
      // change and re-animates toward — producing a visible "double scroll."
      // Lenis.scrollTo() with force:true already converges to the exact target.
      //
      // Duration is proportional to pixel distance (min 0.6s, max 1.8s) so
      // short jumps (e.g. About → Stack) are snappy while long jumps
      // (Contact → Hero) still feel smooth.

      // Progress values correspond to timeline positions (0–100).
      // Each value targets the midpoint of the panel's fully-visible window.
      //   about:    enters 25→33, exits 35→43, fully visible 33–35 → target 33
      //   stack:    scene 48–67, passions 56–69, both visible 56–67 → target 60
      //   contact:  enters 75→88, fully settled at 88 → target 88

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

        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (isReduced) {
          // Instant jump — no smooth scroll when user prefers reduced motion.
          window.scrollTo({ top: targetScrollY, behavior: 'instant' as ScrollBehavior })
          // Force-sync Lenis so it doesn't try to "correct" the scroll position later.
          lenis.scroll = targetScrollY
          lenis.target = targetScrollY
          ScrollTrigger.update()
          return
        }

        // Duration proportional to distance: ~0.6s for short hops, up to 1.8s
        // for full-page scrolls. 800px ≈ 0.6s, 5000px ≈ 1.8s.
        const distance = Math.abs(targetScrollY - window.scrollY)
        const duration = Math.min(1.8, Math.max(0.6, distance / 3000))

        lenis.scrollTo(targetScrollY, {
          duration,
          lock: true,            // block user scroll input during programmatic scroll
          force: true,           // force even if already at a similar position
          // Exponential ease-out that converges exactly to 1.0 — no overshoot.
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
