import { atom } from 'recoil'
import { User } from '@/types/userType'

export const userStatesAtom = atom<User>({
  key: 'userStatesAtom',
  default: {
    id: '',
    email: '',
    phone: '',
    nickname: '',
    name: '',
    gender: 'Femail',
    age: 0,
  },
})
