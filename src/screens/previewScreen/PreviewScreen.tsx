import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import ScrollItem from './components/ScrollItem'
import * as S from './PreviewScreen.style'

const PreviewScreen = () => {
  const scrollRef = useRef<ScrollView>(null)

  return (
    <S.Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled ref={scrollRef}>
        {HOMESTART_STEP.map((data, index) => (
          <ScrollItem key={data.title} data={data} index={index} scrollRef={scrollRef} />
        ))}
      </ScrollView>
    </S.Container>
  )
}

export default PreviewScreen

export interface Step {
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
