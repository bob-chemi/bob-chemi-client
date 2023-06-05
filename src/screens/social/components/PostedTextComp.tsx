import React, { useState } from 'react';
import * as S from './PostedComponent.style'
import { View } from 'react-native';

const PostedTextComp = ({
  headTitle,
  bodyContent,
  height,
  isContent
}: { headTitle: string; bodyContent: string; height: number; isContent: boolean }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <View style={{ flexDirection: 'row', marginTop: 10 }}>
      <S.HeadTitle height={height}>{headTitle}</S.HeadTitle>
      <S.Input height={height} value={title} isContent={isContent} onChangeText={setTitle} multiline={true} scrollEnabled={true}></S.Input>
    </View>

  )
}

export default PostedTextComp