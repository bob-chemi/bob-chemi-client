import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'
interface ButtonProps {
  children: string
  disabled?: boolean
}
const CustomButton = ({ children, disabled }: ButtonProps) => {
  return (
    <ButtonView disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </ButtonView>
  )
}

export default CustomButton

const ButtonView = styled.View<{ disabled: boolean | undefined }>`
  background-color: ${({ disabled }) => (disabled ? '#C8D3DE' : '#ff7622')};
  width: ${SCREEN_WIDTH - 48}px;
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
