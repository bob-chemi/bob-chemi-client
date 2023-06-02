/* eslint-disable no-useless-catch */
import { requestData } from './constansts'
export const authRequest = {
  userLogin: async (userData: { email: string; password: string }) => {
    try {
      const { data } = await requestData('/auth/login', 'post', userData)
      return data
    } catch (error) {
      throw error
    }
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
    try {
      const { data } = await requestData('/auth/login', 'post', userData)
      return data
    } catch (error) {
      throw error
    }
  },
  userLogout: async () => {
    try {
      const { data } = await requestData('/auth/logout', 'post')
      return data
    } catch (error) {
      throw error
    }
  },
  userSMS: async (phone: string) => {
    try {
      const { data } = await requestData('/auth/sms', 'post', { phone })
      return data
    } catch (error) {
      throw error
    }
  },
  checkSMS: async (phone: string, token: string) => {
    try {
      const { data } = await requestData('/auth/sms/check', 'post', { phone, token })
      return data
    } catch (error) {
      throw error
    }
  },
}
