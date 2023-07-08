import { atom } from 'recoil'
import { ChatType } from '@/types/chatRoomTypes'

export const matchingChatArrayAtom = atom<ChatType[]>({
  key: 'matchingChatArray',
  default: [],
})
