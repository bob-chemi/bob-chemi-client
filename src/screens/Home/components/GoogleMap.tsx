import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import MapView, { Region } from 'react-native-maps'
import * as S from './GoogleMap.style'
import MyLocationButton from './MyLocationButton'

const GoogleMap = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentLocation, setCurrentLocation] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.0461,
    longitudeDelta: 0.0211,
  })

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

  // EFFECTS
  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <S.Layout>
      {isLoading && (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size={68} />
        </View>
      )}
      {!isLoading && (
        <MapView
          style={{ flex: 1 }}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          zoomControlEnabled
          showsScale
          initialRegion={{
            ...currentLocation,
            latitudeDelta: 0.0461,
            longitudeDelta: 0.0211,
          }}
        />
      )}
    </S.Layout>
  )
}

export default GoogleMap
