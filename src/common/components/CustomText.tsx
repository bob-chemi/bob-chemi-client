import React from 'react'
import styled from 'styled-components/native'
import type { Variant } from '../style/theme'
import theme from '../style/theme'
interface CustomTextProps {
  variant?: Variant
  fontSize?: 16 | 18 | 20 | 24
  fontWeight?: 400 | 600 | 800
  children: string | string[]
}
const Text = styled.Text<CustomTextProps>`
  color: ${({ variant }) => (variant ? theme.colors[variant] : '#000000')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + 'px' : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 300)};
`

const CustomText = ({ variant, fontSize, fontWeight, children }: CustomTextProps) => {
  return (
    <Text variant={variant} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  )
}

export default CustomText
