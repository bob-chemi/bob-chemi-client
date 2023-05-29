import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

export const TextDay = styled.Text`
  color: rgba(0,0,0,.5);
  font-size: 15px;
  font-weight: 600;
  textAlign: center;
`

export const TextDate = styled.Text<{ isSelected: boolean }>`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  textAlign: center;
  backgroundColor: ${(props) => props.isSelected ? 'rgba(255,100,30,1)' : 'transparent'};
  border-radius: 20px;
  width: 35px;
`

export const DateBtn = styled.TouchableOpacity`
  alignItems: center;
  width: ${(SCREEN_WIDTH - 40) / 7}px;
`
