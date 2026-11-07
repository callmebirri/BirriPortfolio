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
import ProjectsRail from './ProjectsRail'

export default function CinematicPortfolio() {
  const sectionRef    = useRef<HTMLElement>(null)
  const stageRef      = useRef<HTMLDivElement>(null)
  const heroRef       = useRef<HTMLElement>(null)
  const aboutRef      = useRef<HTMLElement>(null)
  const passionsRef   = useRef<HTMLElement>(null)
  const projectsRef   = useRef<HTMLElement>(null)
  const contactRef    = useRef<HTMLElement>(null)
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
    projectsRef,
    stackSceneRef,
    contactRef,
    tintRef,
    blobFieldRef,
    motifLayerRef,
  })

  return (
    <main ref={sectionRef} className="cinematic-section" id="top">
      <div ref={stageRef} className="cinematic-stage">
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

        <Header />
        <JourneyTimeline />

        <HeroIntro ref={heroRef} />
        <NarrativePanelAboutMe ref={aboutRef} />
        <NarrativePanelPassions ref={passionsRef} />
        <ProjectsRail ref={projectsRef} />
        <ContactCTA ref={contactRef} />
      </div>
    </main>
  )
}
