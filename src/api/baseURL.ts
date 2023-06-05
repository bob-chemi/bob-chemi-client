import axios, { AxiosRequestConfig } from 'axios'
const BASE_URL = 'https://early-badgers-check.loca.lt'
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
export const BOBServer = axios.create(config)
