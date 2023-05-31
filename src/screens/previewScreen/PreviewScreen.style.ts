import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

export const Container = styled.View`
  flex: 1;
  align-items: center;
`
export const ImageArea = styled.View`
  width: ${SCREEN_WIDTH - 48}px;
  height: 292px;
  background-color: gray;
  border-radius: 12px;
`
export const TextArea = styled.View`
  flex: 1;
  width: ${SCREEN_WIDTH}px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 40px;
  margin-bottom: 40px;
  align-items: center;
`
export const BoldText = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: #32343e;
  margin-bottom: 20px;
`
export const NomalText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #32343e;
`
export const ButtonWrapView = styled.View`
  flex: 1;
  align-items: center;
`
export const SkipText = styled.Text`
  margin-top: 15px;
`
