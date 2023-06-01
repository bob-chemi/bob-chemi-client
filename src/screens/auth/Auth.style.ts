import styled from 'styled-components/native'
import theme from '@/common/style/theme'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'
export const ScrollView = styled.ScrollView`
  flex: 1;
`
export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray500};
`

export const InputWrapper = styled.View`
  margin-top: 20px;
`
export const SeprateInput = styled.View`
  flex-direction: row;
`
export const TextInputForm = styled.KeyboardAvoidingView`
  flex: 3;
  background-color: ${theme.colors.white};
  padding: 24px;
`
export const InputLabel = styled.Text`
  font-size: 13px;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`
export const LoginInput = styled.TextInput<{ validate?: string }>`
  background-color: #f0f5fa;
  width: ${SCREEN_WIDTH - 48}px;
  padding-left: 20px;
  border-color: ${({ validate, theme }) => (validate ? theme.colors.primary : 'transparent')};
  border-width: 1px;
`

export const SaveIdLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 24px;
`
export const JoinIdLine = styled.View`
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 24px;
  flex: 1;
  align-items: center;
`
export const ColorText = styled.Text`
  color: ${theme.colors.primary};
  font-weight: 600;
`
export const Label = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
