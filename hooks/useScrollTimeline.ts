'use client'

import { useEffect } from 'react'

export interface ScrollTimelineRefs {
  sectionRef:    React.RefObject<HTMLElement | null>
  stageRef:      React.RefObject<HTMLDivElement | null>
  heroRef:       React.RefObject<HTMLElement | null>
  aboutRef:      React.RefObject<HTMLElement | null>
  passionsRef:   React.RefObject<HTMLElement | null>
  projectsRef:   React.RefObject<HTMLElement | null>
  stackSceneRef: React.RefObject<HTMLDivElement | null>
  contactRef:    React.RefObject<HTMLElement | null>
  tintRef:       React.RefObject<HTMLDivElement | null>
  blobFieldRef:  React.RefObject<HTMLDivElement | null>
  motifLayerRef: React.RefObject<HTMLDivElement | null>
}

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
        passionsRef, projectsRef, stackSceneRef,
        contactRef, tintRef, blobFieldRef, motifLayerRef,
      } = refs

      const section    = sectionRef.current
      const hero       = heroRef.current
      const about      = aboutRef.current
      const passions   = passionsRef.current
      const projects   = projectsRef.current
      const stackScene = stackSceneRef.current
      const contact    = contactRef.current
      const tint       = tintRef.current

      if (!section || !hero) return

      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile  = window.matchMedia('(max-width: 768px)').matches

      if (isReduced || isMobile) {
        ;[hero, about, passions, projects, contact].forEach((el) => {
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

      gsap.ticker.lagSmoothing(0)

      const lenis = new Lenis({
        duration        : 1.1,
        easing          : (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation     : 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel     : true,
        touchMultiplier : 2,
        autoRaf         : false,
      })

      const tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)

      lenis.on('scroll', ScrollTrigger.update)

      cleanupFns.push(() => {
        gsap.ticker.remove(tickerFn)
        lenis.destroy()
      })

      const SCROLL_LENGTH = Math.max(window.innerHeight * 5, 3800)
      section.style.height = `${SCROLL_LENGTH + window.innerHeight}px`

      gsap.set(hero, { autoAlpha: 1, y: 0, pointerEvents: 'auto' })
      gsap.set([about, passions, contact].filter(Boolean), {
        autoAlpha: 0, y: 0, pointerEvents: 'none',
      })
      if (stackScene) gsap.set(stackScene, { autoAlpha: 0 })
      if (projects) gsap.set(projects, { autoAlpha: 0, y: 0, pointerEvents: 'none' })
      if (tint)       gsap.set(tint, { opacity: 0 })

      const tl = gsap.timeline({ paused: true })

      tl.to(hero, {
        autoAlpha: 0, y: -44,
        ease: 'power2.in',
        duration: 15,
        onStart()           { hero.style.pointerEvents = 'none' },
        onReverseComplete() { hero.style.pointerEvents = 'auto' },
      }, 3)

      if (tint) {
        tl.to(tint, { opacity: 0.82, ease: 'power2.out', duration: 8 }, 17)
        tl.to(tint, { opacity: 0,    ease: 'power2.in',  duration: 6 }, 38)
        tl.to(tint, { opacity: 0.82, ease: 'power2.out', duration: 5 }, 47)
        tl.to(tint, { opacity: 0,    ease: 'power2.in',  duration: 7 }, 66)
      }

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
        tl.to(about, {
          autoAlpha: 0, y: -22, ease: 'power2.in', duration: 8,
          onStart()           { about.style.pointerEvents = 'none' },
          onReverseComplete() { about.style.pointerEvents = 'auto' },
        }, 35)
      }

      if (stackScene) {
        tl.to(stackScene, { autoAlpha: 1, ease: 'power2.out', duration: 4 }, 44)
        tl.to(stackScene, { autoAlpha: 0, ease: 'power2.in',  duration: 6 }, 67)
      }

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
        tl.to(passions, {
          autoAlpha: 0, y: -22, ease: 'power2.in', duration: 6,
          onStart()           { passions.style.pointerEvents = 'none' },
          onReverseComplete() { passions.style.pointerEvents = 'auto' },
        }, 69)
      }

      if (projects) {
        tl.fromTo(projects,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 6, onStart() { projects.style.pointerEvents = 'auto' }, onReverseComplete() { projects.style.pointerEvents = 'none' } },
          69,
        )
        tl.to(projects, { autoAlpha: 0, y: -22, ease: 'power2.in', duration: 5, onStart() { projects.style.pointerEvents = 'none' }, onReverseComplete() { projects.style.pointerEvents = 'auto' } }, 75)
      }

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

      tl.set({}, {}, 100)

      const st = ScrollTrigger.create({
        trigger    : section,
        start      : 'top top',
        end        : `+=${SCROLL_LENGTH}`,
        scrub      : true,
        animation  : tl,
      })

      const projectsMM = gsap.matchMedia()
      if (projects) {
        projectsMM.add({ desktop: '(min-width: 769px)', mobile: '(max-width: 768px)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
          const { desktop, reduced } = context.conditions as { desktop: boolean; reduced: boolean }
          if (!desktop || reduced) return () => undefined
          const track = projects.querySelector<HTMLElement>('.projects-track')
          if (!track) return () => undefined
          const distance = () => Math.max(0, track.scrollWidth - projects.clientWidth + 32)
          const railTrigger = ScrollTrigger.create({
            trigger: projects,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            animation: gsap.to(track, { x: () => -distance(), ease: 'none', paused: true }),
            onToggle: (self) => { projects.dataset.pinned = String(self.isActive) },
          })
          return () => railTrigger.kill()
        })
      }

      const refreshAfterAssets = () => ScrollTrigger.refresh()
      if (document.fonts?.ready) document.fonts.ready.then(refreshAfterAssets)
      window.addEventListener('load', refreshAfterAssets, { once: true })

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

      cleanupFns.push(() => {
        window.removeEventListener('load', refreshAfterAssets)
        projectsMM.revert()
        st.kill()
        tl.kill()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    })()

    return () => {
      killed = true
      cleanupFns.forEach((fn) => fn())
    }
  }, [])
}
