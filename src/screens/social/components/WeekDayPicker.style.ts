import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const TextDay = styled.Text`
  color: ${theme.colors.gray400};
  font-size: 15px;
  font-weight: 600;
  textAlign: center;
`

export const TextDate = styled.Text<{ isSelected: boolean }>`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  textAlign: center;
  backgroundColor: ${props => (props.isSelected ? theme.colors.primary : 'transparent')};
  border-radius: 20px;
  width: 35px;
`

export const DateBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${(SCREEN_WIDTH - 40) / 7}px;
`
