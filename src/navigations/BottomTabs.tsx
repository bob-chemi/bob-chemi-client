import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/screens/home/Home'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import LoginScreen from '@/screens/register/login/LoginScreen'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PreviewScreen" component={PreviewScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabs
