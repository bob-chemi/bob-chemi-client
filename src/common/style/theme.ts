type Colors = {
  primary: string
  gray300: string
  gray200: string
  gray100: string
  success: string
}

export interface ThemeProps {
  colors: Colors
}

const colors: Colors = {
  primary: '#ff7622',
  gray300: '#98a8b8',
  gray200: '#c8d3de',
  gray100: '#e8eff5',
  success: '#7bcc85',
}

const theme: ThemeProps = {
  colors,
}

export default theme
