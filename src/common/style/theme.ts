type Colors = {
  primary: string
  gray500: string
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

export interface ThemeProps {
  colors: Colors
  paddings: Padding
}

const colors: Colors = {
  primary: '#ff7622',
  gray500: '#32343e',
  gray300: '#98a8b8',
  gray200: '#c8d3de',
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
