import { GOOGLE_MAPS_API_KEY } from '@env'
import Geolocation from '@react-native-community/geolocation'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Region } from 'react-native-maps'
import * as S from './AutoCompleteSearchBar.style'

interface AutoCompleteSearchBarProps {
  currentLocation: Region
}

const AutoCompleteSearchBar = ({ currentLocation }: AutoCompleteSearchBarProps) => {
  const onPress = (data: any, details: any) => {
    console.log(data)
    console.log(details)
  }

  return (
    <S.SearchBarLayout>
      <GooglePlacesAutocomplete
        placeholder="장소 검색하기"
        onPress={onPress}
        debounce={400}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'ko',
          location: `${currentLocation.latitude},${currentLocation.longitude}`,
          radius: 2000,
        }}
      />
    </S.SearchBarLayout>
  )
}

export default AutoCompleteSearchBar
