import React, { useState } from 'react';
import * as S from '../FoodieScreen.style'
import { FoodieBoard } from '@/types/socialType';

const BoardItem = ({ BoardData }: { BoardData: FoodieBoard; }) => {
  return (
    <S.PostItemContainer>
      <S.PostItemTitle>{BoardData.title}</S.PostItemTitle>
      <S.PostItemSubTitle>{`${BoardData.user.nickname} | ${BoardData.createAt}`}</S.PostItemSubTitle>
    </S.PostItemContainer>
  )

}

export default BoardItem