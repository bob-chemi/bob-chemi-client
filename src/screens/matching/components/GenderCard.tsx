import React from 'react'
import FastImage from 'react-native-fast-image'
import * as S from './GenderCard.style'

interface GenderCardProps {
  gender: 'woman' | 'man'
}

const GenderCard = ({ gender }: GenderCardProps) => {
  const isWoman = gender === 'woman'

  return (
    <S.GenderCardLayout>
      {isWoman ? (
        <FastImage source={require('@assets/images/womanIcon.png')} style={{ width: 100, height: 100 }} />
      ) : (
        <FastImage source={require('@assets/images/manIcon.png')} style={{ width: 100, height: 100 }} />
      )}

      <S.Title>{isWoman ? '여성' : '남성'}</S.Title>
    </S.GenderCardLayout>
  )
}

export default GenderCard
