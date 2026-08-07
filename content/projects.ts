export interface Project {
  id: string
  name: string
  description: string
  stack: string[]
  url: string
  featured: boolean
  org?: string
}

export const projects: Project[] = [
  {
    id: 'birrimonitor',
    name: 'BirriMonitor',
    description:
      'A Windows network traffic monitoring toolkit that intercepts HTTP/HTTPS requests using API hooking techniques.',
    stack: ['C++', 'MinHook', 'MSVC v145'],
    url: 'https://github.com/callmebirri/BirriMonitor',
    featured: true,
  },
  {
    id: 'eralock',
    name: 'EraLock',
    description:
      'Lock or unlock Nether and End dimensions on a Paper Minecraft server. Actually validates the full portal structure instead of just cancelling ignition.',
    stack: ['Kotlin', 'Gradle DSL', 'NMS'],
    url: 'https://github.com/callmebirri/EraLock',
    featured: true,
  },
  {
    id: 'hqngtools',
    name: 'HqngTools',
    description:
      'Custom tools for Paper/Folia that add area-of-effect block breaking, similar to DonutSMP\'s Amethyst tool.',
    stack: ['Kotlin', 'Gradle DSL'],
    url: 'https://github.com/HqngDev/HqngTools',
    featured: true,
    org: 'HqngDev',
  },
  {
    id: 'insureinv',
    name: 'InsureInv',
    description:
      'A flexible, charge-based inventory protection plugin for modern Minecraft servers.',
    stack: ['Kotlin', 'Gradle DSL'],
    url: 'https://github.com/callmebirri/InsureInv',
    featured: false,
  },
]
