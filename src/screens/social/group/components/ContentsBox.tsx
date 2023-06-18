import React from 'react'
import { useState } from 'react'
import * as S from '../GroupScreen.style'
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Group } from '../../data/Group';
import { StackParamList } from '@/navigations/StackNav';

const ContentsBox = ({ GroupData }: { GroupData: Group; }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const handleGroupPress = (group: Group) => {
    navigation.navigate('GroupDetailScreen', { group });
  };

  return (
    <S.ContentsDiv onPress={() => handleGroupPress(GroupData)}>
      <S.GroupImage source={GroupData.imgsource}></S.GroupImage>
      <S.TextMain>{GroupData.title}</S.TextMain>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="account" color={theme.colors.gray400} size={15}></Icon>
        <S.TextSub>{`${GroupData.groupPeopleLimit}명`}</S.TextSub>
      </View>
      <S.TextSub>{`${GroupData.groupLocation} | ${GroupData.groupHour}:${GroupData.groupMin}`}</S.TextSub>
    </S.ContentsDiv>
  );
}

export default ContentsBox;