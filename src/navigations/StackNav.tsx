import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@/screens/auth/login/LoginScreen'
import RegisterScreen from '@/screens/auth/register/RegisterScreen'
import ChatRoom from '@/screens/chat/ChatRoom'
import ChemiRatingScreen from '@/screens/chemiRating/ChemiRatingScreen'
import IntroduceMatchingScreen from '@/screens/matching/components/IntroduceMatchingScreen'
import PreviewScreen from '@/screens/previewScreen/PreviewScreen'
import PostGroupScreen from '@/screens/social/group/PostGroupScreen'
import SocialScreen from '@/screens/social/SocialScreen'
import { Group } from '@/types/socialType'
import PostFoodieScreen from '@/screens/social/foodie/PostFoodieScreen'
import GroupDetailScreen from '@/screens/social/group/GroupDetailScreen'
import FoodieScreen from '@/screens/social/foodie/FoodieScreen'
import JoinListScreen from '@/screens/social/group/JoinListScreen'
import { ScreenType } from '@/types/postGroupTypes'

export type StackParamList = {
  PreviewScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
  SocialScreen: { tab?: string }
  FoodieScreen: undefined
  PostGroupScreen: { screenType: ScreenType, groupData?: Group };
  JoinListScreen: undefined
  ChatRoom: undefined
  IntroduceMatching: undefined
  ChemiRating: undefined
  PostFoodieScreen: undefined
  GroupDetailScreen: { group: Group }
}

const Stack = createNativeStackNavigator<StackParamList>()

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="FoodieScreen" component={FoodieScreen} />
      <Stack.Screen name="PostGroupScreen" component={PostGroupScreen} />
      <Stack.Screen name="JoinListScreen" component={JoinListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="IntroduceMatching" component={IntroduceMatchingScreen} />
      <Stack.Screen name="ChemiRating" component={ChemiRatingScreen} />
      <Stack.Screen name="PostFoodieScreen" component={PostFoodieScreen} />
      <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} />
    </Stack.Navigator>
  )
}

export default StackNav
