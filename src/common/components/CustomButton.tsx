import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

type Variant = 'success' | 'primary' | 'gray100' | 'gray200' | 'gray300' | 'gray500'

interface CustomButtonProps {
  children?: string
  color?: string
  disabled?: boolean
  variant?: Variant
}

type ButtonViewProp = Pick<CustomButtonProps, 'disabled' | 'variant'>

type ButtonTextProp = Pick<CustomButtonProps, 'color' | 'variant'>

const FULL_WIDTH = SCREEN_WIDTH - 48

const ButtonView = styled.View<ButtonViewProp>`
  background-color: ${({ theme, disabled, variant }) =>
    disabled ? theme.colors['gray200'] : variant && theme.colors[variant]};
  width: ${FULL_WIDTH}px;
  height: 62px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
const ButtonText = styled.Text<ButtonTextProp>`
  color: ${({ color, theme, variant }) => color || (variant && theme.colors[variant]) || theme.colors['black']};
  font-size: 14px;
  font-weight: bold;
`

const CustomButton = ({ children, disabled, variant, color }: CustomButtonProps) => {
  return (
    <ButtonView disabled={disabled} variant={variant}>
      <ButtonText color={color}>{children}</ButtonText>
    </ButtonView>
  )
}

export default CustomButton
