import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/auth/login/LoginScreen'
import RegisterScreen from '@/screens/auth/register/RegisterScreen'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import PostSocialScreen from '@/screens/social/PostSocialScreen'
import SocialScreen from '@/screens/social/SocialScreen'

export type StackParamList = {
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  SocialScreen: undefined
  PostSocialScreen: undefined
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
    </Stack.Navigator>
  )
}

export default StackNav
