import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const Container = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
  paddingHorizontal: ${({ theme }) => theme.paddings.default};  
`

export const TabViewContainer = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
  margin-top: 5px;
`

export const TabArea = styled.View`
  flexDirection: row;
  justify-content: flex-start;
  margin-top: 15px;
  height: 40px;
`

export const TabText = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? theme.colors.black : theme.colors.gray400)};
  font-size: 20px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  padding-top: 10px;
  height: ${SCREEN_HEIGHT}px;  
  justify-content: space-between; 
`