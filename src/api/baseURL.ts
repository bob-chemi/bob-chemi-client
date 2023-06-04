import axios, { AxiosRequestConfig } from 'axios'
const BASE_URL = ''
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
export const BOBServer = axios.create(config)
