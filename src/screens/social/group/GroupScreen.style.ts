import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  height: ${SCREEN_HEIGHT}px;  
  justify-content: space-between; 
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
  marginVertical: 7px;  
  width: ${(SCREEN_WIDTH - 70) / 2}px;
  height: ${(SCREEN_WIDTH - 70) / 2}px;
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
`

/* PostSocialScreen */
export const PostContainer = styled.View`
  flex: 1;
  padding-top: ${({ theme }) => theme.paddings.default};
  paddingHorizontal: ${({ theme }) => theme.paddings.default};  
  height: ${SCREEN_HEIGHT}px;
  align-items: center;
`

export const PostBtn = styled.TouchableOpacity`
  margin-top: 20px;
  backgroundColor: ${theme.colors.primary};
  width: 80px;
  padding: 5px;
  border-radius: 10px;
  align-items: center;
`

export const PostBtnText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: white;
`