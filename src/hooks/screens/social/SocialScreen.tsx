import { useNavigation } from '@react-navigation/native'
import React from 'react'
import * as S from './SocialScreen.style'
import WeekDayPicker from './components/WeekDayPicker'
import ContentsBox from './components/ContentsBox'
import axios from 'axios';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { Nav } from '@/types/nav'

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

let ContentsData = [ //가상데이터
  {
    title: "소모임1",
    people: 5,
    location: "서울 종로구",
    time: "17:30"
  },
  {
    title: "소모임2",
    people: 4,
    location: "서울 종로구",
    time: "18:00"
  },
  {
    title: "소모임3",
    people: 6,
    location: "서울 종로구",
    time: "17:00"
  },
  {
    title: "소모임4",
    people: 3,
    location: "서울 종로구",
    time: "17:30"
  },
  {
    title: "소모임1",
    people: 5,
    location: "서울 종로구",
    time: "17:30"
  },
  {
    title: "소모임2",
    people: 4,
    location: "서울 종로구",
    time: "18:00"
  },
  {
    title: "소모임3",
    people: 6,
    location: "서울 종로구",
    time: "17:00"
  },
  {
    title: "소모임4",
    people: 3,
    location: "서울 종로구",
    time: "17:30"
  },
]

const renderContentsItem = ({ item }: { item: object }) => {
  return (
    <ContentsBox socialData={item}></ContentsBox>
  )
}

const SocialScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const NavToCreate = () => {
    navigate('PostGroupScreen');
  }

  return (
    <S.Container>
      <S.BlockTop>
        <S.Title>소모임</S.Title>
      </S.BlockTop>
      <S.WeekContainer>
        <WeekDayPicker></WeekDayPicker>
      </S.WeekContainer>
      <S.ContentsContainer>
        <FlatList
          data={ContentsData}
          renderItem={renderContentsItem}
          numColumns={2}>
        </FlatList>
      </S.ContentsContainer>
      <S.CreateButton onPress={NavToCreate}><Icon name="pencil" color={theme.colors.white} size={30}></Icon></S.CreateButton>
    </S.Container>
  )
}

export default SocialScreen
