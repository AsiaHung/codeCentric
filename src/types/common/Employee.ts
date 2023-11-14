import Project from './Project'

interface Employee {
  login: string
  id: number
  url: string
  html_url: string
  repos_url: string
  projects: Project[]
}

export default Employee
