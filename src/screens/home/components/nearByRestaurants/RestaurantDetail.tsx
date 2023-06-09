import StarEmpty from '@assets/icons/starEmpty.svg'
import StarFilled from '@assets/icons/starFilled.svg'
import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import dayjs from 'dayjs'
import haversineDistance from 'haversine-distance'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable } from 'react-native'
import { Linking } from 'react-native'
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating'
import { useRecoilValue } from 'recoil'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import ReviewCard, { Review } from './ReviewCard'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import LoadingSpinner from '@/common/components/LoadingSpinner'
import theme from '@/common/style/theme'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import * as S from '@/screens/home/components/nearByRestaurants/RestaurantDetail.style'

// TODO: TIL
type RestaurantDetailProps = NativeStackScreenProps<SliderParamList, 'RestaurantsDetail'>

type RestaurantDetailNavigationProp = NativeStackNavigationProp<SliderParamList, 'RestaurantsDetail'>

interface PhotoOfApi {
  width: number
  height: number
  html_attributions: string[]
  photo_reference: string
}

// 헤더 오른쪽에 있는 즐겨찾기 기능의 별 아이콘
const FavoriteElement = () => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev)
  }

  return <Pressable onPress={toggleFavorite}>{isFavorite ? <StarFilled /> : <StarEmpty />}</Pressable>
}

