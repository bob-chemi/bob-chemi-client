/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios'
import { requestData } from './constansts'
export const authRequest = {
  userLogin: async (loginData: { email: string; password: string }) => {
    const { data } = await requestData('/auth/login', 'post', null, loginData)
    return data
  },
  userSignUp: async (userData: {
    email: string
    password: string
    phone: string
    name: string
    nickname: string
    gender: 'Male' | 'Female'
    age: number
  }) => {
    const { data } = await requestData('/user', 'post', null, userData)
    return data
  },
  userLogout: async () => {
    const { data } = await requestData('/auth/logout', 'post')
    return data
  },
  userSMS: async (phone: string) => {
    const { data } = await requestData('/auth/sms', 'post', null, { phone })
    return data
  },
  userVerificationCode: async (phone: string, token: string) => {
    const { data } = await requestData('/auth/sms/check', 'post', null, { phone, token })
    return data
  },
}
