import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const Container = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
`

export const TabViewContainer = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
`

export const TabArea = styled.View`
  paddingHorizontal: 0px;
`

export const TabText = styled.Text<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? theme.colors.black : theme.colors.gray400)};
  font-size: 20px;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  padding-top: 10px;
  height: ${SCREEN_HEIGHT}px;  
  justify-content: space-between; 
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
export const ContentsDiv = styled.TouchableOpacity`
  marginVertical: 7px;  
  width: ${(SCREEN_WIDTH - 70) / 2}px;
  height: ${(SCREEN_WIDTH - 70) / 2}px;
`

export const GroupImage = styled.Image`
  width: 100%;
  height: 70%;
  alignSelf: center;
  resize-mode: contain;
`

export const TextMain = styled.Text`
  fontSize: 15px;
  fontWeight: 800;
  color: ${theme.colors.black};
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

/* PostGroupScreen */
export const PostContainer = styled.View`
  flex: 1;
  padding-top: ${({ theme }) => theme.paddings.default};
  paddingHorizontal: ${({ theme }) => theme.paddings.default};  
  height: ${SCREEN_HEIGHT}px;
  align-items: center;
`

export const Btn = styled.TouchableOpacity`
  margin-top: 40px;
  backgroundColor: ${theme.colors.primary};
  width: 50%;
  padding: 5px;
  border-radius: 10px;
  align-items: center;
`

export const BtnText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${theme.colors.white};
`

/* GroupDetailScreen */
export const TitleArea = styled.View`
  height: 80px;
  width: 100%;
  paddingHorizontal: ${({ theme }) => theme.paddings.default};  
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray200};
`

export const TitleText = styled.Text`
  color: ${theme.colors.black};
  font-size: 20px;
  font-weight: 600;
`

export const SubTitleText = styled.Text`
  color: ${theme.colors.gray400};
  font-size: 15px;
  font-weight: 500;
`

export const GroupDetailArea = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT - 80}px;
  padding: ${({ theme }) => theme.paddings.default};      
`
export const GroupDetailImage = styled.Image`
  width: 100%;
  height: 200px;
  resize-mode: contain;
`

export const ChipSetArea = styled.View`
  flexDirection: row;
  width: 100%;
  height: 20px;
  marginVertical: 10px;  
`

export const Chip = styled.Text`
  color: ${theme.colors.white};
  font-size: 13px;
  font-weight: 600;
  textAlign: center;
  backgroundColor: ${theme.colors.primary};
  border-radius: 20px;
  paddingHorizontal: 5px;
  marginHorizontal: 3px;
`

export const ContextArea = styled.View`
  width: 100%;
  height: 300px;
  paddingVertical: 5px;
  paddingHorizontal: 10px;
  border-width: 1px;
  border-color: ${theme.colors.gray200};
  borderRadius: 5px;
`

export const ContextText = styled.Text`
  textAlignVertical: top;
  color: ${theme.colors.gray500};
`