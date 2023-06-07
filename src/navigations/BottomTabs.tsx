import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { View } from 'react-native'
import ProfileStackNav from './ProfileStackNav'
import LoginScreen from '@/screens/auth/login/LoginScreen'
import RegisterScreen from '@/screens/auth/register/RegisterScreen'
import Home from '@/screens/home/Home'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import ProfileScreen from '@/screens/profile/ProfileScreen'
import SocialScreen from '@/screens/social/SocialScreen'
// 앱의 하단에 존재하는 BottomTab의 param list
type TabParamList = {
  Home: undefined
  Chat: undefined
  Matching: undefined
  Social: undefined
  Profile: undefined
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  ProfileStackNav: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()
const Settings = () => {
  return <View></View>
}
const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="PreviewScreen" component={PreviewScreen} />
      <Tab.Screen name="LoginScreen" component={LoginScreen} />
      <Tab.Screen name="RegisterScreen" component={RegisterScreen} />
      <Tab.Screen name="Chat" component={Settings} />
      <Tab.Screen name="Matching" component={Settings} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="ProfileStackNav" component={ProfileStackNav} />
    </Tab.Navigator>
  )
}

export default BottomTabs
