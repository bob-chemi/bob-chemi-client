import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const ContentsDiv = styled.View`
  margin: 10px;
  width: ${(SCREEN_WIDTH - 80) / 2}px;
  height: ${(SCREEN_WIDTH - 80) / 2}px;
`

export const SocialImage = styled.View`
  width: 100%;
  height: 70%;
  backgroundColor: rgba(0,0,0,.5);
  alignSelf: center;
`

export const TextMain = styled.Text`
  fontSize: 15px;
  fontWeight: 800;
  color: rgba(0,0,0,1);
`

export const TextSub = styled.Text`
  fontSize: 12px;
  fontWeight: 600;
  color: rgba(0,0,0,.5);
`