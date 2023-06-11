import React, { useState } from 'react';
import * as S from './PostedComponent.style'

const PostedTextComp = ({
  headTitle,
  height,
  isContent
}: { headTitle: string; height: number; isContent: boolean }) => {
  const [title, setTitle] = useState('');

  return (
    <S.CompContainer>
      <S.HeadTitle height={height}>{headTitle}</S.HeadTitle>
      <S.Input height={height} value={title} isContent={isContent} onChangeText={setTitle} multiline={isContent} scrollEnabled={true}></S.Input>
    </S.CompContainer>
  )
}

export default PostedTextComp