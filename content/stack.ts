export interface TechChip {
  label: string
  category: 'language' | 'framework' | 'tool'
}

export const techStack: TechChip[] = [
  // Languages
  { label: 'Java', category: 'language' },
  { label: 'Kotlin', category: 'language' },
  { label: 'C++', category: 'language' },
  { label: 'TypeScript', category: 'language' },
  { label: 'JavaScript', category: 'language' },
  { label: 'SQL', category: 'language' },
  { label: 'Python', category: 'language' },
  // Frameworks
  { label: 'React', category: 'framework' },
  { label: 'Spring Boot', category: 'framework' },
  { label: 'Flutter', category: 'framework' },
  // Tools
  { label: 'Git', category: 'tool' },
  { label: 'JetBrains', category: 'tool' },
  { label: 'Docker', category: 'tool' },
  { label: 'Kubernetes', category: 'tool' },
]

export const passions = [
  'Competitive Programming',
  'Minecraft Modding',
  'Web Development',
  'System Design',
  'Open Source',
]

export const stats = [
  { value: '15', label: 'Years Old' },
  { value: '7', label: 'Languages' },
]

export const quickFacts = [
  { label: 'Age', value: '15' },
  { label: 'Location', value: 'Lam Dong, VN' },
  { label: 'Education', value: 'Informatics Major · K15 · Bao Loc HSFTG' },
  { label: 'Status', value: 'Burning' },
]

export const timelineBeats = {
  heroHold:      [0.00, 0.03],
  heroExit:      [0.03, 0.18],
  cardSplit:     [0.15, 0.25],
  aboutMeHold:   [0.25, 0.35],
  aboutMeExit:   [0.35, 0.44],
  stackPanorama: [0.44, 0.48],
  passionsEnter: [0.48, 0.58],
  passionsHold:  [0.58, 0.69],
  worldRefocus:  [0.69, 0.74],
  contactSettle: [0.91, 1.00],
} as const
