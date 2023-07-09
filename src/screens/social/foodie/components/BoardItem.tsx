import React, { useState } from 'react';
import * as S from '../FoodieScreen.style'
import { FoodieBoard } from '@/types/socialType';
import { SetFormattedDate, SetFormattedTwoDigitNumber } from '@/utils/formattedNum';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@/navigations/StackNav';

const BoardItem = ({ BoardData }: { BoardData: FoodieBoard; }) => {
  const date = SetFormattedDate(BoardData.creadeAt);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const handleFoodiePress = (board: FoodieBoard) => {
    navigation.navigate('FoodieDetailScreen', { board });
  }

  return (
    <S.PostItemContainer onPress={() => handleFoodiePress(BoardData)}>
      <S.PostItemTitle>{BoardData.title}</S.PostItemTitle>
      <S.PostItemSubTitle>{`${BoardData.user.name} | ${date.year}-${SetFormattedTwoDigitNumber(date.month)}-${SetFormattedTwoDigitNumber(date.day)}`}</S.PostItemSubTitle>
    </S.PostItemContainer>
  )

}

export default BoardItem