const RestaurantDetail = ({ route }: RestaurantDetailProps) => {
  // Constants
  const { item, distance, fetchDetailInfo } = route.params
  const navigation = useNavigation<RestaurantDetailNavigationProp>()
  const day = dayjs().day()

  // States
  const [detailInfo, setDetailInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [images, setImages] = useState<string[]>([])
  const [openNow, setOpenNow] = useState<boolean | null>(false)
  const [operationHours, setOperationHours] = useState<string[]>([])
  const [showOperationHoursMore, setShowOperationHoursMore] = useState<boolean>(false)
  const [distanceFromCurrentLocation, setDistanceFromCurrentLocation] = useState<number>(0)

  // Recoils
  const currentLocation = useRecoilValue(currentLocationAtom)

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
  const getImages = (imageRefs: PhotoOfApi[] | null) => {
    const reqUrl = 'https://maps.googleapis.com/maps/api/place/photo'
    if (imageRefs === null) {
      return []
    }
    const imageUrls: string[] = imageRefs.map(imageRef => {
      const ref = imageRef.photo_reference
      const url = `${reqUrl}?maxwidth=400&photo_reference=${ref}&key=${GOOGLE_MAPS_API_KEY}`
      return url
    })
    return imageUrls
  }

  const getDetailInfo = async () => {
    // detailInfo가 존재하면 API 호출하지 않음
    if (detailInfo) return

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
        // console.log(detailInfo)
        const imageRefs = detailInfo.photos ? detailInfo.photos : null
        const imageUrls = getImages(imageRefs)
        // 영업중인지 확인
        const openNow = detailInfo.current_opening_hours
          ? detailInfo.current_opening_hours.open_now
            ? true
            : false
          : null
        const operationHours = detailInfo.current_opening_hours ? detailInfo.current_opening_hours.weekday_text : []
        // 거리를 확인
        const currentLocationObj = {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }
        const restaurantLocationObj = {
          latitude: detailInfo.geometry.location.lat,
          longitude: detailInfo.geometry.location.lng,
        }
        const distance = Math.floor(haversineDistance(currentLocationObj, restaurantLocationObj))

        setOperationHours(operationHours)
        setOpenNow(openNow)
        setDistanceFromCurrentLocation(distance)
        setImages(imageUrls)
        setDetailInfo(detailRestaurantInfo.data.result)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const modifyDetailInfo = () => {
    const detailInfo = item
    const imageRefs = detailInfo.photos ? detailInfo.photos : null
    const imageUrls = getImages(imageRefs)
    // 영업중인지 확인
    const openNow = detailInfo.current_opening_hours ? (detailInfo.current_opening_hours.open_now ? true : false) : null
    const operationHours = detailInfo.current_opening_hours ? detailInfo.current_opening_hours.weekday_text : []
    // 거리를 확인
    const currentLocationObj = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    }
    const restaurantLocationObj = {
      latitude: detailInfo.geometry.location.lat,
      longitude: detailInfo.geometry.location.lng,
    }
    const distance = Math.floor(haversineDistance(currentLocationObj, restaurantLocationObj))

    setOperationHours(operationHours)
    setOpenNow(openNow)
    setDistanceFromCurrentLocation(distance)
    setImages(imageUrls)
    setDetailInfo(detailInfo)
    setIsLoading(false)
  }

  const toggleShowOperationHoursMore = () => {
    setShowOperationHoursMore(prev => !prev)
  }

  // Effects
  // 헤더 타이틀 설정, 헤더 오른쪽에 즐겨찾기 컴포넌트 추가
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: item && item.name ? item.name : detailInfo && detailInfo.name ? detailInfo.name : '상세보기',
      headerRight: () => <FavoriteElement />,
    })
  }, [navigation, item, detailInfo])

  // 장소 상세정보 불러오기
  useEffect(() => {
    if (item && fetchDetailInfo) {
      getDetailInfo()
    } else if (item && !fetchDetailInfo) {
      modifyDetailInfo()
    }
  }, [item, fetchDetailInfo])

  // 디버깅
  useEffect(() => {
    // console.log(detailInfo)
  }, [detailInfo, fetchDetailInfo])

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && detailInfo && (
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
              <S.IconComponent name="map-marker-outline" size={20} />
              <S.Text>{detailInfo.formatted_address ? detailInfo.formatted_address : '주소 정보 없음'} </S.Text>
            </S.Location>
            {distance ? (
              <S.Distance>
                <S.IconComponent name="map-marker-distance" size={20} />
                <S.Text>{distance}m</S.Text>
              </S.Distance>
            ) : distanceFromCurrentLocation ? (
              <S.Distance>
                <S.IconComponent name="map-marker-distance" size={20} />
                <S.Text>{distanceFromCurrentLocation}m</S.Text>
              </S.Distance>
            ) : null}

            <S.OperationHoursCol>
              <S.IconComponent name="clock-outline" size={20} />
              <S.OperationHours>
                <S.Text variant={openNow ? 'success' : openNow === false ? 'primary' : 'gray300'}>
                  {openNow !== null ? (openNow ? '영업중' : '영업종료') : '영업 정보 알 수 없음'}
                </S.Text>
                {operationHours && showOperationHoursMore ? (
                  operationHours.map((operationTime: string, index: number) => (
                    <S.Text key={operationTime}>
                      {operationTime + index}{' '}
                      {index === 0 && (
                        <S.IconComponent
                          name={showOperationHoursMore ? 'chevron-up' : 'chevron-down'}
                          onPress={toggleShowOperationHoursMore}
                        />
                      )}
                    </S.Text>
                  ))
                ) : (
                  <S.Text>
                    {operationHours[day - 1]}{' '}
                    <S.IconComponent
                      name={showOperationHoursMore ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      onPress={toggleShowOperationHoursMore}
                    />
                  </S.Text>
                )}
              </S.OperationHours>
            </S.OperationHoursCol>
            {detailInfo.formatted_phone_number && (
              <S.PhoneNumber>
                <S.IconComponent name="phone-outline" size={20} />
                <S.PhoneNumberText onPress={() => Linking.openURL(`tel:${detailInfo.formatted_phone_number}`)}>
                  {detailInfo.formatted_phone_number}
                </S.PhoneNumberText>
              </S.PhoneNumber>
            )}
          </S.RestaurantInfo>
          <S.ReviewArea>
            <S.RatingRow>
              <S.RatingRowColLeft>
                <S.Rating>{detailInfo.rating ? `${detailInfo.rating} 점` : '리뷰 점수 없음'}</S.Rating>
                <S.Stars>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={detailInfo.rating}
                    starSize={26}
                    fullStarColor={theme.colors.primary}
                    halfStarEnabled
                    emptyStarColor="#000000"
                  />
                </S.Stars>
              </S.RatingRowColLeft>
              <S.RatingRowColRight>
                <S.IconComponent name="account-outline" size={22} />
                <S.Text>{detailInfo.reviews ? detailInfo.reviews.length : '0'}</S.Text>
              </S.RatingRowColRight>
            </S.RatingRow>
            <S.ReviewRow>
              {detailInfo.reviews &&
                detailInfo.reviews.map((review: Review, index: number) => <ReviewCard key={index} review={review} />)}
            </S.ReviewRow>
          </S.ReviewArea>
        </S.RestaurantDetailLayout>
      )}
    </>
  )
}

export default RestaurantDetail
