import styled from 'styled-components/native'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '@/utils/getScreenSize'
import theme from '@/common/style/theme'

export const PostItemContainer = styled.View`
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