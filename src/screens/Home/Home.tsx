import { GOOGLE_MAPS_API_KEY } from '@env'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Region } from 'react-native-maps'
import GoogleMap from './components/GoogleMap'
import * as S from '@/screens/Home/Home.style'

const Home = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentLocation, setCurrentLocation] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.0461,
    longitudeDelta: 0.0211,
  })
  // FIXME: 작업 후 타입 추가
  const [nearByRestaurants, setNearByRestaurants] = useState<any[]>([])

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
        maximumAge: 10000,
      }
    )
  }

  // 현재 위치 주변의 식당 정보 가져오기
  const getNearByRestaurants = async () => {
    const reqUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
    try {
      const res = await axios.get(reqUrl)
      if (res.status === 200) {
        console.log(res.data)
        setNearByRestaurants(res.data.results)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // EFFECTS
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // 현재 위치에 따라 주변 식당 정보 가져오기
  useEffect(() => {
    getNearByRestaurants()
  }, [currentLocation])

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
