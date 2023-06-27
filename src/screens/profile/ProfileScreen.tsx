import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useRecoilValue } from 'recoil'
import ChemiReview from './components/ChemiReview'
import ProfileButton from './components/ProfileButton'
import * as S from './ProfileScreen.style'
import { authRequest } from '@/api/authRequest'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'

const ProfileScreen = () => {
  // States
  const [myChemiRating, setMyChemiRating] = useState(36.5)

  const rangeValue = useRef(new Animated.Value(0)).current
  const { user } = useRecoilValue(userStatesAtom)

  const width = rangeValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  const load = (toValue: number) => {
    Animated.timing(rangeValue, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  const getMyChemiRating = async () => {
    const { data: rating, status } = await authRequest.getMyChemiRating(user.id)
    return { rating, status }
  }

  const initProfileScreen = async () => {
    const { rating, status } = await getMyChemiRating()
    if (status === 200) {
      load(rating)
      setMyChemiRating(rating)
    } else {
      load(36.5)
      setMyChemiRating(36.5)
    }
  }

  useEffect(() => {
    initProfileScreen()
  }, [])
  return (
    <S.Container>
      <S.ProfileStatus>
        <S.ProfileImage />
        <FlexDirectionWrapper flexDirection="column">
          <CustomText fontSize={24} fontWeight={600}>
            {(user && user.name) || ''}
          </CustomText>
          <CustomText fontSize={18} fontWeight={400}>
            {(user && user.email) || ''}
          </CustomText>
        </FlexDirectionWrapper>
      </S.ProfileStatus>
      <S.ChemistryStatus>
        <CustomText fontSize={20} fontWeight={600} variant="primary">
          케미지수
        </CustomText>
        <FlexDirectionWrapper justifyContent="space-between" mt={10} mb={10}>
          <CustomText>첫 온도 36.5&#8451;</CustomText>

          <CustomText fontSize={20} fontWeight={600} variant="primary">
            {String(myChemiRating)}&#8451;
          </CustomText>
        </FlexDirectionWrapper>
        <S.TempBackground>
          <Animated.View
            style={{ backgroundColor: `${theme.colors.primary}`, width, height: '100%', borderRadius: 30 }}
          />
        </S.TempBackground>
      </S.ChemistryStatus>
      <FlexDirectionWrapper flexDirection="column" mb={20}>
        <FlexDirectionWrapper mb={20}>
          <CustomText variant="primary" fontSize={20} fontWeight={600}>
            받은 매너 평가
          </CustomText>
        </FlexDirectionWrapper>
        {chemiReviewList.map(item => (
          <ChemiReview key={item.reviewTxt} review={item} />
        ))}
      </FlexDirectionWrapper>
      {profileButtonList.map(button => (
        <ProfileButton key={button.buttonTxt} buttonProps={button} />
      ))}
    </S.Container>
  )
}

export default ProfileScreen

export type ChemiReviewListType = {
  iconName: string
  reviewTxt: string
  reviewCount: number
}
const chemiReviewList: ChemiReviewListType[] = [
  { iconName: 'users', reviewTxt: '최고에요', reviewCount: 26 },
  { iconName: 'users', reviewTxt: '좋아요', reviewCount: 22 },
  { iconName: 'users', reviewTxt: '아쉬워요', reviewCount: 16 },
  { iconName: 'users', reviewTxt: '별로에요', reviewCount: 56 },
]
export type ProfileButtonListType = {
  iconName: string
  buttonTxt: string
  rightIcon: string
  path?: 'MyGroupScreen' | 'EditProfileScreen' | 'Stack' | 'MyFavoriteRestaurantScreen'
}
const profileButtonList: ProfileButtonListType[] = [
  { iconName: 'staro', buttonTxt: '즐겨찾기한 식당', rightIcon: 'right', path: 'MyFavoriteRestaurantScreen' },
  { iconName: 'form', buttonTxt: '나의 소모임', rightIcon: 'right', path: 'MyGroupScreen' },
  { iconName: 'user', buttonTxt: '프로필 수정', rightIcon: 'right', path: 'EditProfileScreen' },
  { iconName: 'logout', buttonTxt: '로그 아웃', rightIcon: 'right', path: 'Stack' },
]
