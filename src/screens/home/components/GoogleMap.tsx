import { GOOGLE_MAPS_API_KEY } from '@env'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import MapView, { Marker, Region } from 'react-native-maps'
import SlidingUpPanel from 'rn-sliding-up-panel'
import * as S from './GoogleMap.style'
import MyLocationButton from './MyLocationButton'
import RestaurantsSlider from './RestaurantsSlider'

interface GoogleMapProps {
  currentLocation: Region
  nearByRestaurants: any[]
}

const GoogleMap = ({ currentLocation, nearByRestaurants }: GoogleMapProps) => {
  // Functions

  // 디버깅
  // useEffect(() => {
  //   console.log('마커 렌더링', nearByRestaurants)
  // }, [nearByRestaurants])

  return (
    <S.Layout>
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
              />
            )
          })}
      </MapView>
      <RestaurantsSlider nearByRestaurants={nearByRestaurants} />
    </S.Layout>
  )
}

export default GoogleMap
