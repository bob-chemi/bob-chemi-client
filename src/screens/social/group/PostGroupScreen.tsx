import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import * as S from './GroupScreen.style'
import PostedTextComp from './components/post/PostedTextComp';
import PostedTimeComp from './components/post/PostedTimeComp';
import PostedLocationComp from './components/post/PostedLocationComp';
import PostedImgComp from './components/post/PostedImgComp';

const PostGroupScreen = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');

  return (
    <S.PostContainer>
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
    </S.PostContainer>
  )
}
export default PostGroupScreen