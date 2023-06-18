import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, FlatList } from 'react-native'
import { useRecoilValue } from 'recoil'
import { useGetNearByRestaurants } from '../../hooks/restaurants.hooks'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import RestaurantCard from './RestaurantCard'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'

type NearByRestaurantsProps = NativeStackScreenProps<SliderParamList, 'Restaurants'>

const NearByRestaurants = ({ route }: NearByRestaurantsProps) => {
  // Recoils
  const currentLocation = useRecoilValue(currentLocationAtom)

  // React-Query
  const { data: nearByRestaurants } = useGetNearByRestaurants(currentLocation.latitude, currentLocation.longitude)

  const renderRestaurantCard = ({ item, index }: { item: any; index: number }) => {
    return <RestaurantCard item={item} index={index} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'blue', width: '100%' }}>
      <FlatList
        style={{ width: '100%', flex: 1 }}
        data={nearByRestaurants}
        renderItem={renderRestaurantCard}
        contentContainerStyle={{ width: '100%', backgroundColor: '#e8eff5' }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  )
}

export default NearByRestaurants
