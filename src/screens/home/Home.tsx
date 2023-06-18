import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useRecoilState } from 'recoil'
import GoogleMap from './components/GoogleMap'
import { useGetNearByRestaurants } from './hooks/restaurants.hooks'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import * as S from '@/screens/home/Home.style'

const Home = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentLocation, setCurrentLocation] = useRecoilState(currentLocationAtom)
  // FIXME: 작업 후 타입 추가

  // React-Query
  const { data: nearByRestaurants, isFetching } = useGetNearByRestaurants(
    currentLocation.latitude,
    currentLocation.longitude
  )

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

  // 디버깅
  // useEffect(() => {
  //   console.log(nearByRestaurants)
  // }, [nearByRestaurants])

  useEffect(() => {
    console.log(isFetching)
    if (nearByRestaurants) {
      console.log(nearByRestaurants)
    }
  }, [nearByRestaurants, isFetching])

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
