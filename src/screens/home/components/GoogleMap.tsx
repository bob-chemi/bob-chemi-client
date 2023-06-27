import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker, Region } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { SliderParamList } from '../navigations/SliderStackNavigatoin'
import AutoCompleteSearchBar from './AutoCompleteSearchBar'
import * as S from './GoogleMap.style'
import RestaurantsSlider from './RestaurantsSlider'
import RestaurantFavoritelIcon from '@/assets/icons/restaurantFavorite.svg'
import RestaurantNormalIcon from '@/assets/icons/restaurantNormal.svg'
import useFavoriteRestaurant from '@/hooks/useFavoriteRestaurant'

interface GoogleMapProps {
  currentLocation: Region
  nearByRestaurants: any[]
}

type NavigationProp = NativeStackNavigationProp<SliderParamList, 'RestaurantsDetail'>

const GoogleMap = ({ currentLocation, nearByRestaurants }: GoogleMapProps) => {
  // Navigation
  const navigation = useNavigation<NavigationProp>()
  //States
  const [sliderShowing, setSliderShowing] = useState(false)
  // AutoCompleteSearchBar 에서 검색한 식당 정보
  const [searchedRestaurant, setSearchedRestaurant] = useState<any>(null)
  // Refs
  const mapViewRef = useRef<MapView>(null)
  const restaurantSliderRef = useRef<SlidingUpPanel>(null)
  // Hooks
  const { favoriteRestaurant } = useFavoriteRestaurant()

  // Functions
  const showRestaurantDetail = (restaurant: any) => {
    // console.log(restaurant)
    if (restaurantSliderRef.current) {
      restaurantSliderRef.current.show()
      navigation.navigate('RestaurantsDetail', { item: restaurant, fetchDetailInfo: true })
    }
  }

  const goToCurrentLocation = () => {
    if (mapViewRef && mapViewRef.current) {
      mapViewRef.current.animateToRegion(
        {
          ...currentLocation,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211,
        },
        1000
      )
    }
  }

  // Effects
  // 검색한 식당이 있으면 해당 식당으로 이동
  useEffect(() => {
    if (searchedRestaurant) {
      console.log('검색한 식당 좌표', searchedRestaurant.geometry.location)
      if (mapViewRef && mapViewRef.current) {
        mapViewRef.current.animateToRegion(
          {
            latitude: searchedRestaurant.geometry.location.lat,
            longitude: searchedRestaurant.geometry.location.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          1000
        )
      }
    }
  }, [searchedRestaurant])

  // 디버깅
  // useEffect(() => {
  //   console.log('마커 렌더링', nearByRestaurants)
  // }, [nearByRestaurants])

  return (
    <S.Layout>
      {!sliderShowing && (
        <AutoCompleteSearchBar
          currentLocation={currentLocation}
          sliderPanelRef={restaurantSliderRef}
          setSearchedRestaurant={setSearchedRestaurant}
        />
      )}

      <MapView
        style={{ flex: 1 }}
        ref={mapViewRef}
        showsUserLocation
        showsMyLocationButton={false}
        followsUserLocation
        zoomControlEnabled={false}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211,
        }}
      >
        {nearByRestaurants &&
          nearByRestaurants.map((restaurant, index) => {
            const { lat, lng } = restaurant.geometry.location
            const placeId = restaurant.place_id ? restaurant.place_id : restaurant.reference ? restaurant.reference : ''
            const isFavorite = favoriteRestaurant.some(favRestaurant => favRestaurant.placeId === placeId)

            return (
              <Marker
                key={index}
                title={restaurant.name}
                description={restaurant.vicinity}
                coordinate={{ latitude: lat ? lat : 0, longitude: lng ? lng : 0 }}
                onPress={() => showRestaurantDetail(restaurant)}
              >
                <View>
                  {isFavorite ? (
                    <RestaurantFavoritelIcon width={50} height={50} />
                  ) : (
                    <RestaurantNormalIcon width={30} height={30} />
                  )}
                </View>
              </Marker>
            )
          })}
        {searchedRestaurant && (
          <Marker
            title={searchedRestaurant.name}
            description={searchedRestaurant.vicinity}
            coordinate={{
              latitude: searchedRestaurant.geometry.location.lat,
              longitude: searchedRestaurant.geometry.location.lng,
            }}
            onPress={() => showRestaurantDetail(searchedRestaurant)}
          >
            <View>
              <RestaurantNormalIcon width={30} height={30} />
            </View>
          </Marker>
        )}
      </MapView>
      {!sliderShowing && (
        <S.CustomCurrentLocationButton onPress={goToCurrentLocation}>
          <Icon name="compass-outline" size={28} />
        </S.CustomCurrentLocationButton>
      )}

      <RestaurantsSlider
        nearByRestaurants={nearByRestaurants}
        ref={restaurantSliderRef}
        setSliderShowing={setSliderShowing}
      />
    </S.Layout>
  )
}

export default GoogleMap
