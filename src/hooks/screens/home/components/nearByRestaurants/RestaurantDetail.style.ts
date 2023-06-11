import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

export const RestaurantDetailLayout = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`

export const ImageCarousel = styled.View`
  width: 100%;
`

export const RestaurantInfo = styled.View`
  padding: 16px;
`

export const RestaurantInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

export const IconComponent = styled(Icon)`
  margin-right: 10px;
`

export const Location = styled(RestaurantInfoRow)``

export const Distance = styled(RestaurantInfoRow)``

interface TextProps extends Text {
  color?: string
  variant?: 'success' | 'primary' | 'gray100' | 'gray200' | 'gray300'
}

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color, variant }) => color || (variant && theme.colors[variant]) || '#000000'};
`
export const OperationHoursCol = styled(RestaurantInfoRow)`
  flex-direction: row;
  align-items: flex-start;
`

export const OperationHours = styled.View``

export const PhoneNumber = styled(RestaurantInfoRow)`
  flex-direction: row;
`
export const PhoneNumberText = styled(Text)`
  text-decoration: underline;
`

export const ReviewArea = styled.View`
  padding: 16px;
  justify-content: center;
`

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const RatingRowColLeft = styled.View`
  flex-direction: row;
  align-items: center;
`

export const RatingRowColRight = styled(RatingRowColLeft)``

export const Rating = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: black;
`

export const Stars = styled.View`
  align-items: center;
`

export const ReviewRow = styled.View``
