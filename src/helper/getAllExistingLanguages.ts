import EmployeeLanguages from '@/types/common/EmployeeLanguages'

const getAllExistingLanguages = (languages: EmployeeLanguages[]): string[] =>
  languages.reduce((pre, cur) => {
    Object.keys(cur.languages).forEach((language) => {
      if (!pre.includes(language)) {
        pre.push(language)
      }
    })
    return pre
  }, [] as string[])

export default getAllExistingLanguages
