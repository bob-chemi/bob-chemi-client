import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack'
import MyGroupScreen from '@/screens/myGroup/MyGroupScreen'
import EditProfileScreen from '@/screens/profile/components/EditProfileScreen'
import ProfileScreen from '@/screens/profile/ProfileScreen'
export type ProfileStackParamList = {
  ProfileScreen: undefined
  EditProfileScreen: undefined
  MyGroupScreen: undefined
}
const Stack = createNativeStackNavigator<ProfileStackParamList>()

const headerOptions: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: 'transparent',
  },
}
const ProfileStackNav = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen options={{ title: '프로필' }} name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen options={{ title: '프로필 수정' }} name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen options={{ title: '나의 소모임' }} name="MyGroupScreen" component={MyGroupScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackNav
