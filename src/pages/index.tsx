import { Employee as EmployeeResponse } from '@/types/responses/Employee'
import Employee from '@/types/common/Employee'
import { getList, getListWithBaseUrl } from '@/apiClient/DataProvider'
import { Repo } from '@/types/responses/Repo'
import getEmployees from '@/helper/getEmployees'
import getEmployeesWithoutRepo from '@/helper/getEmployeesWithoutRepo'
import type { InferGetStaticPropsType } from 'next'
import { isEmpty } from 'lodash'
import getCountLanguages from '@/helper/getCountLanguages'

const Home = ({
  employees,
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element => {
  const employeesWithLanguages = getCountLanguages(employees)
  return (
    <section>
      <div className="home">
        {employeesWithLanguages.map((item) => (
          <div key={item.login} className="home__wrapper">
            <h1 className="home__header"> {item.login} </h1>
            <ul>
              {Object.entries(item.languages).map(([key, value]) => (
                <li key={`${item.login} ${key}`}>
                  {key} {value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

// This also gets called at build time
export async function getServerSideProps() {
  // Fetch all Codecentric members
  const data = await getListWithBaseUrl<EmployeeResponse[]>(
    'orgs/codecentric/members'
  )

  // Fetch all repositories
  const getAllRepos = await Promise.all(
    data.map((employee) => getList<Repo[]>(employee.repos_url))
  )

  // Connect repositories with Employee
  const employeeWithRepo: Employee[] = getAllRepos
    .filter((repo) => !isEmpty(repo))
    .map((repoOfOneUser) => getEmployees(repoOfOneUser))

  // Connect empty repositories with Employee
  const employeeWithoutRepo = getEmployeesWithoutRepo(data, employeeWithRepo)

  // Pass data to the page via props

  return {
    props: {
      employees: [...employeeWithoutRepo, ...employeeWithRepo],
    },
  }
}

export default Home
