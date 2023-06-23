import { atom } from 'recoil'

type MatchingState = boolean

export const matchingStatesAtom = atom<MatchingState>({
  key: 'matchingStatesAtom',
  default: false,
})
