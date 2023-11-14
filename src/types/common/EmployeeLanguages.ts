interface EmployeeLanguages {
  login: string
  languages: Languages
}

export interface Languages {
  [key: string]: number
}

export default EmployeeLanguages
