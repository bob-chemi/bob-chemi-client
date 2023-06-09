import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const GenderCardLayout = styled.View`
  background-color: #fda163;
  width: ${SCREEN_WIDTH * 0.41}px;
  height: ${SCREEN_HEIGHT * 0.2}px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 10px;
`

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`
