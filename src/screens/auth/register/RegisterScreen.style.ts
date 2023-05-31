import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

export const Container = styled.View`
  flex: 1;
  background-color: #32343e;
`
export const MainTextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
export const MainText = styled.Text`
  color: #fff;
  font-size: 40px;
  font-weight: 600;
`
export const ScrollView = styled.ScrollView`
  flex: 1;
`
export const TextInputForm = styled.KeyboardAvoidingView`
  background-color: #fff;
  padding: 24px;
`
export const InputWrapper = styled.View`
  border-radius: 40px;
  margin-top: 20px;
`
export const InputLabel = styled.Text<{ validation?: boolean }>`
  font-size: 13px;
  color: #ff7622;
  margin-bottom: 10px;
`
export const LoginInput = styled.TextInput<{ validate: string }>`
  background-color: #f0f5fa;
  width: ${SCREEN_WIDTH - 48}px;
  padding-left: 20px;
  border-color: ${({ validate }) => (validate ? '#ff7622' : 'transparent')};
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
  color: #ff7622;
  font-weight: 600;
`
export const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
