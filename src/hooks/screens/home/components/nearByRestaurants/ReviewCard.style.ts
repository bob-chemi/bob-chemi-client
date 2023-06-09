import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'

export const ReviewCardLayout = styled.View`
  margin: 10px 0px;
`

export const AuthorRow = styled.View`
  flex-direction: row;
`
export const AvatarWrapper = styled.View`
  margin-right: 12px;
`

export const Avatar = styled(FastImage)``

export const AuthorInfo = styled.View`
  justify-content: space-evenly;
`

export const AuthorName = styled.Text``

export const TextWrapper = styled.View`
  padding: 10px 0px;
`

export const Text = styled.Text``
