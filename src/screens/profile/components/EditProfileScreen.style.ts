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
  border-radius: 150px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`
export const Img = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
export const EditIconButton = styled.Pressable`
  position: absolute;
  padding: 10px;
  background-color: ${theme.colors.white};
  border-radius: 50px;
  right: 0;
  bottom: 0;
  border: 1px solid ${theme.colors.gray400};
`
