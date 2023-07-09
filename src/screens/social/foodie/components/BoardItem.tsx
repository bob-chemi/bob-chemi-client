import React, { useState } from 'react';
import * as S from '../FoodieScreen.style'
import { FoodieBoard } from '@/types/socialType';
import { SetFormattedDate, SetFormattedTwoDigitNumber } from '@/utils/formattedNum';

const BoardItem = ({ BoardData }: { BoardData: FoodieBoard; }) => {
  const date = SetFormattedDate(BoardData.creadeAt);
  return (
    <S.PostItemContainer>
      <S.PostItemTitle>{BoardData.title}</S.PostItemTitle>
      <S.PostItemSubTitle>{`${BoardData.user.name} | ${date.year}-${SetFormattedTwoDigitNumber(date.month)}-${SetFormattedTwoDigitNumber(date.day)}`}</S.PostItemSubTitle>
    </S.PostItemContainer>
  )

}

export default BoardItem