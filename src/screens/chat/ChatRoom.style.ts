import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const ChatRoomLayout = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`

export const ChatsArea = styled.ScrollView`
  flex: 1;
`

export const InputArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray100};
`

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.gray100};
  flex: 1;
  border-radius: 30px;
  padding: 10px 20px;
  margin: 0 10px;
`

export const LottieWrapper = styled.View`
  height: ${SCREEN_HEIGHT}px;
  align-items: center;
  justify-content: center;
`
