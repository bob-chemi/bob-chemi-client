import React from 'react'
import { useState } from 'react'
import * as S from '../../commonComp/GroupScreen.style'
import { ImageSourcePropType, View, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@/navigations/StackNav';
import { Group } from '@/types/socialType';
import { SetFormattedTwoDigitNumber } from '@/utils/formattedNum';

const ContentsBox = ({ GroupData }: { GroupData: Group; }) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

  const handleGroupPress = (group: Group) => {
    navigation.navigate('GroupDetailScreen', { group });
  };
  const imageSource: ImageSourcePropType = GroupData.status == 'PUBLIC' ? require('@assets/images/group_public.png') : require('@assets/images/group_private.png');

  return (
    <S.ContentsDiv onPress={() => handleGroupPress(GroupData)}>
      <S.GroupImage source={imageSource}></S.GroupImage>
      <S.TextMain>{GroupData.title}</S.TextMain>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="account" color={theme.colors.gray400} size={15}></Icon>
        <S.TextSub>{`${GroupData.groupPeopleLimit}명`}</S.TextSub>
      </View>
      <S.TextSub>{`${GroupData.groupLocation} | ${SetFormattedTwoDigitNumber(GroupData.groupHour)}:${SetFormattedTwoDigitNumber(GroupData.groupMin)}`}</S.TextSub>
    </S.ContentsDiv>
  );
}

export default ContentsBox;