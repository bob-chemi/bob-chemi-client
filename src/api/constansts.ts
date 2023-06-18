/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from 'axios'
import { Alert } from 'react-native'
import BOBServer from './baseURL'
type Method = 'post' | 'get' | 'delete' | 'put' | 'patch'
type RequestFuncType = <T, U>(url: string, method: Method, params?: T, body?: U) => Promise<AxiosResponse>
export const requestData: RequestFuncType = async (url, method, params, body) => {
  const SERVER_ERROR = 'There was an error contacting the server.'

  try {
    const res = await BOBServer.request({ url, method, params, data: body })
    console.log(res)
    if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      throw { res }
    }
  } catch (error) {
    const msg =
      axios.isAxiosError(error) && error?.response?.data?.message ? error?.response?.data?.message : SERVER_ERROR
    Alert.alert(msg)
    throw { data: null, msg }
  }
}