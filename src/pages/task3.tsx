'use client'

import { Employee as EmployeeResponse } from '@/types/responses/Employee'
import Employee from '@/types/common/Employee'
import { getList, getListWithBaseUrl } from '@/apiClient/DataProvider'
import { Repo } from '@/types/responses/Repo'
import getEmployees from '@/helper/getEmployees'
import getEmployeesWithoutRepo from '@/helper/getEmployeesWithoutRepo'
import type { InferGetStaticPropsType } from 'next'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import getCountLanguages from '@/helper/getCountLanguages'
import EmployeeWithRanking from '@/types/common/EmployeeWithRanking'
import getAllExistingLanguages from '@/helper/getAllExistingLanguages'
import { useTranslation } from 'react-i18next'

const Home = ({
  employees,
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element => {
  const [employeesWithRanking, setEmployeesWithRanking] =
    useState<EmployeeWithRanking>({})
  const employeesWithLanguages = getCountLanguages(employees)
  const { t } = useTranslation()

  const setRanking = (language: string) => {
    const rankings = employeesWithLanguages.reduce((prev, cur) => {
      if (cur.languages[language]) {
        return {
          ...prev,
          [cur.login]: cur.languages[language],
        }
      }
      return prev
    }, {} as EmployeeWithRanking)
    setEmployeesWithRanking(rankings)
  }

  return (
    <section className="task3">
      <div className="task3__head">
        <select
          className="task3__select"
          name="language"
          onChange={(event) => {
            setRanking(event.target.value)
          }}
        >
          <option value="">--{t('select', { ns: 'components' })} --</option>
          {getAllExistingLanguages(employeesWithLanguages).map((language) => (
            <option key={language} value={`${language}`}>
              {' '}
              {language}{' '}
            </option>
          ))}
        </select>
      </div>

      <div className="task3__wrapper">
        <div>
          <table>
            <thead>
              <tr>
                <th className="task3__th">
                  {t('task3.employee', { ns: 'pages' })}
                </th>
                <th className="task3__th">
                  {t('task3.ranking', { ns: 'pages' })}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(employeesWithRanking)
                .sort(([_key1, val1], [_key2, val2]) => val2 - val1)
                .map(([key, value]) => (
                  <tr key={`${key}-${value}`}>
                    <td className="task3__td"> {key} </td>
                    <td className="task3__td"> {value} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
