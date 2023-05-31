import { NavigationContainer } from '@react-navigation/native'
import { enableLatestRenderer } from 'react-native-maps'
import { RecoilRoot } from 'recoil'
import usePermissions from '@/hooks/usePermissions'
import RootNavigation from '@/navigations/RootNavigation'

enableLatestRenderer()

const App = () => {
  usePermissions()

  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App
