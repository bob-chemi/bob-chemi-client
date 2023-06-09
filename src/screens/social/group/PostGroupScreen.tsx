import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import * as S from './GroupScreen.style'
import PostedTextComp from './post/PostedTextComp';
import PostedTimeComp from './post/PostedTimeComp';
import PostedLocationComp from './post/PostedLocationComp';
import PostedImgComp from './post/PostedImgComp';

const PostSocialScreen = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  return (
    <S.Container>
      <S.BlockTop>
        <S.Title>소모임 생성</S.Title>
      </S.BlockTop>
      <View>
        <PostedImgComp></PostedImgComp>
        <PostedLocationComp></PostedLocationComp>
        <PostedTimeComp></PostedTimeComp>
        <PostedTextComp headTitle='제목' height={35} isContent={false}></PostedTextComp>
        <PostedTextComp headTitle='내용' height={300} isContent={true}></PostedTextComp>
      </View>
      <S.PostBtn><S.PostBtnText>등록</S.PostBtnText></S.PostBtn>
    </S.Container>
  )
}
export default PostSocialScreen