import React from 'react'
import { useState } from 'react'
import * as S from '../GroupScreen.style'
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'

const ContentsBox = ({ socialData }: { socialData: object; }) => {
  return (
    <S.ContentsDiv>
      <S.SocialImage></S.SocialImage>
      <S.TextMain>{socialData.title}</S.TextMain>
      <View style={{ flexDirection: 'row' }}>
        {/* <Text>{"[Icon]"}</Text> */}
        <Icon name="account" color={theme.colors.gray400} size={15}></Icon>
        <S.TextSub>{`${socialData.people}명`}</S.TextSub>
      </View>
      <S.TextSub>{`${socialData.location} | ${socialData.time}`}</S.TextSub>
    </S.ContentsDiv>
  );
}

export default ContentsBox;