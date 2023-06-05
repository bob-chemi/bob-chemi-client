import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SocialScreen from '../SocialScreen'
import CreateSocial from '../CreateSocial'

type SocialParamList = {
  SocialMain: undefined
  CreateSocial: undefined
  ViewSocialDetail: undefined
}

const SocialStack = createNativeStackNavigator<SocialParamList>()

const SocialNavigation = () => {
  return (
    <SocialStack.Navigator screenOptions={{ headerShown: false, }}>
      <SocialStack.Screen name="SocialMain" component={SocialScreen} />
      <SocialStack.Screen name="CreateSocial" component={CreateSocial} />
    </SocialStack.Navigator>
  )
}

export default SocialNavigation