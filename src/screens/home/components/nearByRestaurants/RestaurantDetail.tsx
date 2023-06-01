import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import LoadingSpinner from '@/common/components/LoadingSpinner'
import * as S from '@/screens/home/components/nearByRestaurants/RestaurantDetail.style'

// TODO: TIL
type RestaurantDetailProps = NativeStackScreenProps<SliderParamList, 'RestaurantsDetail'>

interface PhotoOfApi {
  width: number
  height: number
  html_attributions: string[]
  photo_reference: string
}

const RestaurantDetail = ({ route }: RestaurantDetailProps) => {
  // Constants
  const { item } = route.params
  const navigation = useNavigation()

  // States
  const [detailInfo, setDetailInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [images, setImages] = useState<string[]>([])

  // Functions
  const renderImages = ({ item }: { item: any }) => {
    return (
      <FastImage
        style={{ width: 150, height: 150, backgroundColor: 'red' }}
        source={{ uri: String(item) }}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  }

  // 사진 전부 요청하는 API
  const getImages = (imageRefs: PhotoOfApi[]) => {
    const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'
    const imageUrls: string[] = imageRefs.map(imageRef => {
      const ref = imageRef.photo_reference
      const url = `${reqUrl}?maxwidth=400&photo_reference=${ref}&key=${GOOGLE_MAPS_API_KEY}`
      return url
    })
    return imageUrls
  }

  const getDetailInfo = async () => {
    // 상세 정보 API 호출해서 사진 Refs 가져오기
    const detailReqUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
    try {
      const detailRestaurantInfo = await axios.get(detailReqUrl, {
        params: {
          place_id: item.place_id,
          key: GOOGLE_MAPS_API_KEY,
          language: 'ko',
        },
      })
      if (detailRestaurantInfo.status === 200 && detailRestaurantInfo.data.status === 'OK') {
        const detailInfo = detailRestaurantInfo.data.result
        const imageRefs = detailInfo.photos
        const imageUrls = getImages(imageRefs)
        setImages(imageUrls)
        setDetailInfo(detailRestaurantInfo.data.result)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Effects
  // 헤더 타이틀 설정
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: item && item.name ? item.name : '상세보기',
    })
  }, [navigation, item])

  // 장소 상세정보 불러오기
  useEffect(() => {
    // getDetailInfo()
  }, [])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <S.RestaurantDetailLayout>
          <S.ImageCarousel>
            <FlatList
              data={images}
              renderItem={renderImages}
              horizontal
              ItemSeparatorComponent={() => <FlatListSeparator direction="horizontal" />}
            />
          </S.ImageCarousel>
          <S.RestaurantInfo>
            <S.Location>
              <S.Text>WOW</S.Text>
            </S.Location>
          </S.RestaurantInfo>
        </S.RestaurantDetailLayout>
      )}
    </>
  )
}

export default RestaurantDetail
