import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '@/screens/home/Home'
import LoginScreen from '@/screens/login/LoginScreen'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import RegisterScreen from '@/screens/register/RegisterScreen'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PreviewScreen" component={PreviewScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
    </Tab.Navigator>
  )
}

export default BottomTabs
