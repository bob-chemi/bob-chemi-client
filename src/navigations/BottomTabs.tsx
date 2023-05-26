import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/screens/home/Home'
import LoginPage from '@/screens/register/LoginPage'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="LoginPage" component={LoginPage} />
    </Tab.Navigator>
  )
}

export default BottomTabs
