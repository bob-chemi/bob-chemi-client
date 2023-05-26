import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import Home from '@/screens/Home/Home'

// 앱의 하단에 존재하는 BottomTab의 param list
type TabParamList = {
  Home: undefined
  Chat: undefined
  Matching: undefined
  Social: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

// 임시 Settings 지워질 것
const Settings = () => {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  )
}

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Settings} />
      <Tab.Screen name="Matching" component={Settings} />
      <Tab.Screen name="Social" component={Settings} />
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs
