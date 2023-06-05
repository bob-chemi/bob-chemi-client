import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import * as S from './SocialScreen.style'
import PostedTextComp from './components/PostedTextComp';

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
        <PostedTextComp headTitle='제목' bodyContent='hi' height={35} isContent={false}></PostedTextComp>
        <PostedTextComp headTitle='내용' bodyContent='hi' height={200} isContent={true}></PostedTextComp>
      </View>
      {/* <Button title="등록"></Button> */}
    </S.Container>
  )
}
export default PostSocialScreen