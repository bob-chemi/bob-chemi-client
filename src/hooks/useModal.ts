import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { modalStatesAtom } from '@/recoil/atoms/modalStatesAtom'

interface OpenModalProps {
  content: JSX.Element | string
}

// Modal 사용을 위한 훅
export const useModal = () => {
  const [modalState, setModalState] = useRecoilState(modalStatesAtom)

  const openModal = useCallback(
    ({ content }: OpenModalProps) => {
      setModalState({
        isOpen: true,
        content,
      })
    },
    [setModalState]
  )

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      content: '',
    })
  }, [setModalState])

  const changeModal = useCallback(
    ({ content }: OpenModalProps) => {
      setModalState(prev => {
        return {
          ...prev,
          content,
        }
      })
    },
    [setModalState]
  )

  return { modalState, openModal, closeModal, changeModal }
}
