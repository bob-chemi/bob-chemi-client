import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NearByRestaurants from '../components/nearByRestaurants/NearByRestaurants'
import RestaurantDetail from '../components/nearByRestaurants/RestaurantDetail'

export type SliderParamList = {
  Restaurants: undefined
  RestaurantsDetail: { item: any; distance: number | null }
}

const SliderStack = createNativeStackNavigator<SliderParamList>()

const SliderStackNavigation = () => {
  return (
    <SliderStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <SliderStack.Screen name="Restaurants" component={NearByRestaurants} />
      <SliderStack.Screen name="RestaurantsDetail" component={RestaurantDetail} />
    </SliderStack.Navigator>
  )
}

export default SliderStackNavigation
