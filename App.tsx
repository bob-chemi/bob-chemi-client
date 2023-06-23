import { NavigationContainer } from '@react-navigation/native'
import { enableLatestRenderer } from 'react-native-maps'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components/native'
import ModalBase from '@/common/components/ModalBase'
import theme from '@/common/style/theme'
import { socket, SocketContext } from '@/contexts/socketContext'
import usePermissions from '@/hooks/usePermissions'
import RootNavigation from '@/navigations/RootNavigation'
enableLatestRenderer()

const queryClient = new QueryClient()

const App = () => {
  usePermissions()

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SocketContext.Provider value={socket}>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
            <ModalBase />
          </ThemeProvider>
        </SocketContext.Provider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
