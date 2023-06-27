import { BASE_URL } from '@env'
import axios, { AxiosRequestConfig } from 'axios'
import { getStorage } from '@/utils/storage'

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
}
const BOBServer = axios.create(config)

// accessToken이 있으면 실어 보냄
BOBServer.interceptors.request.use(async config => {
  const token = await getStorage('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
export default BOBServer
