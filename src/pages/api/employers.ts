import { AxiosError } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getList } from '@/apiClient/DataProvider'
import { Employee } from '@/types/responses/Employee'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Employee | string | unknown>
) => {
  const employees = getList('codecentric/members', {})
  try {
    return res.status(res.statusCode).send({ ...employees })
  } catch (error) {
    const err = error as AxiosError
    if (err?.response?.status) {
      return res.status(err?.response?.status).json({ error })
    }
    return res.status(500).json({ err })
  }
}

export default handler
