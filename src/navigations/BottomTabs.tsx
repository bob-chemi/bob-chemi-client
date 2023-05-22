import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import Home from '@/screens/Home'

const Tab = createBottomTabNavigator()

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
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

export default BottomTabs
