import { Project } from './Project'

export interface Employee {
  login: string
  id: number
  url: string
  html_url: string
  repos_url: string
  projects: Project[]
}
