import { Employee as EmployeeResponse } from '@/types/responses/Employee'
import { Employee } from '@/types/common/Employee'

const getEmployeesWithoutRepo = (
  data: EmployeeResponse[],
  employeeWithRepo: Employee[]
) =>
  data.reduce((pre, cur) => {
    if (!employeeWithRepo.some((repo) => repo.login === cur.login)) {
      pre.push({
        login: cur.login,
        id: cur.id,
        url: cur.url,
        html_url: cur.html_url,
        repos_url: cur.repos_url,
        projects: [],
      })
    }
    return pre
  }, [] as Employee[])

export default getEmployeesWithoutRepo
