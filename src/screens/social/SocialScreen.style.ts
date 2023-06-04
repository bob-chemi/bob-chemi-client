import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'

export const Container = styled.View`
  flex: 1;
  paddingVertical: 15px;
  paddingHorizontal: 20px;
  height: ${SCREEN_HEIGHT};
`

export const BlockTop = styled.View`
  height: 40px;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color: rgba(0,0,0,1);
  font-size: 20px;
  font-weight: 600;
`

export const WeekContainer = styled.View`
  height: 50px;
`

export const ContentsContainer = styled.View`
  flex: 1;
  height: 46px;
`
