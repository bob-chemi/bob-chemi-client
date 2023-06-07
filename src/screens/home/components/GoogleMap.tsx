import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import SlidingUpPanel from 'rn-sliding-up-panel'
import AutoCompleteSearchBar from './AutoCompleteSearchBar'
import * as S from './GoogleMap.style'
import RestaurantsSlider from './RestaurantsSlider'
import RestaurantNormalIcon from '@/assets/icons/restaurantNormal.svg'

interface GoogleMapProps {
  currentLocation: Region
  nearByRestaurants: any[]
}

const GoogleMap = ({ currentLocation, nearByRestaurants }: GoogleMapProps) => {
  // Navigation
  const navigation = useNavigation()
  //States
  const [sliderShowing, setSliderShowing] = useState(false)
  // AutoCompleteSearchBar 에서 검색한 식당 정보
  const [searchedRestaurant, setSearchedRestaurant] = useState<any>(null)
  // Refs
  const restaurantSliderRef = useRef<SlidingUpPanel>(null)

  // Functions
  const showRestaurantDetail = (restaurant: any) => {
    // console.log(restaurant)
    if (restaurantSliderRef.current) {
      restaurantSliderRef.current.show()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      navigation.navigate('RestaurantsDetail', { item: restaurant, fetchDetailInfo: true })
    }
  }

  // 디버깅
  // useEffect(() => {
  //   console.log('마커 렌더링', nearByRestaurants)
  // }, [nearByRestaurants])

  return (
    <S.Layout>
      {!sliderShowing && (
        <AutoCompleteSearchBar currentLocation={currentLocation} sliderPanelRef={restaurantSliderRef} />
      )}

      <MapView
        style={{ flex: 1 }}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        zoomControlEnabled
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211,
        }}
      >
        {nearByRestaurants &&
          nearByRestaurants.map((restaurant, index) => {
            const { lat, lng } = restaurant.geometry.location
            return (
              <Marker
                key={index}
                title={restaurant.name}
                description={restaurant.vicinity}
                coordinate={{ latitude: lat ? lat : 0, longitude: lng ? lng : 0 }}
                onPress={() => showRestaurantDetail(restaurant)}
              >
                <View>
                  <RestaurantNormalIcon width={30} height={30} />
                </View>
              </Marker>
            )
          })}
      </MapView>
      <RestaurantsSlider
        nearByRestaurants={nearByRestaurants}
        ref={restaurantSliderRef}
        setSliderShowing={setSliderShowing}
      />
    </S.Layout>
  )
}

export default GoogleMap
