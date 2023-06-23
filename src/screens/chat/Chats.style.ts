import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const ChatsLayout = styled(SafeAreaView)`
  flex: 1;
  padding: ${({ theme }) => theme.paddings.default};
`
