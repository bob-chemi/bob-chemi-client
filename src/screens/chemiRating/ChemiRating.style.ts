import FastImage from 'react-native-fast-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

export const ChemiRatingLayout = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.paddings.default};
`

export const ProfileArea = styled.View``

export const ProfileWrapper = styled.View`
  align-self: center;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  margin-bottom: 20px;
`

export const ProfileImage = styled(FastImage)`
  width: ${SCREEN_WIDTH * 0.39}px;
  height: ${SCREEN_WIDTH * 0.39}px;
`

export const AskTextWrapper = styled.View``

export const AskText = styled.Text`
  font-size: 20px;
  color: #696969;
  font-weight: 600;
`

export const SliderArea = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const DefaultDegreeWrapper = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 45%;
  left: 18%;
`

export const SubmitButton = styled.TouchableOpacity`
  width: 50%;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding: 15px;
`

export const SubmitButtonText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 20px;
`

export const CustomMarker = styled.View`
  background-color: transparent;
  width: 80px;
  height: 40px;
  border-radius: 15px;
`

export const CustomLabel = styled.View`
  position: absolute;
  left: 50%;
  width: 50%;
  height: 300px;
  /* opacity: 0.3; */
  justify-content: space-between;
  align-items: flex-start;
`

export const CustomLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CustomLabelText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 20px;
`
export const CustomLabelIcon = styled(Icon)`
  transform: rotate(-90deg);
  margin-right: 10px;
`
export const CustomLabelEmpty = styled.View`
  background-color: transparent;
  width: 18px;
  margin-right: 10px;
`
