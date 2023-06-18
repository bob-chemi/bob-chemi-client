import React, { useEffect } from 'react'
import * as S from './ModalBase.style'
import { useModal } from '@/hooks/useModal'

const ModalBase = () => {
  const {
    modalState: { isOpen, content },
    closeModal,
  } = useModal()

  // Functions
  const handleBackgroundPress = () => {
    closeModal()
  }

  // Effects

  if (!isOpen) return null

  return (
    <S.ModalBackground>
      <S.ModalContentWrapper>
        <S.ModalContent>{content}</S.ModalContent>
      </S.ModalContentWrapper>
    </S.ModalBackground>
  )
}

export default ModalBase
