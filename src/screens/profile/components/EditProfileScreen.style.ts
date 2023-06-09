import styled from 'styled-components/native'
import theme from '@/common/style/theme'

export const ImageArea = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
`

export const ProfileImage = styled.View`
  height: 200px;
  width: 200px;
  background-color: ${theme.colors.primary};
  border-radius: 150;
`
