/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios'
import { BOBServer } from './baseURL'
type Method = 'post' | 'get' | 'delete' | 'put' | 'patch'
type RequestFuncType = <T>(url: string, method: Method, params?: T) => Promise<AxiosResponse>

export const requestData: RequestFuncType = async (url, method, params) => {
  try {
    const res = await BOBServer.request({ url, method, params })
    return res
  } catch (error) {
    throw error
  }
}
