import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/screens/home/Home'
import LoginScreen from '@/screens/register/LoginScreen'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabs
