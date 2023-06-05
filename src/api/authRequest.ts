/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios'
import { requestData } from './constansts'
export const authRequest = {
  userLogin: async (loginData: { id: string; password: string }) => {
    const { data } = await requestData('/auth/login', 'post', loginData)
    return data
  },
  userSignUp: async (userData: {
    id: string
    password: string
    phone: string
    name: string
    nickname: string
    gender: 'Male' | 'Female'
    age: number
  }) => {
    const { data } = await requestData('/auth/login', 'post', userData)
    return data
  },
  userLogout: async () => {
    const { data } = await requestData('/auth/logout', 'post')
    return data
  },
  userSMS: async (phone: string) => {
    const { data } = await requestData('/auth/sms', 'post', { phone })
    return data
  },
  userVerificationCode: async (phone: string, token: string) => {
    const { data } = await requestData('/auth/sms/check', 'post', { phone, token })
    return data
  },
}
