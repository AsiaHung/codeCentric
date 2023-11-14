import { Languages } from '@/types/common/EmployeeLanguages'
import Project from '@/types/common/Project'

const getLanguages = (projects: Project[]) =>
  projects.reduce((prev, cur) => {
    if (cur.language) {
      if (prev[cur.language] !== undefined) {
        return {
          ...prev,
          [cur.language]: prev[cur.language] + 1,
        }
      } else {
        return {
          ...prev,
          [cur.language]: 1,
        }
      }
    }
    return prev
  }, {} as Languages)

export default getLanguages
