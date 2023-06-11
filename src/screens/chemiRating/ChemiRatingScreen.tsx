import DefaultDegreeIcon from '@assets/icons/defaultDegree.svg'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './ChemiRating.style'
import theme from '@/common/style/theme'
import { StackParamList } from '@/navigations/StackNav'

type ChemiRatingScreenProps = NativeStackScreenProps<StackParamList, 'ChemiRating'>

interface CustomLabelProps {
  sliderValue: number
}

const CustomLabel = ({ sliderValue }: CustomLabelProps) => {
  return (
    <S.CustomLabel>
      <S.CustomLabelRow>
        {sliderValue >= 75 ? (
          <S.CustomLabelIcon name="triangle" color={theme.colors.success} size={18} />
        ) : (
          <S.CustomLabelEmpty />
        )}
        <S.CustomLabelText>최고예요</S.CustomLabelText>
      </S.CustomLabelRow>
      <S.CustomLabelRow>
        {sliderValue >= 50 && sliderValue < 75 ? (
          <S.CustomLabelIcon name="triangle" color={theme.colors.success} size={18} />
        ) : (
          <S.CustomLabelEmpty />
        )}
        <S.CustomLabelText>좋아요</S.CustomLabelText>
      </S.CustomLabelRow>
      <S.CustomLabelRow>
        {sliderValue >= 25 && sliderValue < 50 ? (
          <S.CustomLabelIcon name="triangle" color={theme.colors.success} size={18} />
        ) : (
          <S.CustomLabelEmpty />
        )}
        <S.CustomLabelText>아쉬워요</S.CustomLabelText>
      </S.CustomLabelRow>
      <S.CustomLabelRow>
        {sliderValue > 0 && sliderValue < 25 ? (
          <S.CustomLabelIcon name="triangle" color={theme.colors.success} size={18} />
        ) : (
          <S.CustomLabelEmpty />
        )}
        <S.CustomLabelText>별로예요</S.CustomLabelText>
      </S.CustomLabelRow>
    </S.CustomLabel>
  )
}

const ChemiRatingScreen = ({ navigation }: ChemiRatingScreenProps) => {
  // States
  const [sliderValue, setSliderValue] = useState(45)

  // Functions
  const handleSliderValueChange = (value: number[]) => {
    setSliderValue(value[0])
  }

  // Effects
  useEffect(() => {
    if (!navigation) return
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => <Icon name="chevron-left" size={28} onPress={() => navigation.goBack()} />,
      headerTitle: '케미 점수 주기',
    })
  }, [navigation])

  return (
    <S.ChemiRatingLayout>
      <S.ProfileArea>
        <S.ProfileWrapper>
          <S.ProfileImage source={require('@assets/images/womanIcon.png')} />
        </S.ProfileWrapper>
        <S.AskTextWrapper>
          <S.AskText>xx님</S.AskText>
          <S.AskText>oo님과의 식사는 어떠셨나요?</S.AskText>
        </S.AskTextWrapper>
      </S.ProfileArea>
      <S.SliderArea>
        <MultiSlider
          vertical
          min={0}
          max={100}
          snapped
          values={[sliderValue]}
          onValuesChange={value => handleSliderValueChange(value)}
          enabledTwo={false}
          containerStyle={{
            borderWidth: 1,
            borderColor: '#696969',
            borderRadius: 30,
            padding: 10,
            paddingHorizontal: 5,
            paddingLeft: 10,
            width: 300,
            height: 20,
          }}
          unselectedStyle={{ backgroundColor: 'white' }}
          selectedStyle={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 6,
            transform: [{ translateY: -6 }],
          }}
          trackStyle={{
            backgroundColor: 'orange',
            borderRadius: 30,
          }}
          customMarker={() => <S.CustomMarker />}
        />
        <CustomLabel sliderValue={sliderValue} />
        <S.DefaultDegreeWrapper>
          <DefaultDegreeIcon />
        </S.DefaultDegreeWrapper>
      </S.SliderArea>
      <S.SubmitButton>
        <S.SubmitButtonText>제출하기</S.SubmitButtonText>
      </S.SubmitButton>
    </S.ChemiRatingLayout>
  )
}

export default ChemiRatingScreen
