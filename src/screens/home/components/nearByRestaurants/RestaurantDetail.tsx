import { useNavigation } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'

// TODO: TIL
type RestaurantDetailProps = NativeStackScreenProps<SliderParamList, 'RestaurantsDetail'>

const RestaurantDetail = ({ route }: RestaurantDetailProps) => {
  const { item } = route.params
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: item && item.name ? item.name : '상세보기',
    })
  }, [navigation, item])

  return (
    <View>
      <Text>RestaurantDetail</Text>
    </View>
  )
}

export default RestaurantDetail
