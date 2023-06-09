import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const GenderCardLayout = styled.Pressable`
  background-color: #fda163;
  width: ${SCREEN_WIDTH * 0.41}px;
  height: ${SCREEN_HEIGHT * 0.2}px;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 30px;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
`

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
`

export const SelectedOpacity = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 20;
  justify-content: center;
  align-items: center;
`

export const CheckIcon = styled(Icon)``
