/* eslint-disable no-useless-catch */
import axios, { AxiosResponse } from 'axios'
import { Alert } from 'react-native'
import { BOBServer } from './baseURL'
type Method = 'post' | 'get' | 'delete' | 'put' | 'patch'
type RequestFuncType = <T>(url: string, method: Method, params?: T) => Promise<AxiosResponse>

export const requestData: RequestFuncType = async (url, method, params) => {
  const SERVER_ERROR = 'There was an error contacting the server.'
  try {
    const res = await BOBServer.request({ url, method, params })
    if (res.status === 200) {
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
