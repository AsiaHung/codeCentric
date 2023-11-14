import { Repo } from '@/types/responses/Repo'
import getProjects from './getProjects'
import { Employee } from '@/types/common/Employee'

const getEmployees = (getAllRepos: Repo[]): Employee => {
  const owner = getAllRepos[0].owner
  return {
    login: owner.login,
    id: owner.id,
    url: owner.url,
    html_url: owner.html_url,
    repos_url: owner.repos_url,
    projects: getProjects(getAllRepos),
  }
}

export default getEmployees
