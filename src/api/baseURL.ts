import { BASE_URL } from '@env'
import axios, { AxiosRequestConfig } from 'axios'
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
export const BOBServer = axios.create(config)
