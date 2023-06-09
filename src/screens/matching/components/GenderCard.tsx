import React from 'react'
import { PressableProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import * as S from './GenderCard.style'
import theme from '@/common/style/theme'

interface GenderCardProps extends PressableProps {
  gender: 'woman' | 'man'
  selected: boolean
}

const GenderCard = ({ gender, selected, ...props }: GenderCardProps) => {
  // Constants
  const isWoman = gender === 'woman'

  return (
    <S.GenderCardLayout {...props}>
      {isWoman ? (
        <FastImage source={require('@assets/images/womanIcon.png')} style={{ width: 100, height: 100 }} />
      ) : (
        <FastImage source={require('@assets/images/manIcon.png')} style={{ width: 100, height: 100 }} />
      )}
      <S.Title>{isWoman ? '여성' : '남성'}</S.Title>
      {selected && (
        <S.SelectedOpacity>
          <S.CheckIcon name="check-bold" color={theme.colors.success} size={86} />
        </S.SelectedOpacity>
      )}
    </S.GenderCardLayout>
  )
}

export default GenderCard
