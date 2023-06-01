import { BOBServer } from './baseURL'

export const request = {
  loginAPI: async () => {},
  signUpAPI: async () => {},
  phoneVerificationAPI: async (phone: string) => {
    const number = '01086345895'
    if (phone === number) return '1234'
    return Error
  },
}
