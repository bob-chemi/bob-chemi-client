import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/auth/login/LoginScreen'
import RegisterScreen from '@/screens/auth/register/RegisterScreen'
import ChatRoom from '@/screens/chat/ChatRoom'
import IntroduceMatchingScreen from '@/screens/matching/components/IntroduceMatchingScreen'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import PostSocialScreen from '@/screens/social/PostSocialScreen'
import SocialScreen from '@/screens/social/SocialScreen'

export type StackParamList = {
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  SocialScreen: undefined
  PostSocialScreen: undefined
  ChatRoom: undefined
  IntroduceMatching: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="PostSocialScreen" component={PostSocialScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="IntroduceMatching" component={IntroduceMatchingScreen} />
    </Stack.Navigator>
  )
}

export default StackNav
