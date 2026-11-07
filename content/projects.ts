export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  repoUrl: string
}

export const projects: Project[] = [
  { id: 'project-1', title: 'Project Title 1', description: 'Short description here', tags: ['Tag', 'Tag'], repoUrl: '#' },
  { id: 'project-2', title: 'Project Title 2', description: 'Short description here', tags: ['Tag', 'Tag'], repoUrl: '#' },
  { id: 'project-3', title: 'Project Title 3', description: 'Short description here', tags: ['Tag', 'Tag'], repoUrl: '#' },
  { id: 'project-4', title: 'Project Title 4', description: 'Short description here', tags: ['Tag', 'Tag'], repoUrl: '#' },
  { id: 'project-5', title: 'Project Title 5', description: 'Short description here', tags: ['Tag', 'Tag'], repoUrl: '#' },
]
