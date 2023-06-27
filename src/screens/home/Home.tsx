import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useRecoilState } from 'recoil'
import GoogleMap from './components/GoogleMap'
import { useRestaurantsQuery } from './hooks/restaurants.hooks'
import { restaurantsRequest } from '@/api/restaurantsRequest'
import useFavoriteRestaurant from '@/hooks/useFavoriteRestaurant'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import { nearByRestaurantsAtom } from '@/recoil/atoms/nearByRestaurantsAtom'
import * as S from '@/screens/home/Home.style'

const Home = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentLocation, setCurrentLocation] = useRecoilState(currentLocationAtom)

  // Recoils
  const [nearByRestaurants, setNearByRestaurants] = useRecoilState(nearByRestaurantsAtom)

  // React-Query
  const { data } = useRestaurantsQuery()
  // Hooks
  const { favoriteRestaurant, setFavoriteRestaurantInfo } = useFavoriteRestaurant()

  //FUNCTIONS
  // 현재 위치정보 가져오기
  const getCurrentLocation = async () => {
    // 현재 위치의 위도, 경도를 가져온다.
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords
        // 위도, 경도에서 reverseGeoCoding API를 사용해 행정 구역, 하위 구역을 가져온다.
        const { administrativeArea, sublocality } = await restaurantsRequest.getAdministrativeArea(latitude, longitude)
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211,
          administrativeArea,
          sublocality,
        })
      },
      error => {
        console.log(error.code, error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    )
  }

  // EFFECTS
  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    if (currentLocation) {
      console.log(currentLocation)
      if (currentLocation.latitude !== 0 && currentLocation.longitude !== 0) {
        setIsLoading(false)
      }
    }
  }, [currentLocation])

  // data 에서 nextPageToken을 가져오고 반환 레스토랑을 기존 레스토랑에 추가
  useEffect(() => {
    if (data) {
      const allData = data.pages.flatMap(page => page?.nearByRestaurants)
      // 즐겨찾기 한 식당 데이터 저장
      const favoritePlaceIds = favoriteRestaurant.map(favRestaurant => favRestaurant.placeId)
      const favoriteRestaurantInfo = allData.filter(restaurant => favoritePlaceIds.includes(restaurant.place_id))
      setFavoriteRestaurantInfo(favoriteRestaurantInfo)
      setNearByRestaurants(allData)
    }
  }, [data])

  // 디버깅
  // useEffect(() => {
  //   console.log(nearByRestaurants)
  // }, [nearByRestaurants])

  // useEffect(() => {
  //   if (nearByRestaurants) {
  //     console.log(nearByRestaurants)
  //   }
  // }, [nearByRestaurants])

  return (
    <S.HomeLayout>
      {isLoading && (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size={68} />
        </View>
      )}
      {!isLoading && <GoogleMap currentLocation={currentLocation} nearByRestaurants={nearByRestaurants} />}
    </S.HomeLayout>
  )
}

export default Home
