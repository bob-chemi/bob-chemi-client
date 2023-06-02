import React from 'react'
import styled from 'styled-components/native'
import type { Variant } from '../style/theme'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

interface CustomButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  variant?: Variant
  width?: number
  height?: number
  fullWidth?: boolean
  onPress?: () => void
  borderRadius?: number
  justyfyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
}

type ButtonViewProp = Pick<
  CustomButtonProps,
  | 'disabled'
  | 'variant'
  | 'width'
  | 'fullWidth'
  | 'borderRadius'
  | 'height'
  | 'justyfyContent'
  | 'flexDirection'
  | 'alignItems'
>

const FULL_WIDTH = SCREEN_WIDTH - 48

const TouchableButton = styled.TouchableOpacity<ButtonViewProp>`
  background-color: ${({ theme, disabled, variant }) =>
    disabled ? theme.colors['gray200'] : variant && theme.colors[variant]};
  width: ${({ fullWidth, width }) => (fullWidth ? FULL_WIDTH + 'px' : width ? width + 'px' : '50%')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius + 'px' : '0px')};
  justify-content: ${({ justyfyContent }) => justyfyContent || 'center'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  height: ${({ height }) => (height ? height + 'px' : '100%')};
`

const CustomButton = ({
  children,
  disabled,
  variant,
  width,
  height,
  fullWidth,
  onPress,
  borderRadius,
  justyfyContent,
  flexDirection,
  alignItems,
}: CustomButtonProps) => {
  return (
    <TouchableButton
      disabled={disabled}
      variant={variant}
      width={width}
      fullWidth={fullWidth}
      onPress={onPress}
      borderRadius={borderRadius}
      height={height}
      justyfyContent={justyfyContent}
      flexDirection={flexDirection}
      alignItems={alignItems}
    >
      {children}
    </TouchableButton>
  )
}

export default CustomButton
