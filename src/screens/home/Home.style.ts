import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const HomeLayout = styled(SafeAreaView)`
  flex: 1;
  postion: relative;
`
export const TempBtn = styled.Button`
  postion: absolute;
  bottom: 40px;
  top: 70px;
  z-index: 50;
`
