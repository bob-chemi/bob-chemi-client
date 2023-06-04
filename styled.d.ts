import { ThemeProps } from '@/common/style/theme'

// styled-components가 theme의 type을 추론할 수 없어서
// ThemeProps를 명시적으로 넘겨주어서 해결
declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeProps {}
}
