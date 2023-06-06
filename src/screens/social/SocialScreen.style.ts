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

/* ContentsBox */
export const ContentsDiv = styled.View`
  margin: 10px;
  width: ${(SCREEN_WIDTH - 80) / 2}px;
  height: ${(SCREEN_WIDTH - 80) / 2}px;
`

export const SocialImage = styled.View`
  width: 100%;
  height: 70%;
  backgroundColor: ${theme.colors.gray400};
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
  color: ${theme.colors.gray400};
`

/* WeekDayPicker */
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
  backgroundColor: ${({ isSelected }) => (isSelected ? theme.colors.primary : 'transparent')};
  border-radius: 20px;
  width: 35px;
`

export const DateBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${(SCREEN_WIDTH - 40) / 7}px;
`