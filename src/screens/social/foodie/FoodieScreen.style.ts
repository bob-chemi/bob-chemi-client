import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const PostItemContainer = styled.TouchableOpacity`
  flex: 1;
  height: 60px;
  justify-content: center;
`

export const PostItemTitle = styled.Text`
  font-weight: 600;
  color: ${theme.colors.black};
  marginHorizontal: ${theme.paddings.default};
`

export const PostItemSubTitle = styled.Text`
  color: ${theme.colors.gray400};
  marginHorizontal: ${theme.paddings.default};
`

export const PostItemSeparator = styled.View`
  height: 1px;
  background-color: ${theme.colors.gray200};
`

export const FoodieContainer = styled.View`
  flex: 1;
  marginHorizontal: -24px;
`

export const SearchInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: ${theme.colors.gray300};
  margin-bottom: 16px;
  paddingHorizontal: 8px;
  marginHorizontal: ${theme.paddings.default};
`

export const TotalCount = styled.Text`
  marginBottom: 8px;
  font-weight: 600;
  color: ${theme.colors.black};
  marginHorizontal: ${theme.paddings.default};
`

export const CreateButton = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  borderRadius: 25px;
  backgroundColor: ${theme.colors.primary};
  right: 39px;
  bottom: 15px;
  justify-content: center;
  align-items: center;
`

/* PostFoodieScreen */
export const PostContainer = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
  align-items: center;
`

export const TitleInput = styled.TextInput`
  padding: 10px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray200};
`

export const BtnArea = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray200};
  padding: 10px;
`

export const AttachBtn = styled.TouchableOpacity`  
  width: 30px;
  height: 24px;
`

export const ContentInput = styled.TextInput`
  padding: 10px;
  width: 100%;
`

export const Btn = styled.TouchableOpacity`
  position:absolute;
  bottom: 30px;
  margin-top: 20px;
  backgroundColor: ${theme.colors.primary};
  width: 50%;
  padding: 5px;
  border-radius: 10px;
  align-items: center;
`

export const BtnText = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: ${theme.colors.white};
`

/* FoodieDetailScreen */
export const DetailContainer = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT}px;
`

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

export const BoardDetailArea = styled.View`
  flex: 1;
  height: ${SCREEN_HEIGHT - 80}px;
  padding: ${({ theme }) => theme.paddings.default};      
`

export const ContextArea = styled.View`
  width: 100%;
  height: ${SCREEN_HEIGHT - 80}px;
`

export const ContextText = styled.Text`
  textAlignVertical: top;
  color: ${theme.colors.gray500};
`

export const IconBtnArea = styled.View`
  position: absolute;
  flexDirection: row;
  justify-content: space-around;
  right: 20px;
  bottom: 12px;
`

export const BetweenBtn = styled.TouchableOpacity`
  backgroundColor: ${theme.colors.primary};
  width: 45%;
  padding: 5px;
  border-radius: 10px;
  align-items: center;
  align-self: center;  
`