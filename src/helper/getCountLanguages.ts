import Employee from '@/types/common/Employee'
import EmployeeLanguages from '@/types/common/EmployeeLanguages'
import getLanguages from './getLanguages'

const getCountLanguages = (employees: Employee[]): EmployeeLanguages[] =>
  employees.reduce((pre, cur) => {
    pre.push({
      login: cur.login,
      languages: getLanguages(cur.projects),
    })
    return pre
  }, [] as EmployeeLanguages[])

export default getCountLanguages
