import styled from 'styled-components/native'
import theme from '@/common/style/theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: 24px;
`
export const ScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: 24px;
`

export const TextInputForm = styled.View`
  flex: 1;
`
export const ButtonWrapper = styled.View`
  flex: 1;
  min-height: 62px;
  margin-top: 24px;
`
export const SaveIdLine = styled.View`
  flex: 1;
  height: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  flex-direction: row;
  justify-content: space-between;
`
export const JoinIdLine = styled.View`
  flex: 1;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
  align-items: center;
`
export const ColorText = styled.Text`
  color: ${theme.colors.primary};
  font-weight: 600;
`
