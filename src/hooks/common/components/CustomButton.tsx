import React from 'react'
import styled from 'styled-components/native'
import type { Variant, FlexInterface, PaddingAndMargin } from '../style/theme'
import { Text } from '@/screens/home/components/nearByRestaurants/ReviewCard.style'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

interface CustomButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  onPress?: () => void
}

interface ButtonStyleProps extends FlexInterface, PaddingAndMargin {
  variant?: Variant
  width?: number
  fullWidth?: boolean
  borderRadius?: number
  height?: number
}

const FULL_WIDTH = SCREEN_WIDTH - 48

const CustomButton = ({ children, disabled, onPress, ...props }: CustomButtonProps & ButtonStyleProps) => {
  return (
    <TouchableButton disabled={disabled} onPress={onPress} {...props}>
      {typeof children === 'string' ? <Text>{children}</Text> : <>{children}</>}
    </TouchableButton>
  )
}

export default CustomButton

const TouchableButton = styled.TouchableOpacity<ButtonStyleProps>`
  background-color: ${({ theme, disabled, variant }) =>
    disabled ? theme.colors['gray200'] : variant && theme.colors[variant]};
  width: ${({ fullWidth, width }) => (fullWidth ? FULL_WIDTH + 'px' : width ? width + 'px' : '50%')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius + 'px' : '0px')};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ alignItems }) => alignItems || 'center'};
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  padding: ${({ p }) => (p ? `${p}px` : '0px')};
  padding-left: ${({ pl }) => (pl ? `${pl}px` : '0px')};
  padding-right: ${({ pr }) => (pr ? `${pr}px` : '0px')};
  padding-top: ${({ pt }) => (pt ? `${pt}px` : '0px')};
  padding-bottom: ${({ pb }) => (pb ? `${pb}px` : '0px')};
  margin: ${({ m }) => (m ? `${m}px` : '0px')};
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '0px')};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0px')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '0px')};
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0px')};
`
