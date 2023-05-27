import { GOOGLE_MAPS_API_KEY } from '@env'
import axios from 'axios'
import MapView, { Marker, Region } from 'react-native-maps'
import * as S from './GoogleMap.style'
import MyLocationButton from './MyLocationButton'

interface GoogleMapProps {
  currentLocation: Region
  nearByRestaurants: any[]
}

const GoogleMap = ({ currentLocation, nearByRestaurants }: GoogleMapProps) => {
  const getNearByRestaurants = async () => {
    const reqUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=1500&type=restaurant&key=${GOOGLE_MAPS_API_KEY}&language=ko`
    const res = await axios.get(reqUrl)
    console.log(res)
  }

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
                coordinate={{ latitude: lat ? lat : 0, longitude: lng ? lng : 0 }}
              />
            )
          })}
      </MapView>
      <MyLocationButton onPress={getNearByRestaurants} />
    </S.Layout>
  )
}

export default GoogleMap
