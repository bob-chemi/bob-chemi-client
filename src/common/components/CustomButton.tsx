import React from 'react'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

type Variant = 'success' | 'primary' | 'gray100' | 'gray200' | 'gray300' | 'gray500'

interface CustomButtonProps {
  children?: string
  color?: string
  disabled?: boolean
  variant?: Variant
  width?: number
  fullWidth?: boolean
  onPress?: () => void
  borderRadius?: boolean
}

type ButtonViewProp = Pick<CustomButtonProps, 'disabled' | 'variant' | 'width' | 'fullWidth' | 'borderRadius'>

type ButtonTextProp = Pick<CustomButtonProps, 'color' | 'variant'>

const FULL_WIDTH = SCREEN_WIDTH - 48

const TouchableButton = styled.TouchableOpacity<ButtonViewProp>`
  background-color: ${({ theme, disabled, variant }) =>
    disabled ? theme.colors['gray200'] : variant && theme.colors[variant]};
  width: ${({ fullWidth, width }) => (fullWidth ? FULL_WIDTH + 'px' : width ? width + 'px' : '50%')};
  border-radius: ${({ borderRadius }) => (borderRadius ? '20px' : 0)};
  justify-content: center;
  align-items: center;
  height: 100%;
`
const ButtonText = styled.Text<ButtonTextProp>`
  color: ${({ color, theme, variant }) => color || (variant && theme.colors[variant]) || theme.colors['black']};
  font-size: 14px;
  font-weight: bold;
`

const CustomButton = ({
  children,
  disabled,
  variant,
  color,
  width,
  fullWidth,
  onPress,
  borderRadius,
}: CustomButtonProps) => {
  return (
    <TouchableButton
      disabled={disabled}
      variant={variant}
      width={width}
      fullWidth={fullWidth}
      onPress={onPress}
      borderRadius={borderRadius}
    >
      <ButtonText color={color}>{children}</ButtonText>
    </TouchableButton>
  )
}

export default CustomButton
