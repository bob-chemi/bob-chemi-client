/* eslint-disable no-useless-catch */
import { requestData } from './constansts'
import type { UserLogin, UserLoginReturn, User, UserSMS, UserVerificationCode } from '@/types/authRequestType'
export const authRequest = {
  userLogin: async (loginData: UserLogin): Promise<UserLoginReturn> => {
    const { data } = await requestData('/auth/login', 'post', loginData)
    return data
  },
  userSignUp: async (userData: User) => {
    const { data } = await requestData('/user', 'post', userData)
    return data
  },
  userLogout: async () => {
    const { data } = await requestData('/auth/logout', 'post')
    return data
  },
  userSMS: async (phone: string): Promise<UserSMS> => {
    const { data } = await requestData('/auth/sms', 'post', { phone })
    return data
  },
  userVerificationCode: async (phone: string, token: string): Promise<UserVerificationCode> => {
    const { data } = await requestData('/auth/sms/check', 'post', { phone, token })

    return data
  },
}
