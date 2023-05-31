import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { HOMESTART_STEP, Step } from '../PreviewScreen'
import * as S from '../PreviewScreen.style'
import Bullets from './Bullets'
import ButtonStyle from '@/common/components/CustomButton'
import { Nav } from '@/types/nav'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

interface ScrollItemProp {
  data: Step
  index: number
  scrollRef: React.RefObject<ScrollView>
}
const ScrollItem = ({ data, index, scrollRef }: ScrollItemProp) => {
  const { navigate } = useNavigation<Nav>()
  const setScrollIndex = (index: number) => {
    if (index < HOMESTART_STEP.length - 1) {
      scrollRef.current?.scrollTo({
        x: SCREEN_WIDTH,
        animated: true,
      })
    } else {
      navigate('LoginScreen')
    }
  }
  return (
    <S.Container key={data.desc}>
      <S.ImageArea></S.ImageArea>
      <S.TextArea>
        <S.BoldText>{data.title}</S.BoldText>
        <S.NomalText>{data.desc}</S.NomalText>
      </S.TextArea>
      <Bullets />
      <S.ButtonWrapView>
        <TouchableOpacity onPress={() => setScrollIndex(index)}>
          <ButtonStyle>{data.next ? 'Next' : 'Get Started'}</ButtonStyle>
        </TouchableOpacity>
      </S.ButtonWrapView>
    </S.Container>
  )
}

export default ScrollItem
