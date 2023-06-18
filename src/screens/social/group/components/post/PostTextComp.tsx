import React, { useState } from 'react';
import * as S from './PostComponent.style'

interface PostPeopleCompProps {
  children?: React.ReactNode;
  text: string;
  headTitle: string;
  height: number;
  isContent: boolean;
  OnChangeText: (newText: string) => void;
}

const PostTextComp: React.FC<PostPeopleCompProps> = ({ text, OnChangeText, headTitle, height, isContent }) => {
  return (
    <S.CompContainer>
      <S.HeadTitle height={height}>{headTitle}</S.HeadTitle>
      <S.Input height={height} value={text} isContent={isContent} onChangeText={OnChangeText} multiline={isContent} scrollEnabled={true}></S.Input>
    </S.CompContainer>
  )
}

export default PostTextComp