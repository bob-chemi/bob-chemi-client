import styled from 'styled-components/native'

export const FoundUserModalLayout = styled.View`
  justify-content: center;
  align-items: center;
`

export const LottieWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const TextWrapper = styled.View`
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: black;
`

export const Button = styled.TouchableOpacity`
  margin-top: 20px;
  width: 50%;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`

export const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`
