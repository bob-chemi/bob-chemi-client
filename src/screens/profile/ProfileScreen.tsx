import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign'
import * as S from './ProfileScreen.style'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
import type { ProfileStackParamList } from '@/navigations/ProfileStackNav'

type ProfieScreenProp = NativeStackScreenProps<ProfileStackParamList, 'ProfileScreen'>

const ProfileScreen = ({ navigation }: ProfieScreenProp) => {
  const rangeValue = useRef(new Animated.Value(0)).current

  const width = rangeValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })
  const load = () => {
    Animated.timing(rangeValue, {
      toValue: 37.7,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }
  useEffect(() => {
    load()
  }, [])
  return (
    <S.Container>
      <S.ProfileStatus>
        <S.ProfileImage />
        <FlexDirectionWrapper flexDirection="column">
          <CustomText fontSize={24} fontWeight={600}>
            혼밥러
          </CustomText>
          <CustomText fontSize={18} fontWeight={400}>
            sacultang@gmail.com
          </CustomText>
        </FlexDirectionWrapper>
      </S.ProfileStatus>
      <S.ChemistryStatus>
        <CustomText fontSize={20} fontWeight={600} variant="primary">
          케미지수
        </CustomText>
        <FlexDirectionWrapper justifyContent="space-between" m={5}>
          <CustomText>첫 온도 36.5&#8451;</CustomText>

          <CustomText fontSize={20} fontWeight={600} variant="primary">
            37.9&#8451;
          </CustomText>
        </FlexDirectionWrapper>
        <S.TempBackground>
          <Animated.View
            style={{ backgroundColor: `${theme.colors.primary}`, width, height: '100%', borderRadius: 30 }}
          />
        </S.TempBackground>
      </S.ChemistryStatus>
      <CustomButton
        variant="gray200"
        fullWidth
        height={80}
        borderRadius={20}
        flexDirection="row"
        justifyContent="space-between"
        mb={10}
        onPress={() => navigation.navigate('EditProfileScreen')}
      >
        <FlexDirectionWrapper alignItems="center" pl={20}>
          <Icon
            name="form"
            size={18}
            style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, marginRight: 10 }}
            color={theme.colors.primary}
          />
          <CustomText variant="gray500" fontWeight={600}>
            밥케미 후기
          </CustomText>
        </FlexDirectionWrapper>
        <FlexDirectionWrapper pr={20}>
          <Icon name="right" size={20} />
        </FlexDirectionWrapper>
      </CustomButton>
      <CustomButton
        variant="gray200"
        fullWidth
        height={80}
        borderRadius={20}
        flexDirection="row"
        justifyContent="space-between"
        mb={10}
        onPress={() => navigation.navigate('EditProfileScreen')}
      >
        <FlexDirectionWrapper alignItems="center" pl={20}>
          <Icon
            name="user"
            size={18}
            style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, marginRight: 10 }}
            color={theme.colors.primary}
          />
          <CustomText variant="gray500" fontWeight={600}>
            프로필 수정
          </CustomText>
        </FlexDirectionWrapper>
        <FlexDirectionWrapper pr={20}>
          <Icon name="right" size={20} />
        </FlexDirectionWrapper>
      </CustomButton>

      <CustomButton
        variant="gray200"
        fullWidth
        height={80}
        borderRadius={20}
        flexDirection="row"
        justifyContent="space-between"
      >
        <FlexDirectionWrapper alignItems="center" pl={20}>
          <Icon
            name="logout"
            size={18}
            style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, marginRight: 10 }}
            color={'#FB4A59'}
          />
          <CustomText variant="gray500" fontWeight={600}>
            로그 아웃
          </CustomText>
        </FlexDirectionWrapper>
        <FlexDirectionWrapper pr={20}>
          <Icon name="right" size={20} />
        </FlexDirectionWrapper>
      </CustomButton>
    </S.Container>
  )
}

export default ProfileScreen
