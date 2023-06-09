import { atom } from 'recoil'

export const nearByRestaurantsAtom = atom<any[]>({
  key: 'nearByRestaurantsAtom',
  default: [],
})
