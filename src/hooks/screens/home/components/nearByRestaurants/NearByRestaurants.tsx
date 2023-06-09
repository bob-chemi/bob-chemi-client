import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, FlatList } from 'react-native'
import { useRecoilValue } from 'recoil'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import RestaurantCard from './RestaurantCard'
import { nearByRestaurantsAtom } from '@/recoil/atoms/nearByRestaurantsAtom'

type NearByRestaurantsProps = NativeStackScreenProps<SliderParamList, 'Restaurants'>

const NearByRestaurants = ({ route }: NearByRestaurantsProps) => {
  // Recoils
  const nearByRestaurants = useRecoilValue(nearByRestaurantsAtom)

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
