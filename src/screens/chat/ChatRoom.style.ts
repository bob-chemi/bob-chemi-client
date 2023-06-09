import { TextProps, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const ChatRoomLayout = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`

export const ChatsArea = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.paddings.default};
`

interface ChatIsMineProps extends ViewProps {
  isMine: boolean
}

export const ChatRow = styled.View<ChatIsMineProps>`
  flex-direction: row;
  align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
`

export const ChatBubble = styled.View<ChatIsMineProps>`
  background-color: ${({ theme, isMine }) => (isMine ? theme.colors.primary : theme.colors.gray100)};
  padding: 10px 20px;
  border-radius: 20px;
  flex-wrap: wrap;
`

interface ChatTextProps extends TextProps {
  isMine: boolean
}

export const ChatText = styled.Text<ChatTextProps>`
  color: ${({ isMine }) => (isMine ? 'white' : 'black')};
`

export const ChatDate = styled.Text`
  align-self: flex-end;
  margin: 0 8px;
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

export const LottieText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`
