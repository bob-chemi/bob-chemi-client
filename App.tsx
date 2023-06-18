import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from '@/navigations/RootNavigation'
import usePermissions from '@/hooks/usePermissions'

const App = () => {
  usePermissions()

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  )
}

export default App
