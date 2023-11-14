import systemConfig from '../config/systemConfig'
import axios, { AxiosHeaders } from 'axios'

const baseUrl = systemConfig.backendBaseURL

const header = new AxiosHeaders({
  Authorization: `Bearer ${systemConfig.token}`,
  Accept: 'application/json',
})

// getList     => GET https://api.github.com/orgs/codecentric/members
export const getListWithBaseUrl = <T, U = undefined>(
  resource: string,
  params?: U
): Promise<T> => {
  const u = (params && new URLSearchParams(params).toString()) || ''

  return axios
    .get(`${baseUrl}/${resource}?${u}`, {
      headers: header,
    })
    .then<T>((response) => {
      return response.data
    })
}

export const getList = <T, U = undefined>(
  url: string,
  params?: U
): Promise<T> => {
  const u = (params && new URLSearchParams(params).toString()) || ''

  return axios
    .get(`${url}?${u}`, {
      headers: header,
    })
    .then<T>((response) => {
      return response.data
    })
}

// getOne      => GET https://api.github.com/orgs/codecentric/members/123
export const getOneWithBaseUrl = <T, P = undefined>(
  resource: string,
  id: string,
  params?: P
): Promise<T> => {
  const u = (params && new URLSearchParams(params).toString()) || ''

  return axios
    .get(`${baseUrl}/${resource}/${id}?${u}`, {
      headers: header,
    })
    .then<T>((response) => {
      return response.data
    })
}
