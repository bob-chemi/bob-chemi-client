import { GOOGLE_MAPS_API_KEY } from '@env'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios'
import dayjs from 'dayjs'
import haversineDistance from 'haversine-distance'
import React, { Dispatch, useEffect, useState } from 'react'
import { FlatList, Pressable } from 'react-native'
import { Linking } from 'react-native'
import FastImage from 'react-native-fast-image'
import StarRating from 'react-native-star-rating'
import { useRecoilValue } from 'recoil'
import { SliderParamList } from '../../navigations/SliderStackNavigatoin'
import ReviewCard, { Review } from './ReviewCard'
import favoriteRequest from '@/api/favoriteRequest'
import FlatListSeparator from '@/common/components/FlatListSeparator'
import LoadingSpinner from '@/common/components/LoadingSpinner'
import theme from '@/common/style/theme'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import * as S from '@/screens/home/components/nearByRestaurants/RestaurantDetail.style'

type RestaurantDetailProps = NativeStackScreenProps<SliderParamList, 'RestaurantsDetail'>

type RestaurantDetailNavigationProp = NativeStackNavigationProp<SliderParamList, 'RestaurantsDetail'>

interface FavoriteInfoI {
  isFavorite: boolean
  favoriteInfo: {
    id: string
    placeId: string
  }
}

interface PhotoOfApi {
  width: number
  height: number
  html_attributions: string[]
  photo_reference: string
}

// 헤더 오른쪽에 있는 즐겨찾기 기능의 별 아이콘

interface FavoriteElementI {
  isFavorite: FavoriteInfoI
  setIsFavorite: Dispatch<React.SetStateAction<FavoriteInfoI>>
  placeId: string
}

const FavoriteElement = ({ isFavorite, setIsFavorite, placeId }: FavoriteElementI) => {
  const toggleFavorite = async () => {
    console.log(isFavorite)
    console.log(placeId)
    if (isFavorite.isFavorite) {
      console.log('삭제 요청')
      await favoriteRequest.deleteFavoriteRestaurant(isFavorite.favoriteInfo.id)
      setIsFavorite({
        isFavorite: false,
        favoriteInfo: {
          id: '',
          placeId: '',
        },
      })
    } else {
      console.log('추가 요청')
      await favoriteRequest.addFavoriteRestaurant(placeId)
      const currentFavoriteRestaurants: { id: string; placeId: string }[] =
        await favoriteRequest.queryCurrentFavoriteRestaurants()
      const addedRestaurant = currentFavoriteRestaurants.find(restaurant => restaurant.placeId === placeId)
      console.log(addedRestaurant)
      if (addedRestaurant) {
        setIsFavorite({
          isFavorite: true,
          favoriteInfo: {
            id: addedRestaurant.id,
            placeId: addedRestaurant.placeId,
          },
        })
      }
    }
  }

  return (
    <Pressable onPress={toggleFavorite}>
      {isFavorite.isFavorite ? (
        <S.IconComponent name="star" size={28} color={theme.colors.primary} />
      ) : (
        <S.IconComponent name="star-outline" size={28} />
      )}
    </Pressable>
  )
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
  const [isFavorite, setIsFavorite] = useState<FavoriteInfoI>({
    isFavorite: false,
    favoriteInfo: {
      id: '',
      placeId: '',
    },
  })

  // Recoils
  const currentLocation = useRecoilValue(currentLocationAtom)

  // Functions
  const renderImages = ({ item }: { item: any }) => {
    return (
      <FastImage
        style={{ width: 150, height: 150, backgroundColor: 'gray' }}
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
        // 즐겨찾기 등록된 식당인지 확인
        const placeId = detailInfo.place_id ? detailInfo.place_id : detailInfo.reference ? detailInfo.reference : ''
        const favoriteRestaurants: { id: string; placeId: string }[] =
          await favoriteRequest.queryCurrentFavoriteRestaurants()
        //TODO: console 정리
        console.log('현재 서버 즐겨찾기', favoriteRestaurants)
        if (favoriteRestaurants.length > 0) {
          console.log('현재 서버 즐겨찾기 존재')
          const exist = favoriteRestaurants.some(restaurant => restaurant.placeId === placeId)
          if (exist) {
            const info = favoriteRestaurants.find(restaurant => restaurant.placeId === placeId)
            info && setIsFavorite({ isFavorite: true, favoriteInfo: info })
            console.log('서버에 즐겨찾기 존재', info)
          }
        } else {
          console.log('즐겨찾기 없음')
          setIsFavorite({ isFavorite: false, favoriteInfo: { id: '', placeId: '' } })
        }

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
    const placeId = detailInfo ? (detailInfo.place_id ? detailInfo.place_id : detailInfo.reference) : ''

    navigation.setOptions({
      headerShown: true,
      headerTitle: item && item.name ? item.name : detailInfo && detailInfo.name ? detailInfo.name : '상세보기',
      headerRight: () => <FavoriteElement isFavorite={isFavorite} setIsFavorite={setIsFavorite} placeId={placeId} />,
    })
  }, [navigation, item, detailInfo, isFavorite])

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
                <S.Text>
                  {distanceFromCurrentLocation > 1000
                    ? `${Number(distanceFromCurrentLocation / 1000).toFixed(1)}km`
                    : `${distanceFromCurrentLocation}m`}
                </S.Text>
              </S.Distance>
            ) : distanceFromCurrentLocation ? (
              <S.Distance>
                <S.IconComponent name="map-marker-distance" size={20} />
                <S.Text>
                  {distanceFromCurrentLocation > 1000
                    ? `${Number(distanceFromCurrentLocation / 1000).toFixed(1)}km`
                    : `${distanceFromCurrentLocation}m`}
                </S.Text>
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
