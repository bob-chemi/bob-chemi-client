import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from '@/navigations/BottomTabs'

const RootNativeStack = createNativeStackNavigator()

const RootNavigation = () => {
  return (
    <RootNativeStack.Navigator screenOptions={{ headerShown: false }}>
      {/** BottomTabs 안에 앱의 하단에서 쓸 Screen들이 존재 */}
      <RootNativeStack.Screen name="Tab" component={BottomTabs} />
    </RootNativeStack.Navigator>
  )
}

export default RootNavigation
