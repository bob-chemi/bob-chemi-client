import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyGroupScreen from '@/screens/myGroup/MyGroupScreen'
import EditProfileScreen from '@/screens/profile/components/EditProfileScreen'
import ProfileScreen from '@/screens/profile/ProfileScreen'
export type ProfileStackParamList = {
  ProfileScreen: undefined
  EditProfileScreen: undefined
  MyGroupScreen: undefined
}
const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="MyGroupScreen" component={MyGroupScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackNav
