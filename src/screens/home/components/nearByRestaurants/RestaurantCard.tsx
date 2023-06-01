import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Text, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'

const CardLayout = styled.View`
  width: 100%;
  z-index: 20;
  background-color: white;
  padding: 10px;
  flex-direction: row;
`

const ImageCol = styled.View`
  flex: 1;
  border-radius: 15px;
  overflow: hidden;
`

const Separator = styled.View`
  width: 10px;
`

const InfoCol = styled.View`
  flex: 1.5;
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

const RestaurantCard = ({ item }: RestaurantCardProps) => {
  // Navigations
  // TODO: TIL에 추가
  const navigation = useNavigation<NativeStackNavigationProp<SliderParamList>>()

  // States
  const [image, setImage] = useState<any[]>([])

  // FUNCTIONS
  const getImage = () => {
    if (item.photos) {
      const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'
      const photoRef = item.photos[0].photo_reference
      const imageUrl = `${reqUrl}?maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`
      setImage([imageUrl])
    }
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
      getImage()
    }
  }, [])

  return (
    <Pressable onPress={goToDetailPage}>
      <CardLayout>
        <ImageCol>
          {image ? (
            <FastImage
              style={{ width: 150, height: 150, backgroundColor: 'red' }}
              source={{ uri: String(image) }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Text>이미지 없음</Text>
          )}
        </ImageCol>
        <Separator />
        <InfoCol>
          <Name>{item ? item.name : '이름을 알 수 없는 식당'}</Name>
          <RatingRow>
            <RatingNumberWrapper>
              <RatingNumer>{item.rating ? item.rating : '평점 없음'}</RatingNumer>
            </RatingNumberWrapper>
            <RatingStar>★</RatingStar>
          </RatingRow>
          <AddressAndOperationCol>
            <Address>{item.vicinity ? item.vicinity : '주소 정보 없음'}</Address>
            <Operation>
              {item && item.opening_hours
                ? item.opening_hours.open_now
                  ? '영업중'
                  : '영업 중이 아님'
                : '영업 정보 없음'}
            </Operation>
          </AddressAndOperationCol>
        </InfoCol>
      </CardLayout>
    </Pressable>
  )
}

export default RestaurantCard
