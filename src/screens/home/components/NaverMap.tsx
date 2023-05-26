// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Geolocation from '@react-native-community/geolocation'
import { useEffect, useRef, useState } from 'react'
import NaverMapView, { Coord, Marker } from 'react-native-nmap'
import MyLocationButton from './MyLocationButton'
import * as S from './NaverMap.style'

const NaverMap = () => {
  const mapRef = useRef<any>(null)
  // States
  const [currentLocation, setCurrentLocation] = useState<Coord>({
    latitude: 37.5665,
    longitude: 126.978,
  })

  const tempCoords: Coord = {
    latitude: 36.5665,
    longitude: 126.978,
  }
  //FUNCTIONS
  // 현재 위치정보 가져오기
  const getCurrentLocation = () => {
    console.log('wow')
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        mapRef.current.animateToCoordinate({ latitude, longitude })
        setCurrentLocation({
          latitude,
          longitude,
        })
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

  const handleClick = () => {
    console.log('wow')
    if (mapRef && mapRef.current) {
      mapRef.current.animateToCoordinate(tempCoords)
    }
  }

  // EFFECTS
  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <S.Layout>
      <S.MapView ref={mapRef} center={{ ...currentLocation }}>
        <Marker coordinate={currentLocation} onClick={handleClick} pinColor="red" />
      </S.MapView>
      <MyLocationButton onPress={getCurrentLocation} />
    </S.Layout>
  )
}

export default NaverMap
