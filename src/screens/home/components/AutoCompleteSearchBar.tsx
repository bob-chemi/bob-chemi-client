import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { Dispatch, RefObject } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Region } from 'react-native-maps'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { SliderParamList } from '../navigations/SliderStackNavigatoin'
import * as S from './AutoCompleteSearchBar.style'

interface AutoCompleteSearchBarProps {
  currentLocation: Region
  sliderPanelRef: RefObject<SlidingUpPanel>
  setSearchedRestaurant: Dispatch<any>
}

type NavigationProp = NativeStackNavigationProp<SliderParamList, 'RestaurantsDetail'>

const AutoCompleteSearchBar = ({
  currentLocation,
  sliderPanelRef,
  setSearchedRestaurant,
}: AutoCompleteSearchBarProps) => {
  const navigation = useNavigation<NavigationProp>()

  // Functions
  const onPress = (data: any, details: any) => {
    console.log('검색창 디테일', details)
    setSearchedRestaurant(details)
    if (sliderPanelRef && sliderPanelRef.current) {
      sliderPanelRef.current.show()
      navigation.navigate('RestaurantsDetail', { item: details, fetchDetailInfo: false })
    }
  }

  return (
    <S.SearchBarLayout>
      <GooglePlacesAutocomplete
        placeholder="장소 검색하기"
        onPress={onPress}
        debounce={400}
        enablePoweredByContainer={false}
        fetchDetails
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'ko',
          location: `${currentLocation.latitude},${currentLocation.longitude}`,
          radius: 2000,
          components: 'country:kr',
          types: 'restaurant|cafe|bakery|bar|food',
        }}
      />
    </S.SearchBarLayout>
  )
}

export default AutoCompleteSearchBar
