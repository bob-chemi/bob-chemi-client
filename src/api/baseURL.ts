import { BASE_URL } from '@env'
import axios, { AxiosRequestConfig } from 'axios'
const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
const BOBServer = axios.create(config)
export default BOBServer