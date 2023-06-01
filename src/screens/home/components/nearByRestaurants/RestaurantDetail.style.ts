import styled from 'styled-components/native'

export const RestaurantDetailLayout = styled.View`
  flex: 1;
`

export const ImageCarousel = styled.View`
  width: 100%;
`

export const RestaurantInfo = styled.View``

export const Location = styled.View`
  flex-direction: row;
`

interface TextProps extends Text {
  color?: string
}

export const Text = styled.Text<TextProps>`
  color: ${({ color }) => (color ? color : '#000000')};
`
