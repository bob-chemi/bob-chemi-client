import { NavigationContainer } from '@react-navigation/native'
import { enableLatestRenderer } from 'react-native-maps'
import usePermissions from '@/hooks/usePermissions'
import RootNavigation from '@/navigations/RootNavigation'

enableLatestRenderer()

const App = () => {
  usePermissions()

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  )
}

export default App
