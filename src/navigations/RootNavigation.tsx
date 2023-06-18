import { NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import StackNav from './StackNav'
import BottomTabs, { TabParamList } from '@/navigations/BottomTabs'

// 앱의 최상단에 존재하는 RootNativeStack의 param list
// 앱 기능이 추가되어 새로운 Stack이 필요할때마다 추가
export type RootNativeStackParamList = {
  Stack: undefined
  Tab: NavigatorScreenParams<TabParamList>
}

const RootNativeStack = createNativeStackNavigator<RootNativeStackParamList>()

const RootNavigation = () => {
  return (
    <RootNativeStack.Navigator screenOptions={{ headerShown: false }}>
      {/** BottomTabs 안에 앱의 하단에서 쓸 Screen들이 존재 */}
      <RootNativeStack.Screen name="Stack" component={StackNav} />
      <RootNativeStack.Screen name="Tab" component={BottomTabs} />
    </RootNativeStack.Navigator>
  )
}

export default RootNavigation
