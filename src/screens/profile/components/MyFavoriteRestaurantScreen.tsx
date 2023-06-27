import React from 'react'
import { FlatList, ListRenderItem, Text, View } from 'react-native'
import * as S from './MyFavoriteRestaurantScreen.style'
import useFavoriteRestaurant from '@/hooks/useFavoriteRestaurant'
import RestaurantCard from '@/screens/home/components/nearByRestaurants/RestaurantCard'

const MyFavoriteRestaurantScreen = () => {
  // Hooks
  const { favoriteRestaurantInfo } = useFavoriteRestaurant()

  // Functions
  const renderItem: ListRenderItem<any> = ({ item }) => {
    return (
      <View>
        <RestaurantCard item={item} isFavorite={false} />
      </View>
    )
  }

  // Effects

  return (
    <S.Layout>
      <FlatList data={favoriteRestaurantInfo} renderItem={renderItem} />
    </S.Layout>
  )
}

export default MyFavoriteRestaurantScreen
