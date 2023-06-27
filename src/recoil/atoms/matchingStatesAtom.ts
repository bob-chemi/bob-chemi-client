import { atom } from 'recoil'

type MatchingState = {
  isMatching: boolean
  isMatched: boolean
  isOnChatRoom: boolean
}

export const matchingStatesAtom = atom<MatchingState>({
  key: 'matchingStatesAtom',
  default: {
    isMatching: false,
    isMatched: false,
    isOnChatRoom: false,
  },
})
