import styled from 'styled-components/native'
import theme from '@/common/style/theme'

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 24px;
  margin: 20px 0;
`
export const TempBackground = styled.View`
  width: 100%;
  height: 10px;
  background-color: ${theme.colors.gray200};
  border-radius: 20px;
  overflow: hidden;
`

export const ProfileStatus = styled.View`
  background-color: ${theme.colors.gray200};
  border-radius: 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
export const ProfileImage = styled.View`
  background-color: ${theme.colors.primary};
  border-radius: 100px;
  height: 100px;
  width: 100px;
`

export const ChemistryStatus = styled.View`
  flex: 1;
  justify-content: center;
  margin: 40px 0;
`
