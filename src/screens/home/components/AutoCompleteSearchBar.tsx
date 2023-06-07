import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import React, { RefObject } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Region } from 'react-native-maps'
import SlidingUpPanel from 'rn-sliding-up-panel'
import * as S from './AutoCompleteSearchBar.style'

interface AutoCompleteSearchBarProps {
  currentLocation: Region
  sliderPanelRef: RefObject<SlidingUpPanel>
}

const AutoCompleteSearchBar = ({ currentLocation, sliderPanelRef }: AutoCompleteSearchBarProps) => {
  const navigation = useNavigation()

  // Functions
  const onPress = (data: any, details: any) => {
    console.log(details)
    if (sliderPanelRef && sliderPanelRef.current) {
      sliderPanelRef.current.show()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      navigation.navigate('RestaurantsDetail', { item: details })
    }
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
