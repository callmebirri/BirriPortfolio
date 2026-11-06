'use client'

import { useRef } from 'react'
import { useScrollTimeline } from '@/hooks/useScrollTimeline'

import BackgroundGradient from './BackgroundGradient'
import BlobField from './BlobField'
import MotifLayer from './MotifLayer'
import TechStackScene from './TechStackScene'
import Header from './Header'
import HeroIntro from './HeroIntro'
import NarrativePanelAboutMe from './NarrativePanelAboutMe'
import NarrativePanelPassions from './NarrativePanelPassions'
import ContactCTA from './ContactCTA'
import JourneyTimeline from './JourneyTimeline'

/**
 * CinematicPortfolio — root client component.
 *
 * Component tree:
 *   <main> cinematic-section (sets total scroll height)
 *     <div> cinematic-stage (sticky viewport, pinned by GSAP)
 *       Layer 0–9   World: background gradient → blob field → motif layer → stack scene
 *       Layer 10    Tint overlay (rises/falls per narrative beat)
 *       Layer 30    Header / nav
 *       Layer 20    Hero (exits early)
 *       Layer 21    NarrativePanelAboutMe (enters at 25%)
 *       Layer 22    NarrativePanelPassions (enters at 48%)
 *       Layer 23    ContactCTA (enters at 75%)
 */
export default function CinematicPortfolio() {
  // Stage refs
  const sectionRef    = useRef<HTMLElement>(null)
  const stageRef      = useRef<HTMLDivElement>(null)
  // Narrative refs
  const heroRef       = useRef<HTMLElement>(null)
  const aboutRef      = useRef<HTMLElement>(null)
  const passionsRef   = useRef<HTMLElement>(null)
  const contactRef    = useRef<HTMLElement>(null)
  // World layer refs (pointer parallax)
  const blobFieldRef  = useRef<HTMLDivElement>(null)
  const motifLayerRef = useRef<HTMLDivElement>(null)
  const stackSceneRef = useRef<HTMLDivElement>(null)
  const tintRef       = useRef<HTMLDivElement>(null)

  useScrollTimeline({
    sectionRef,
    stageRef,
    heroRef,
    aboutRef,
    passionsRef,
    stackSceneRef,
    contactRef,
    tintRef,
    blobFieldRef,
    motifLayerRef,
  })

  return (
    <main ref={sectionRef} className="cinematic-section" id="top">
      {[{ id: 'hero', progress: 0 }, { id: 'about', progress: 0.25 }, { id: 'stack', progress: 0.48 }, { id: 'contact', progress: 0.75 }].map((marker) => (
        <span
          key={marker.id}
          data-journey-marker={marker.id}
          aria-hidden="true"
          style={{ position: 'absolute', top: marker.progress === 0 ? '50svh' : `calc(${marker.progress * 100}% - ${marker.progress * 100}svh)`, left: 0, width: 1, height: 1, pointerEvents: 'none' }}
        />
      ))}
      <div ref={stageRef} className="cinematic-stage">

        {/* ── World layers (z 0–9) ────────────────────────────────── */}
        <div className="world-layer" aria-hidden="true">
          <BackgroundGradient />
          <div ref={blobFieldRef} style={{ position: 'absolute', inset: 0 }}>
            <BlobField />
          </div>
          <div ref={motifLayerRef} style={{ position: 'absolute', inset: 0 }}>
            <MotifLayer />
          </div>
          <div ref={stackSceneRef} style={{ position: 'absolute', inset: 0 }}>
            <TechStackScene />
          </div>
        </div>

        {/* ── Tint overlay (z 10) ─────────────────────────────────── */}
        <div
          ref={tintRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: 'rgba(255, 247, 249, 0.88)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* ── Header / nav (z 30) ─────────────────────────────────── */}
        <Header />
        <JourneyTimeline />

        {/* ── Narrative layers (z 20) ─────────────────────────────── */}
        <HeroIntro ref={heroRef} />
        <NarrativePanelAboutMe ref={aboutRef} />
        <NarrativePanelPassions ref={passionsRef} />
        <ContactCTA ref={contactRef} />

      </div>
    </main>
  )
}
