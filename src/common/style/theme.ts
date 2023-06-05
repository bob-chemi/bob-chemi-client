type Colors = {
  primary: string
  gray500: string
  gray400: string
  gray300: string
  gray200: string
  gray100: string
  success: string
  white: string
  black: string
}

interface Padding {
  default: string
}

export type Variant =
  | 'success'
  | 'primary'
  | 'gray100'
  | 'gray200'
  | 'gray300'
  | 'gray400'
  | 'gray500'
  | 'white'
  | 'black'
export type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
export type FlexDriection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type AlignItems = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
export interface FlexInterface {
  flex?: number
  flexDirection?: FlexDriection
  justifyContent?: JustifyContent
  alignItems?: AlignItems
}

export interface PaddingAndMargin {
  p?: number
  pl?: number
  pr?: number
  pt?: number
  pb?: number
  m?: number
  ml?: number
  mr?: number
  mt?: number
  mb?: number
}

export interface ThemeProps {
  colors: Colors
  paddings: Padding
}

const colors: Colors = {
  primary: '#ff7622',
  gray500: '#32343e',
  gray400: '#98a8b8',
  gray300: '#B9C5D1',
  gray200: '#D8E2EC',
  gray100: '#e8eff5',
  success: '#7bcc85',
  white: '#ffffff',
  black: '#000000',
}

const paddings: Padding = {
  default: '24px',
}

const theme: ThemeProps = {
  colors,
  paddings,
}

export default theme
