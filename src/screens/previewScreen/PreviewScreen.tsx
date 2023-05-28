import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as S from './PreviewScreen.style'
import ButtonStyle from '@/common/components/CustomButton'
import { Nav } from '@/types/nav'

const PreviewScreen = () => {
  const [steps, setSteps] = useState<number>(0)
  const { navigate } = useNavigation<Nav>()

  const handleNext = () => {
    if (steps === 0) {
      setSteps(1)
    } else {
      navigate('LoginScreen')
    }
  }
  const handleSkip = () => {
    navigate('LoginScreen')
  }
  const currentStepData = HOMESTART_STEP[steps]
  return (
    <S.Container>
      <S.ImageArea></S.ImageArea>
      <S.TextArea>
        <S.BoldText>{currentStepData.title}</S.BoldText>
        <S.NomalText>{currentStepData.desc}</S.NomalText>
      </S.TextArea>
      {currentStepData.next ? (
        <S.ButtonWrapView>
          <TouchableOpacity onPress={handleNext}>
            <ButtonStyle>NEXT</ButtonStyle>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <S.SkipText>Skip</S.SkipText>
          </TouchableOpacity>
        </S.ButtonWrapView>
      ) : (
        <TouchableOpacity onPress={handleNext}>
          <ButtonStyle>GET STARTED</ButtonStyle>
        </TouchableOpacity>
      )}
    </S.Container>
  )
}

export default PreviewScreen

interface Step {
  imgPath: string
  title: string
  desc: string
  next: boolean
}

export const HOMESTART_STEP: Step[] = [
  {
    imgPath: '',
    title: '혼밥러들 모여라!!',
    desc: '혼자 밥 먹기 싫은 사람 같이 먹읍시다!!',
    next: true,
  },
  {
    imgPath: '',
    title: '동네 숨은 맛집을 찾아서!',
    desc: '동네 숨은 맛집을 공유하고, 모임을 만들어 같이 방문해보세요',
    next: false,
  },
]
