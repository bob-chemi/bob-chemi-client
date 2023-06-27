export type Gender = 'Male' | 'Femail' | string
export type Token = string | null
export type User = {
  accessToken: string
  user: {
    id: string
    email: string
    phone: string
    nickname: string
    name: string
    gender: Gender
    age: number
  }
} | null
