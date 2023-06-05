import React from 'react'
import { useState } from 'react'
import * as S from './ContensBox.style'
import { View, Text, StyleSheet } from 'react-native';

const ContentsBox = ({ socialData }: { socialData: object; }) => {
  return (
    <S.ContentsDiv>
      <S.SocialImage></S.SocialImage>
      <S.TextMain>{socialData.title}</S.TextMain>
      <View style={{ flexDirection: 'row' }}>
        <Text>{"[Icon]"}</Text>
        <S.TextSub>{`${socialData.people}명`}</S.TextSub>
      </View>
      <S.TextSub>{`${socialData.location} | ${socialData.time}`}</S.TextSub>
    </S.ContentsDiv>
  );
}

export default ContentsBox;