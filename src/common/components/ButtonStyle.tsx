import React from 'react'
import styled from 'styled-components/native'
interface ButtonProps {
  children: string
}
const ButtonStyle = ({ children }: ButtonProps) => {
  return (
    <ButtonView>
      <ButtonText>{children}</ButtonText>
    </ButtonView>
  )
}

export default ButtonStyle

const ButtonView = styled.View`
  background-color: #ff7622;
  width: 327px;
  height: 62px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`
