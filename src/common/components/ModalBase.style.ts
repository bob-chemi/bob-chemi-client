import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const ModalBackground = styled(SafeAreaView)`
  position: absolute;
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  z-index: 100;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContentWrapper = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 30px;
  padding: 24px;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.View`
  width: 100%;
`
