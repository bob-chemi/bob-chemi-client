export type User = {
  email: string
  password: string
  phone: string
  name: string
  nickname: string
  gender: 'Male' | 'Female'
  age: number
}
export type UserLoginReturn = {
  accessToken: string
  user: User
}
export type UserLogin = {
  email: string
  password: string
}
export type UserSMS = {
  code: number
  msg: string
}
export type UserVerificationCode = {
  data: string
}
