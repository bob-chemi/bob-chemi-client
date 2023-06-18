import styled from 'styled-components/native'
import theme from '@/common/style/theme'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'
const FULL_WIDTH = SCREEN_WIDTH - 48
export const InputWrapper = styled.View`
  margin-top: 20px;
  justify-content: center;
  position: relative;
`
export const Label = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const InputLabel = styled.Text`
  font-size: 13px;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`
export const Input = styled.TextInput<{ validate?: string; fullWidth?: boolean }>`
  flex: 1;
  background-color: #f0f5fa;
  width: ${({ fullWidth }) => (fullWidth ? FULL_WIDTH + 'px' : '50%')};
  padding-left: 20px;
  border-color: ${({ validate, theme }) => (validate ? theme.colors.primary : 'transparent')};
  border-width: 1px;
`

export const SeprateInput = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`
export const TogglePasswordButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  right: 10px;
`
