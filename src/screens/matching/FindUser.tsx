import MultiSlider, { LabelProps } from '@ptomasroos/react-native-multi-slider'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import GenderCard from '@screens/matching/components/GenderCard'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as S from './FindUser.style'
import theme from '@/common/style/theme'
import useSocket from '@/hooks/useSocket'
import { TabParamList } from '@/navigations/BottomTabs'
import { StackParamList } from '@/navigations/StackNav'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import { AdministrativeArea } from '@/types/locationAdministrativeAreaTypes'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

interface CustomSliderLabelProps {
  e: LabelProps
}

// type FindUserScreenProps = BottomTabScreenProps<TabParamList, 'Matching'>

type FindUserScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Matching'>,
  NativeStackScreenProps<StackParamList>
>

type Gender = 'woman' | 'man' | null

type MatchingOption = {
  gender: Gender
  ageRange: [number, number]
} & AdministrativeArea

const CustomSliderLabel = ({ e }: CustomSliderLabelProps) => {
  const { oneMarkerLeftPosition, oneMarkerValue, twoMarkerLeftPosition, twoMarkerValue } = e

  return (
    <S.SliderLabelLayout>
      <S.SliderLabelWrapper left={oneMarkerLeftPosition}>
        <S.SliderLabel>{oneMarkerValue}</S.SliderLabel>
      </S.SliderLabelWrapper>
      <S.SliderLabelWrapper left={twoMarkerLeftPosition}>
        <S.SliderLabel>{twoMarkerValue}</S.SliderLabel>
      </S.SliderLabelWrapper>
    </S.SliderLabelLayout>
  )
}

const FindUser = ({ navigation }: FindUserScreenProps) => {
  // Constants
  const sliderValues = [10, 60]

  // States
  const [gender, setGender] = useState<Gender>(null)
  const [ageRange, setAgeRange] = useState<[number, number]>([10, 60])
  const currentLocation = useRecoilValue(currentLocationAtom)
  const [matchingOption, setMatchingOption] = useState<MatchingOption>({
    gender,
    ageRange,
    administrativeArea: '',
    sublocality: '',
  })
  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)

  // Refs

  // Socket
  const socket = useSocket()

  // Functions
  const handleGenderPress = (pressedGender: Gender) => {
    if (gender === null) {
      setGender(pressedGender)
    } else {
      setGender(pressedGender)
    }
  }

  const handleFindButtonPress = () => {
    console.log(matchingOption)
    setMatchingState(true)
    socket?.emit('findMatching', matchingOption)
    navigation.navigate('ChatRoom')
  }

  // Effects
  useEffect(() => {
    if (currentLocation) {
      setMatchingOption({
        ...matchingOption,
        gender,
        ageRange,
        administrativeArea: currentLocation.administrativeArea,
        sublocality: currentLocation.sublocality,
      })
    }
  }, [currentLocation, gender, ageRange])

  // 디버깅
  useEffect(() => {
    console.log(socket)
  }, [socket])

  return (
    <S.FindUserLayout>
      <S.Header>
        <S.HeaderTitle>매칭 상대 찾기</S.HeaderTitle>
      </S.Header>
      <S.GenderArea>
        <S.SubTitle>성별</S.SubTitle>
        <S.CardWrapper>
          <GenderCard gender="woman" onPress={() => handleGenderPress('woman')} selected={gender === 'woman'} />
          <GenderCard gender="man" onPress={() => handleGenderPress('man')} selected={gender === 'man'} />
        </S.CardWrapper>
      </S.GenderArea>
      <S.AgeArea>
        <S.SubTitle>연령</S.SubTitle>
        <MultiSlider
          values={[...sliderValues]}
          step={10}
          min={10}
          max={60}
          snapped
          sliderLength={SCREEN_WIDTH - 72}
          customLabel={e => <CustomSliderLabel e={e} />}
          enableLabel
          containerStyle={{
            width: SCREEN_WIDTH - 48,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
          markerStyle={{ backgroundColor: theme.colors.primary, width: 20, height: 20, borderRadius: 10 }}
          trackStyle={{ backgroundColor: theme.colors.gray300 }}
          selectedStyle={{ backgroundColor: theme.colors.primary }}
          onValuesChange={values => setAgeRange(values as [number, number])}
        />
      </S.AgeArea>
      <S.ButtonArea>
        <S.FindUserButton onPress={handleFindButtonPress} color={theme.colors.primary} title="매칭 찾기" />
      </S.ButtonArea>
    </S.FindUserLayout>
  )
}

export default FindUser
