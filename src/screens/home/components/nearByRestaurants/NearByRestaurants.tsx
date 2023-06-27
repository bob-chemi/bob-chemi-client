import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useRecoilValue } from 'recoil'
import { useRestaurantsQuery } from '../../hooks/restaurants.hooks'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import RestaurantCard from './RestaurantCard'
import theme from '@/common/style/theme'
import useFavoriteRestaurant from '@/hooks/useFavoriteRestaurant'
import { nearByRestaurantsAtom } from '@/recoil/atoms/nearByRestaurantsAtom'

type NearByRestaurantsProps = NativeStackScreenProps<SliderParamList, 'Restaurants'>

const NearByRestaurants = ({ route }: NearByRestaurantsProps) => {
  // Recoils
  const nearByRestaurants = useRecoilValue(nearByRestaurantsAtom)

  // Hooks
  const { favoriteRestaurant } = useFavoriteRestaurant()

  // React-Query
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useRestaurantsQuery()

  const renderRestaurantCard = ({ item, index }: { item: any; index: number }) => {
    const placeId = item.place_id ? item.place_id : item.reference ? item.reference : ''
    const isFavorite = favoriteRestaurant.some(favRestaurant => favRestaurant.placeId === placeId)

    return <RestaurantCard item={item} isFavorite={isFavorite} index={index} />
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'blue', width: '100%' }}>
      <FlatList
        style={{ width: '100%', flex: 1 }}
        data={nearByRestaurants}
        renderItem={renderRestaurantCard}
        contentContainerStyle={{ width: '100%', backgroundColor: '#e8eff5' }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        onEndReached={() => hasNextPage && fetchNextPage()}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator size={32} color={theme.colors.primary} /> : null
        }
      />
    </View>
  )
}

export default NearByRestaurants
