import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'

const CardLayout = styled.View`
  width: 100%;
  z-index: 20;
  background-color: white;
  padding: 10px;
`

const Name = styled.Text`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 36px;
  color: black;
`

const RatingRow = styled.View`
  flex-direction: row;
`

const RatingNumberWrapper = styled.View`
  background-color: #ff7b26;
  border-radius: 15px;

  justify-content: center;
  align-items: center;

  padding: 5px 10px;
`

const RatingNumer = styled.Text`
  color: white;
`

const RatingStar = styled.Text``

const AddressAndOperationCol = styled.View``

const Address = styled.Text`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  align-items: center;
  color: #c4c0c0;
`

const Operation = styled.Text`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  display: flex;
  align-items: center;

  color: #7bcc85;
`

interface RestaurantCardProps {
  item: any
  index?: number
}

const RestaurantCard = ({ item, index }: RestaurantCardProps) => {
  // Navigations
  // TODO: TIL에 추가
  const navigation = useNavigation<NativeStackNavigationProp<SliderParamList>>()

  // Constants
  const tempPhotoUrl =
    'https://lh3.googleusercontent.com/places/ANJU3Dsi9WxeODudmuSZY3nawTrJcbdkb1fud1RDM9r2Mqzxj9pkbuRzJvPfSyEdTqDHtZpURS_03BDmYUDAsV0MtjvUtb57Sr93Oj8=s1600-w400'
  const [images, setImages] = useState<any[]>([])
  const [tempImage, setTempImage] = useState<string[]>([
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
    tempPhotoUrl,
  ])

  // FUNCTIONS
  const getImage = async () => {
    const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'

    const res = await axios.get(reqUrl, {
      params: {
        maxwidth: 400,
        photo_reference: item.photoRefs[0].photo_reference,
        key: GOOGLE_MAPS_API_KEY,
      },
    })
    console.log('res', res)
    setTempImage(res.data)
  }

  const getImages = async () => {
    if (!item.photoRefs) return
    const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'
    const imageRefs = item.photoRefs
    const imageUrls: string[] = imageRefs.map((imageRef: any) => {
      const ref = imageRef.photo_reference
      const url = `${reqUrl}?maxwidth=400&photo_reference=${ref}&key=${GOOGLE_MAPS_API_KEY}`
      return url
    })
    setImages(imageUrls)
  }

  const renderImages = ({ item }: { item: any }) => {
    return (
      <FastImage
        style={{ width: 150, height: 150, backgroundColor: 'red' }}
        source={{ uri: String(item) }}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  }

  const goToDetailPage = () => {
    console.log('goToDetailPage', item)
    navigation.navigate('RestaurantsDetail', { item })
  }

  // EFFECTS
  useEffect(() => {
    if (item) {
      // FIXME: API 사용량 때문에 주석처리
      // getImages()
      // console.log('카드 컴포넌트', item)
      // getImage()
    }
  }, [])

  return (
    <Pressable onPress={goToDetailPage}>
      <CardLayout>
        <Name>{item ? item.name : '존재하지 않음'}</Name>
        <RatingRow>
          <RatingNumberWrapper>
            <RatingNumer>{item.rating ? item.rating : '평점 없음'}</RatingNumer>
          </RatingNumberWrapper>
          <RatingStar>★</RatingStar>
        </RatingRow>
        <AddressAndOperationCol>
          <Address>서울시 강남구</Address>
          <Operation>영업중</Operation>
        </AddressAndOperationCol>
        {images && (
          <FlatList
            data={images}
            renderItem={renderImages}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        )}
        {/* {tempImage && (
        <FlatList
          data={tempImage}
          renderItem={renderImages}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      )} */}
      </CardLayout>
    </Pressable>
  )
}

export default RestaurantCard
