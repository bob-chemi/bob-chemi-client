import React from 'react'
import { useState } from 'react'
import * as S from '../GroupScreen.style'
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { GroupParamList } from '../../navigations/GroupNav';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Group } from '../../data/Group';

const ContentsBox = ({ GroupData }: { GroupData: Group; }) => {
  const navigation = useNavigation<NativeStackNavigationProp<GroupParamList>>()

  const handleGroupPress = (id: number) => {
    navigation.navigate('GroupDetail', { groupId: id });
  };

  return (
    <S.ContentsDiv onPress={() => handleGroupPress(GroupData.id)}>
      <S.GroupImage></S.GroupImage>
      <S.TextMain>{GroupData.title}</S.TextMain>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="account" color={theme.colors.gray400} size={15}></Icon>
        <S.TextSub>{`${GroupData.people}명`}</S.TextSub>
      </View>
      <S.TextSub>{`${GroupData.location} | ${GroupData.time}`}</S.TextSub>
    </S.ContentsDiv>
  );
}

export default ContentsBox;