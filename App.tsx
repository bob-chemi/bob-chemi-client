import { NavigationContainer } from '@react-navigation/native'
import { enableLatestRenderer } from 'react-native-maps'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components/native'
import theme from '@/common/style/theme'
import usePermissions from '@/hooks/usePermissions'
import RootNavigation from '@/navigations/RootNavigation'

enableLatestRenderer()

const App = () => {
  usePermissions()

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default App
