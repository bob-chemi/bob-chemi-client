export type User = {
  id: string
  email: string
  phone: string
  nickname: string
  name: string
  gender: 'Male' | 'Femail'
  age: number
} | null
