import { ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const FindUserLayout = styled(SafeAreaView)`
  flex: 1;
  padding: ${({ theme }) => theme.paddings.default};
`

export const Header = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const HeaderTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: black;
`

export const SubTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: black;
  margin-bottom: 24px;
`

export const GenderArea = styled.View`
  margin-bottom: 32px;
  flex: 5;
`

export const CardWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const AgeArea = styled(GenderArea)``

export const SliderLabelLayout = styled.View`
  width: 100%;
`

interface SliderLabelProps extends ViewProps {
  left: number
}

export const SliderLabelWrapper = styled.View<SliderLabelProps>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: 40px;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #fda163;
`
export const SliderLabel = styled.Text`
  font-size: 16px;
  color: black;
`

export const ButtonArea = styled.View`
  flex: 1;
`

export const FindUserButton = styled.Button``
