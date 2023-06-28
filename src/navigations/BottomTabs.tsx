import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useRecoilValue } from 'recoil'
import ProfileStackNav from './ProfileStackNav'
import MatchingTabBar from '@/common/components/MatchingTabBar'
import theme from '@/common/style/theme'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import Chats from '@/screens/chat/Chats'
import Home from '@/screens/home/Home'
import FindUser from '@/screens/matching/FindUser'
import SocialScreen from '@/screens/social/SocialScreen'
// 앱의 하단에 존재하는 BottomTab의 param list
export type TabParamList = {
  Home: undefined
  Chat: undefined
  Matching: undefined
  Social: { tab?: string }
  Profile: undefined
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  ProfileStackNav: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

// 탭 바 아이콘 String 반환 함수
const getTabBarIcon = (route: RouteProp<TabParamList, keyof TabParamList>, focused: boolean) => {
  let iconName

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline' // focused 상태에 따라 아이콘 변경
      break
    case 'Chat':
      iconName = focused ? 'message' : 'message-outline'
      break
    case 'Matching':
      iconName = focused ? 'heart' : 'heart-outline'
      break
    case 'Social':
      iconName = focused ? 'account-group' : 'account-group-outline'
      break
    case 'Profile':
      iconName = focused ? 'account' : 'account-outline'
      break
    default:
      iconName = 'ban'
  }

  return iconName
}

const BottomTabs = () => {
  const matchingState = useRecoilValue(matchingStatesAtom)
  return (
    <Tab.Navigator
      initialRouteName="Matching"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabBarIcon(route, focused)
          if (route.name === 'Matching' && matchingState.isMatching) {
            return <MatchingTabBar color={color} size={size} iconName={iconName} />
          }
          return <Icon name={iconName} color={color} size={size} />
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chats} />
      {/** TODO: 매칭 완료되서 채팅방 생성시 누르면 채팅창으로 이동 */}
      <Tab.Screen name="Matching" component={matchingState.isMatching ? Chats : FindUser} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNav} />
    </Tab.Navigator>
  )
}

export default BottomTabs
