import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const Container = styled.View`
  flex: 1;
  padding-top: 15px;
  paddingHorizontal: 20px;
  height: ${SCREEN_HEIGHT}px;
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

export const CreateButton = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  borderRadius: 25px;
  backgroundColor: ${theme.colors.primary};
  right: 15px;
  bottom: 15px;
  justify-content: center;
  align-items: center;
`