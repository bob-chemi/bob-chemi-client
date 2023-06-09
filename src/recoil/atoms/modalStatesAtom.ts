import { atom } from 'recoil'

interface ModalStateAtomProps {
  isOpen: boolean
  content: JSX.Element | string
}

export const modalStatesAtom = atom<ModalStateAtomProps>({
  key: 'modalStatesAtom',
  default: {
    isOpen: false,
    content: '',
  },
})
