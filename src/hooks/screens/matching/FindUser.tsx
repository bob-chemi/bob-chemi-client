import MultiSlider from '@ptomasroos/react-native-multi-slider'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import GenderCard from '@screens/matching/components/GenderCard'
import React from 'react'
import { Text } from 'react-native'
import * as S from './FindUser.style'
import CustomButton from '@/common/components/CustomButton'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

type FindUserScreenProps = BottomTabScreenProps<TabParamList, 'Matching'>

const CustomSliderLabel = (e: any) => {
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

const FindUser = ({ navigation, route }: FindUserScreenProps) => {
  // Constants
  const sliderValues = [10, 60]

  return (
    <S.FindUserLayout>
      <S.Header>
        <S.HeaderTitle>매칭 상대 찾기</S.HeaderTitle>
      </S.Header>
      <S.GenderArea>
        <S.SubTitle>성별</S.SubTitle>
        <S.CardWrapper>
          <GenderCard gender="woman" />
          <GenderCard gender="man" />
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
          customLabel={e => CustomSliderLabel(e)}
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
        />
      </S.AgeArea>
      <S.ButtonArea>
        <S.FindUserButton color={theme.colors.primary} title="매칭 찾기" />
      </S.ButtonArea>
    </S.FindUserLayout>
  )
}

export default FindUser
