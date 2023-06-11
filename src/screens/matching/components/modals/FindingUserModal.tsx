import Lottie from 'lottie-react-native'
import React from 'react'
import { Button } from 'react-native'

import * as S from './FindingUserModal.style'
import { useModal } from '@/hooks/useModal'

const FindingUserModal = () => {
  const { closeModal } = useModal()

  return (
    <S.FindingUserModalLayout>
      <Lottie source={require('@assets/lotties/find-people.json')} autoPlay loop autoSize />
      <S.Text>식사 메이트를 찾고 있습니다</S.Text>
      <S.Text>잠시만 기다려주세요!</S.Text>
      <Button title="확인" onPress={closeModal} />
    </S.FindingUserModalLayout>
  )
}

export default FindingUserModal
