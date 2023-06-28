import Lottie from 'lottie-react-native'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import * as S from './UserFoundModal.style'
import { useModal } from '@/hooks/useModal'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'

const UserFoundModal = () => {
  const setMatchingState = useSetRecoilState(matchingStatesAtom)

  const { closeModal } = useModal()

  // Functions
  const handleGoToChatRoom = () => {
    closeModal()
    setMatchingState(prev => ({ ...prev, isOnChatRoom: true }))
  }

  return (
    <S.FoundUserModalLayout>
      <S.LottieWrapper>
        <Lottie source={require('@assets/lotties/matchFound.json')} autoPlay loop={false} style={{ height: 100 }} />
      </S.LottieWrapper>
      <S.TextWrapper>
        <S.Text>식사 메이트를 찾았습니다!</S.Text>
      </S.TextWrapper>
      <S.Button onPress={handleGoToChatRoom}>
        <S.ButtonText>채팅하러 가기</S.ButtonText>
      </S.Button>
    </S.FoundUserModalLayout>
  )
}

export default UserFoundModal
