import { atom } from 'recoil'
import { JoinedRoomData } from '@/types/chatRoomTypes'

type MatchingState = {
  isMatching: boolean
  isMatched: boolean
  isOnChatRoom: boolean
  matchingInfo?: JoinedRoomData
}

export const matchingStatesAtom = atom<MatchingState>({
  key: 'matchingStatesAtom',
  default: {
    isMatching: false,
    isMatched: false,
    isOnChatRoom: false,
    matchingInfo: undefined,
  },
})
