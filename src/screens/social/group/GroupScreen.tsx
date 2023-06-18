import { useNavigation } from '@react-navigation/native'
import React from 'react'
import * as S from './GroupScreen.style'
import { GroupData } from "../data/GroupVirtualData"
import WeekDayPicker from './components/WeekDayPicker'
import ContentsBox from './components/ContentsBox'
import axios from 'axios';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { Nav } from '@/types/nav'
import { Group } from '../data/Group';

const getSocialList = () => { //소모임 리스트 GET 요청
  axios.get('https://api.example.com') //url 수정 필요
    .then(response => {
      //요청이 성공한 경우
      ContentsData = response.data;
    })
    .catch(error => {
      //요청이 실패한 경우
      console.log(error);
    })
}

let ContentsData = GroupData;

const renderContentsItem = ({ item }: { item: Group }) => {
  return (
    <ContentsBox GroupData={item}></ContentsBox>
  )
}

const GroupScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const NavToCreate = () => {
    navigate('PostGroupScreen');
  }
  return (
    <S.Container>
      {/* <S.BlockTop>
        <S.Title>소모임</S.Title>
      </S.BlockTop> */}
      <S.WeekContainer>
        <WeekDayPicker></WeekDayPicker>
      </S.WeekContainer>
      <S.ContentsContainer>
        <FlatList
          data={ContentsData}
          renderItem={renderContentsItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}>
        </FlatList>
      </S.ContentsContainer>
      <S.CreateButton onPress={NavToCreate}><Icon name="pencil" color={theme.colors.white} size={30}></Icon></S.CreateButton>
    </S.Container>
  )
}

export default GroupScreen
