import { Employee as EmployeeResponse } from '@/types/responses/Employee'
import { Employee } from '@/types/common/Employee'
import { getList, getListWithBaseUrl } from '@/apiClient/DataProvider'
import { Repo } from '@/types/responses/Repo'
import getEmployees from '@/helper/getEmployees'
import getEmployeesWithoutRepo from '@/helper/getEmployeesWithoutRepo'
import type { InferGetStaticPropsType } from 'next'
import { isEmpty } from 'lodash'

const Home = ({
  employee,
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <section>
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
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
      employee: [...employeeWithoutRepo, ...employeeWithRepo],
    },
  }
}

export default Home
