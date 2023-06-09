import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/auth/login/LoginScreen'
import RegisterScreen from '@/screens/auth/register/RegisterScreen'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import PostGroupScreen from '@/screens/social/group/PostGroupScreen'
import SocialScreen from '@/screens/social/group/GroupScreen'

export type StackParamList = {
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  SocialScreen: undefined
  PostGroupScreen: undefined
}

const Stack = createNativeStackNavigator<StackParamList>()

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="PostGroupScreen" component={PostGroupScreen} />
    </Stack.Navigator>
  )
}

export default StackNav
