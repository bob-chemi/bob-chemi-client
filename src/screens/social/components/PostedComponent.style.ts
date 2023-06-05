import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const HeadTitle = styled.Text<{ height: number }>`
  textAlign: center;
  textAlignVertical: center;
  width: 15%;
  height: ${({ height }) => height}px;
  fontSize: 15px;
  fontWeight: 600;
  color: ${theme.colors.black};
`

export const Input = styled.TextInput<{ height: number, isContent: boolean }>`
  width: 85%;
  height: ${({ height }) => height}px;
  paddingVertical: 5px;
  border-color: ${theme.colors.gray200}};
  border-width: 1px;
  textAlignVertical: ${({ isContent }) => isContent ? 'top' : 'center'};
`