import styled from 'styled-components/native'
import theme from '@/common/style/theme'
export const Label = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const InputLabel = styled.Text`
  font-size: 13px;
  color: ${theme.colors.primary};
  margin-bottom: 10px;
`
