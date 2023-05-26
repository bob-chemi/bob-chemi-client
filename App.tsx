import { NavigationContainer } from '@react-navigation/native'
import usePermissions from '@/hooks/usePermissions'
import RootNavigation from '@/navigations/RootNavigation'

const App = () => {
  usePermissions()

  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  )
}

export default App
