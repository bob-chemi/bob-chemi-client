import axios, { AxiosRequestConfig } from 'axios'
const BASE_URL = 'http://ec2-43-201-6-212.ap-northeast-2.compute.amazonaws.com:3000'
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
export const BOBServer = axios.create(config)
