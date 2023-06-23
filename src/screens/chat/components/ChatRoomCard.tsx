import React from 'react'
import { useRecoilValue } from 'recoil'
import * as S from './ChatRoomCard.style'
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { ChatRoomProps } from '@/types/chatRoomTypes'

const ChatRoomCard = ({ createdAt, messages, user }: ChatRoomProps) => {
  const userInfo = useRecoilValue(userStatesAtom)

  return (
    <S.ChatRoomCardLayout>
      <S.Name>{userInfo ? (user[0] === userInfo.name ? user[0] : user[1]) : 'Temp'}</S.Name>
      <S.LastMessage>{messages[messages.length - 1].message}</S.LastMessage>
    </S.ChatRoomCardLayout>
  )
}

export default ChatRoomCard
