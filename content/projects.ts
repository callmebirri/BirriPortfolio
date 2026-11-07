export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'locket-gold-lsposed',
    description: 'An Xposed / LSPosed module targeting the Locket application (com.locket.Locket), designed for client-side runtime analysis and instrumentation.',
    tags: ['Kotlin', 'LSPosed'],
    repoUrl: 'https://github.com/callmebirri/locket-gold-lsposed',
  },
  {
    id: 'project-2',
    title: 'DFRoot-headless',
    description: 'DFRoot Headless is an automated, headless fork of DFRoot leveraging the DirtyFrag vulnerability (CVE-2026-43284).',
    tags: ['C', 'Java'],
    repoUrl: 'https://github.com/callmebirri/DFRoot-headless',
  },
  {
    id: 'project-3',
    title: 'BirriPortfolio',
    description: 'ehm this site ( yk )',
    tags: ['React', 'NextJS', "TypeScript"],
    repoUrl: 'https://github.com/callmebirri/BirriPortfolio',
  },
  {
    id: 'project-4',
    title: 'InsureInv',
    description: 'Bukkit plugin that makes death less punishing, while keeping risk and balance.',
    tags: ['Kotlin', 'Bukkit', 'Spigot'],
    repoUrl: 'https://github.com/callmebirri/InsureInv',
  }
];
