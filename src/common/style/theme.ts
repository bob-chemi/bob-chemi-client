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

export interface ThemeProps {
  colors: Colors
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

const theme: ThemeProps = {
  colors,
}

export default theme
