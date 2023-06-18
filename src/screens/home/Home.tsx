import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useRecoilState } from 'recoil'
import GoogleMap from './components/GoogleMap'
import { useRestaurantsQuery } from './hooks/restaurants.hooks'
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
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useRestaurantsQuery()

  //FUNCTIONS
  // 현재 위치정보 가져오기
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0461,
          longitudeDelta: 0.0211,
        })
        setIsLoading(false)
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

  // data 에서 nextPageToken을 가져오고 반환 레스토랑을 기존 레스토랑에 추가
  useEffect(() => {
    if (data) {
      const allData = data.pages.flatMap(page => page?.nearByRestaurants)
      setNearByRestaurants(allData)
    }
  }, [data])

  // 디버깅
  // useEffect(() => {
  //   console.log(nearByRestaurants)
  // }, [nearByRestaurants])

  useEffect(() => {
    if (nearByRestaurants) {
      console.log(nearByRestaurants)
    }
  }, [nearByRestaurants])

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
