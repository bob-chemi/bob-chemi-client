import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import * as S from './GroupScreen.style'
import WeekDayPicker from './components/WeekDayPicker'
import ContentsBox from './components/ContentsBox'
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import theme from '@/common/style/theme'
import { Nav } from '@/types/nav'
import { Group } from '../data/Group';
import { groupRequest } from '@/api/groupRequest'
const { getGroupByDate } = groupRequest
const renderContentsItem = ({ item }: { item: Group }) => {
  return (
    <ContentsBox GroupData={item}></ContentsBox>
  )
}

const GroupScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const [contentsData, setContentsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    getList();
  }

  const getList = async () => { //소모임 리스트 GET 요청
    const isoDate = `${selectedDate}T00:00:00Z`;
    const response = await getGroupByDate(isoDate)
    if (response) {
      console.log('소모임 가져오기 성공')
      console.log(response)
      setContentsData(response);
    } else {
      console.log('실패')
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const NavToCreate = () => {
    navigate('PostGroupScreen');
  }
  return (
    <S.Container>
      <S.WeekContainer>
        <WeekDayPicker selectedDate={selectedDate} onChangeDate={handleDateChange}></WeekDayPicker>
      </S.WeekContainer>
      <S.ContentsContainer>
        <FlatList
          data={contentsData}
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
