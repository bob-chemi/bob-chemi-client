import MultiSlider, { LabelProps } from '@ptomasroos/react-native-multi-slider'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import GenderCard from '@screens/matching/components/GenderCard'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as S from './FindUser.style'
import matchingRequest from '@/api/matchingRequest'
import theme from '@/common/style/theme'
import useSocket from '@/hooks/useSocket'
import { TabParamList } from '@/navigations/BottomTabs'
import { StackParamList } from '@/navigations/StackNav'
import { currentLocationAtom } from '@/recoil/atoms/currentLocationAtom'
import { matchingStatesAtom } from '@/recoil/atoms/matchingStatesAtom'
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
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

type Gender = 'Female' | 'Male' | null

type AgeGroup = 'TEENAGER' | 'TWENTIES' | 'THIRTIES' | 'FORTIES' | 'FIFTIES'

type MatchingOption = {
  userId: string
  targetGender: Gender
  targetAgeGroup: AgeGroup
  location: string
}

const CustomSliderLabel = ({ e }: CustomSliderLabelProps) => {
  const { oneMarkerLeftPosition, oneMarkerValue } = e

  return (
    <S.SliderLabelLayout>
      <S.SliderLabelWrapper left={oneMarkerLeftPosition}>
        <S.SliderLabel>{oneMarkerValue === 0 ? String(10) : String(oneMarkerValue)}</S.SliderLabel>
      </S.SliderLabelWrapper>
      {/* <S.SliderLabelWrapper left={twoMarkerLeftPosition}>
        <S.SliderLabel>{twoMarkerValue}</S.SliderLabel>
      </S.SliderLabelWrapper> */}
    </S.SliderLabelLayout>
  )
}

const FindUser = ({ navigation }: FindUserScreenProps) => {
  // Recoil
  const userInfo = useRecoilValue(userStatesAtom)
  // States
  const [targetGender, setTargetGender] = useState<Gender>(null)
  const [targetAgeGroup, setTargetAgeGroup] = useState<AgeGroup>('TEENAGER')
  const currentLocation = useRecoilValue(currentLocationAtom)
  const [matchingOption, setMatchingOption] = useState<MatchingOption>({
    userId: userInfo.user.id,
    targetGender,
    targetAgeGroup,
    location: '서울시 은평구',
  })
  const [matchingState, setMatchingState] = useRecoilState(matchingStatesAtom)

  // Refs

  // Socket
  const socket = useSocket()

  // Functions
  const handleGenderPress = (pressedGender: Gender) => {
    if (targetGender === null) {
      setTargetGender(pressedGender)
    } else {
      setTargetGender(pressedGender)
    }
  }

  const handleFindButtonPress = async () => {
    console.log(matchingOption)
    setMatchingState({
      isMatching: true,
      isMatched: false,
      isOnChatRoom: true,
    })

    // const data = await matchingRequest.findMatching(matchingOption)

    // console.log('소켓 상태', socket)
    if (!socket.connected) {
      socket.connect()
    }
    socket?.emit('requestMatching', matchingOption)
    navigation.navigate('ChatRoom')
  }

  const handleSliderValue = (value: number[]) => {
    if (value) {
      const sliderValue = value[0]
      switch (sliderValue) {
        case 10:
          setTargetAgeGroup('TEENAGER')
          break
        case 20:
          setTargetAgeGroup('TWENTIES')
          break
        case 30:
          setTargetAgeGroup('THIRTIES')
          break
        case 40:
          setTargetAgeGroup('FORTIES')
          break
        case 50:
          setTargetAgeGroup('FIFTIES')
          break
        default:
          break
      }
    }
  }

  // Effects
  useEffect(() => {
    if (currentLocation) {
      setMatchingOption({
        ...matchingOption,
        targetGender,
        targetAgeGroup,
      })
      // console.log(matchingOption)
    }
  }, [currentLocation, targetGender, targetAgeGroup])

  // 디버깅
  // useEffect(() => {
  //   console.log(socket)
  //   if (!socket.connected) {
  //     socket.connect()
  //   }
  // }, [socket])

  // useEffect(() => {
  //   console.log(matchingOption)
  // }, [matchingOption])

  return (
    <S.FindUserLayout>
      <S.Header>
        <S.HeaderTitle>매칭 상대 찾기</S.HeaderTitle>
      </S.Header>
      <S.GenderArea>
        <S.SubTitle>성별</S.SubTitle>
        <S.CardWrapper>
          <GenderCard gender="woman" onPress={() => handleGenderPress('Female')} selected={targetGender === 'Female'} />
          <GenderCard gender="man" onPress={() => handleGenderPress('Male')} selected={targetGender === 'Male'} />
        </S.CardWrapper>
      </S.GenderArea>
      <S.AgeArea>
        <S.SubTitle>연령</S.SubTitle>
        {/* <MultiSlider
          values={[...sliderValues]}
          step={10}
          min={10}
          max={50}
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
        /> */}
        <MultiSlider
          // values={[]}
          step={10}
          min={10}
          max={50}
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
          onValuesChange={values => handleSliderValue(values)}
          enabledTwo={false}
        />
      </S.AgeArea>
      <S.ButtonArea>
        <S.FindUserButton onPress={handleFindButtonPress} color={theme.colors.primary} title="매칭 찾기" />
      </S.ButtonArea>
    </S.FindUserLayout>
  )
}

export default FindUser
