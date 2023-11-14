import { Project } from '@/types/common/Project'
import { Repo } from '@/types/responses/Repo'

const getProjects = (repo: Repo[]) =>
  repo.reduce((prev, cur) => {
    prev.push({
      id: cur.id,
      name: cur.name,
      full_name: cur.full_name,
      html_url: cur.html_url,
      forks_url: cur.forks_url,
      url: cur.url,
      language: cur.language,
    })
    return prev
  }, [] as Project[])

export default getProjects
